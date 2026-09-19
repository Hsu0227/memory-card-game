# Memory Card Game

A memory card matching game built with React and Vite.

## Features

- 🃏 Match pairs of cards
- 🎯 Score system with rewards and penalties
- 🔄 Reset and play again
- 🏆 Personal Best records
- 💾 Personal Best saved with localStorage
- 🎨 Multiple themes: Fruits, Animals, and Cars

## Tech Stack

- React
- JavaScript
- Vite
- CSS
- localStorage

## How to Run

Clone the repository and install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local URL shown in the terminal.

## Game Rules

- Matching two cards gives **+100 points**
- Mismatching two cards gives **-25 points**
- Score cannot go below 0
- Personal Best is saved separately for each theme
- When scores are equal, fewer moves gives the better record
