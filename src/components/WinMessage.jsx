export const WinMessage = ({ move, score, onReset }) => {
  return (
    <div className="win-overlay">
      <div className="win-message">
        <h2>🎉 Congratulations! You Win! 🎉</h2>
        <div className="win-stats">
          <div>
            <span>Score:</span>
            <strong>{score}</strong>
          </div>
          <div>
            <span>Moves:</span>
            <strong>{move}</strong>
          </div>
          <button className="reset-btn" onClick={onReset}>
            {" "}
            Play Again{" "}
          </button>
        </div>
      </div>
    </div>
  );
};
