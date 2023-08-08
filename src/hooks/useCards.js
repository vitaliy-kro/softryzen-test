import { createContext, useContext, useState, useCallback } from "react";
import {
  getAndTransformCardsFromLocalStorage,
  rewriteCardsToLocalStorage,
  setCardToLocalStorage,
} from "../helpers/localStorage";
import { SCREEN_WIDTHS } from "../consts";
import { useScreenWidth } from "./useScreenWidth";

const CardsContext = createContext();

export const useCards = () => useContext(CardsContext);

export const CardsProvider = ({ children }) => {
  console.log(getAndTransformCardsFromLocalStorage());
  const [cards, setCards] = useState(
    getAndTransformCardsFromLocalStorage() || [],
  );
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchedCards, setSearchedCards] = useState([]);
  const [notFoundMessage, setNotFoundMessage] = useState(null);
  const screenWidth = useScreenWidth();
  const [page, setPage] = useState(1);
  const [perPage] = useState(screenWidth >= SCREEN_WIDTHS.desktop ? 8 : 6);

  const getCardsToShow = useCallback(() => {
    const start = (page - 1) * perPage;
    const end = start + perPage;

    const cardsToRender = filteredCards.length
      ? filteredCards
      : searchedCards.length
      ? searchedCards
      : cards;
    const pages = Math.ceil(cardsToRender.length / perPage);
    return { cards: cardsToRender.slice(start, end), pages };
  }, [cards, searchedCards, filteredCards, page, perPage]);

  const getCardById = (id) => {
    return cards.find((card) => card.id === id);
  };
  const addCard = (card) => {
    setCards((prev) => [...prev, card]);
    setCardToLocalStorage(card);
  };
  const editCard = (card) => {
    const editedCards = cards.map((c) => (card.id === c.id ? card : c));
    setCards(editedCards);
    rewriteCardsToLocalStorage(editedCards);
  };
  const deleteCardById = (id) => {
    const filteredCards = cards.filter((card) => card.id !== id);
    setCards(filteredCards);
    rewriteCardsToLocalStorage(filteredCards);
  };

  const searchCards = (text) => {
    if (!text.trim()) {
      setNotFoundMessage(null);
      return setSearchedCards([]);
    }

    const regex = new RegExp(text, "i");

    let searchResult = filteredCards.length ? [...filteredCards] : [...cards];
    searchResult = searchResult.filter(
      ({ title, description }) => regex.test(title) || regex.test(description),
    );

    if (!searchResult.length) {
      return setNotFoundMessage(`No cards with ${text} value`);
    }

    setNotFoundMessage(null);
    setSearchedCards(searchResult);
  };

  const applyFilterAndSort = (cards, value) => {
    let filteredAndSorted = [...cards];
    if (value.category) {
      filteredAndSorted = filteredAndSorted.filter(
        (card) => card.theme === value.category,
      );
    }

    if (value.sortOrder) {
      const sortBy = value.sortOrder;
      const priorities = {
        High: 0,
        Medium: 1,
        Low: 2,
      };
      switch (sortBy) {
        case "by A-Z":
          filteredAndSorted.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "by Z-A":
          filteredAndSorted.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case "data-newest":
          filteredAndSorted.sort((a, b) => {
            const date1 = new Date(a.date + " " + a.time);
            const date2 = new Date(b.date + " " + b.time);
            return date1 - date2;
          });
          break;
        case "data-oldest":
          filteredAndSorted.sort((a, b) => {
            const date1 = new Date(a.date + " " + a.time);
            const date2 = new Date(b.date + " " + b.time);
            return date2 - date1;
          });
          break;
        case "priority-highest":
          filteredAndSorted.sort(
            (a, b) => priorities[a.priority] - priorities[b.priority],
          );
          break;
        case "priority-lowest":
          filteredAndSorted.sort(
            (a, b) => priorities[b.priority] - priorities[a.priority],
          );
          break;
        default:
          break;
      }
    }

    return filteredAndSorted;
  };

  const filterCards = (value) => {
    const cardsToFilter =
      filteredCards.length && value.category ? [...filteredCards] : [...cards];

    const filterResult = applyFilterAndSort(cardsToFilter, value);
    if (!filterResult.length) {
      return setNotFoundMessage("Not found cards with this filters");
    }
    setNotFoundMessage(null);
    setFilteredCards(filterResult);
  };

  return (
    <CardsContext.Provider
      value={{
        getCardsToShow,
        cards,
        page,
        setPage,
        perPage,
        getCardById,
        addCard,
        editCard,
        deleteCardById,
        filterCards,
        searchCards,
        notFoundMessage,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
};
