import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import { FORM_FIELDS, ROUTER_KEYS } from "../consts";
import { useCards } from "../hooks/useCards";
import { Form } from "components/Form";
import { imageUpload } from "../helpers/imageUpload";
import { toastError } from "../helpers/notification-toasts";

export const AddCardPage = () => {
  const { addCard } = useCards();
  const locationPath = useLocation();
  const navigate = useNavigate();
  const backLinkHref = locationPath.state?.from ?? ROUTER_KEYS.HOME;
  const initialFormState = FORM_FIELDS.reduce((acc, field) => {
    return { ...acc, [field.name]: "" };
  }, {});

  const onSubmit = async (values) => {
    try {
      const { secure_url } = await imageUpload(values.image);
      if (!secure_url) {
        throw new Error("Something get wrong, try again later");
      }
      const cardToSet = {
        ...values,
        image: { name: values.image.name, secure_url },
        id: uuidv4(),
      };
      addCard(cardToSet);
      navigate(ROUTER_KEYS.HOME);
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

        <Form type="Create new" onSubmit={onSubmit} card={initialFormState} />
      </div>
    </section>
  );
};
