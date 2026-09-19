export const GameHeader = ({ score, move, onReset, theme, onThemeChange }) => {
  return (
    <div className="game-header">
      <h1>🕹️ Memory Card Game</h1>
      <div className="stats">
        <div className="stats-item">
          <span className="stats-label">Score:</span>{" "}
          <span className="stats-value">{score}</span>
        </div>
        <div className="stats-item">
          <span className="stats-label">Moves:</span>{" "}
          <span className="stats-value">{move}</span>
        </div>
      </div>
      <div className="btn-area">
        <button className="reset-btn" onClick={onReset}>
          Reset Game
        </button>
        <select
          className="theme-select"
          value={theme}
          onChange={(e) => onThemeChange(e.target.value)}
        >
          <option className="sel-option" value="fruits">
            🍎 Fruits
          </option>
          <option className="sel-option" value="animals">
            🐶 Animals
          </option>
          <option className="sel-option" value="cars">
            🚗 Cars
          </option>
        </select>
      </div>
    </div>
  );
};
