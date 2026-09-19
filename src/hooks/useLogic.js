import { useState, useEffect } from "react";

export const useLogic = (cardValues) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [move, setMove] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const initializeGame = () => {
    const shuffled = shuffleArray(cardValues);
    const finalCards = shuffled.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(finalCards);
    setIsLocked(false);
    setMove(0);
    setScore(0);
    setFlippedCards([]);
    setMatchedCards([]);
  };

  useEffect(() => {
    initializeGame();
  }, [cardValues]);

  const handleCardClick = (card) => {
    if (isLocked || card.isFlipped || card.isMatched) return;

    const newCards = cards.map((c) => {
      if (c.id === card.id) {
        return { ...c, isFlipped: true };
      } else {
        return c;
      }
    });
    setCards(newCards);

    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);

    if (flippedCards.length === 1) {
      setIsLocked(true);
      const firstCard = cards[flippedCards[0]];

      if (firstCard.value === card.value) {
        setTimeout(() => {
          setMatchedCards((prev) => [...prev, firstCard.id, card.id]);
          setScore((prev) => prev + 100);
          setCards((prev) =>
            prev.map((c) => {
              if (c.id === card.id || c.id === firstCard.id) {
                return { ...c, isMatched: true };
              } else {
                return c;
              }
            }),
          );
          setFlippedCards([]);
          setIsLocked(false);
        }, 500);
      } else {
        setTimeout(() => {
          const flippedBackCard = newCards.map((c) => {
            if (newFlippedCards.includes(c.id)) {
              return { ...c, isFlipped: false };
            } else {
              return c;
            }
          });
          setScore((prev) => Math.max(0, prev - 25));
          setCards(flippedBackCard);
          setFlippedCards([]);
          setIsLocked(false);
        }, 800);
      }
    }
    setMove((prev) => prev + 1);
  };

  return { cards, handleCardClick, score, move, matchedCards, initializeGame };
};
