import { useState, useEffect } from "react";
import { GameHeader } from "./components/GameHeader";
import { Card } from "./components/Card";
import { WinMessage } from "./components/WinMessage";
import { useLogic } from "./hooks/useLogic";

const cardValues = {
  fruits: [
    "🍎",
    "🍌",
    "🍇",
    "🍊",
    "🍓",
    "🥝",
    "🍑",
    "🍒",
    "🍎",
    "🍌",
    "🍇",
    "🍊",
    "🍓",
    "🥝",
    "🍑",
    "🍒",
  ],

  animals: [
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
  ],

  cars: [
    "🚗",
    "🚕",
    "🚙",
    "🚌",
    "🚓",
    "🚑",
    "🚒",
    "🚐",
    "🚗",
    "🚕",
    "🚙",
    "🚌",
    "🚓",
    "🚑",
    "🚒",
    "🚐",
  ],
};

function App() {
  const [theme, setTheme] = useState("fruits");
  const defaultBestRecords = {
    fruits: { score: 0, move: 0 },
    animals: { score: 0, move: 0 },
    cars: { score: 0, move: 0 },
  };
  const [bestRecord, setBestRecord] = useState(() => {
    const saved = localStorage.getItem("bestRecord");

    return saved ? JSON.parse(saved) : defaultBestRecords;
  });

  const { cards, handleCardClick, score, move, matchedCards, initializeGame } =
    useLogic(cardValues[theme]);

  const updateBestRecord = () => {
    const currentBest = bestRecord[theme];

    if (
      score > currentBest.score ||
      (score === currentBest.score && move < currentBest.move)
    ) {
      const newRecord = {
        ...bestRecord,
        [theme]: {
          score,
          move,
        },
      };

      setBestRecord(newRecord);

      localStorage.setItem("bestRecord", JSON.stringify(newRecord));
    }
  };

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      updateBestRecord();
    }
  }, [matchedCards]);

  return (
    <div className="app">
      <div className="personal-best">
        <h3>🏆 Personal Best</h3>
        <p>Score: {bestRecord[theme].score}</p>
        <p>Moves: {bestRecord[theme].move}</p>
      </div>

      {matchedCards.length === cards.length && (
        <WinMessage move={move} score={score} onReset={initializeGame} />
      )}
      <GameHeader
        score={score}
        move={move}
        onReset={initializeGame}
        theme={theme}
        onThemeChange={setTheme}
      />
      <div className="cards-grid">
        {cards.map((card) => (
          <Card card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
