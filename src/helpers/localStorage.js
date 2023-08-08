import { LOCALSTORAGE_KEYS } from "../consts";

export const getAndTransformCardsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.EVENT_CARDS));
};
export const rewriteCardsToLocalStorage = (cards) => {
  localStorage.setItem(LOCALSTORAGE_KEYS.EVENT_CARDS, JSON.stringify(cards));
};
export const setCardToLocalStorage = (card) => {
  const cards = getAndTransformCardsFromLocalStorage();
  if (cards) {
    cards.push(card);
    return localStorage.setItem(
      LOCALSTORAGE_KEYS.EVENT_CARDS,
      JSON.stringify(cards),
    );
  }
  localStorage.setItem(LOCALSTORAGE_KEYS.EVENT_CARDS, JSON.stringify([card]));
};
