import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useCards } from "../hooks/useCards";
import { ROUTER_KEYS } from "../consts";
import { CardDetails } from "../components/CardDetails";
import { useDateChanger } from "../hooks/useDateChanger";

const CardInfoPage = () => {
  const [card, setCard] = useState(null);

  const { id } = useParams();
  const { getCardById, deleteCardById } = useCards();
  const { dateToDisplay } = useDateChanger();
  const locationPath = useLocation();
  const navigate = useNavigate();
  const backLinkHref = locationPath.state?.from ?? ROUTER_KEYS.HOME;

  useEffect(() => {
    setCard(getCardById(id));
  }, [getCardById, id]);
  const handleDelete = () => {
    if (window.confirm("Are you sure?")) {
      deleteCardById(id);
      navigate(ROUTER_KEYS.HOME);
    }
  };

  if (!card) return <b>Loading...</b>;

  return (
    <section className="main-section">
      <div className="container flex flex-col gap-6">
        <NavLink
          to={backLinkHref}
          className="flex text-accent gap-2 font-poppins font-medium text-base"
        >
          <BsArrowLeft className="icon" />
          <span>Back</span>
        </NavLink>
        <h1 className="title">{card.title}</h1>
        <CardDetails
          id={card.id}
          title={card.title}
          image={card.image.secure_url}
          description={card.description}
          theme={card.theme}
          location={card.location}
          time={card.time}
          date={dateToDisplay(card.date)}
          priority={card.priority}
          handleDelete={handleDelete}
        />
      </div>
    </section>
  );
};
export default CardInfoPage;
