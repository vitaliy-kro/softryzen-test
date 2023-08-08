import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { Form } from "../components/Form";
import { useCards } from "../hooks/useCards";
import { ROUTER_KEYS } from "../consts";
import { imageUpload } from "../helpers/imageUpload";
import { toastError } from "../helpers/notification-toasts";

export const EditPage = () => {
  const { getCardById, editCard } = useCards();
  const { id } = useParams();
  const [initialFormState, setInitialFormState] = useState(null);

  const locationPath = useLocation();
  const navigate = useNavigate();
  const backLinkHref = locationPath.state?.from ?? ROUTER_KEYS.HOME;

  useEffect(() => {
    setInitialFormState(getCardById(id));
  }, [getCardById, id]);

  const onSubmit = async (card) => {
    if (initialFormState.image.name === card.image.name) {
      editCard({ ...card, id });
      return navigate(`/${id}`);
    }
    try {
      const { secure_url } = await imageUpload(card.image);
      if (!secure_url) {
        throw new Error("Something get wrong, try again later");
      }
      const cardToChange = {
        ...card,
        image: { name: card.image.name, secure_url },
        id,
      };
      editCard(cardToChange);
      navigate(`/${id}`);
    } catch (e) {
      toastError(e.message);
    }
  };

  return (
    <section className="main-section">
      <div className="container">
        <NavLink
          to={backLinkHref}
          className="flex text-accent gap-2 font-poppins font-medium text-base mb-6"
        >
          <BsArrowLeft className="icon" />
          <span>Back</span>
        </NavLink>

        <Form type="Edit" onSubmit={onSubmit} card={initialFormState} />
      </div>
    </section>
  );
};
