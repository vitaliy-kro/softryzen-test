import { Card } from "./Card";
import { useCards } from "../hooks/useCards";

export const CardsList = () => {
  const { getCardsToShow, notFoundMessage } = useCards();

  if (notFoundMessage) {
    return <h1 className="title">{notFoundMessage}</h1>;
  }
  const cardsToRender = getCardsToShow().cards;

  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 justify-items-center ">
      {cardsToRender.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          title={card.title}
          description={card.description}
          theme={card.theme}
          location={card.location}
          priority={card.priority}
          time={card.time}
          image={card.image.secure_url}
          date={card.date}
        />
      ))}
    </ul>
  );
};
