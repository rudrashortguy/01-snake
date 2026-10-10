# Snake Game

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Canvas](https://img.shields.io/badge/HTML5-Canvas-blue)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

Classic Snake game implementation with multiple game modes, power-ups, and mobile touch support.

## Features

- Classic snake gameplay with smooth controls
- Multiple game modes: Classic, Time Attack, Survival
- Power-ups: Speed boost, Slow motion, Double points, Invincibility
- Mobile touch controls with swipe gestures
- Responsive design - works on desktop and mobile
- Score tracking and high score persistence
- Sound effects and background music
- Clean, modern UI with animations
- Configurable game settings (speed, board size, etc.)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rudra-suryavanshi/01-snake.git
   cd 01-snake
   ```

2. Install dependencies (optional for development):
   ```bash
   npm install
   ```

3. Open `index.html` in your browser or run:
   ```bash
   npm run dev
   ```
   Then visit `http://localhost:3000`

## Usage

### Desktop Controls
- Arrow Keys: Move snake in four directions
- Space: Pause/Resume game
- P: Pause game
- R: Restart game

### Mobile Controls
- Swipe up/down/left/right: Move snake
- Tap center: Pause/Resume
- Double tap: Restart

### Game Modes
- **Classic**: Traditional snake gameplay - grow longer, avoid walls and self
- **Time Attack**: Score as many points as possible in 60 seconds
- **Survival**: Snake constantly grows, see how long you can last

### Power-ups
Collect special items that appear randomly:
- ⚡ Speed Boost: Double snake speed for 5 seconds
- 🐢 Slow Motion: Halve game speed for 8 seconds
- 💎 Double Points: Earn 2x points for 10 seconds
- 🛡️ Invincibility: Pass through walls and self for 6 seconds

## Project Structure

```
01-snake/
├── index.html          # Main HTML file
├── src/
│   ├── game.js         # Core game logic
│   ├── renderer.js     # Canvas rendering
│   ├── input.js        # Input handling
│   ├── audio.js        # Sound management
│   ├── ui.js           # UI components
│   └── utils.js        # Utility functions
├── tests/              # Unit tests
├── assets/             # Images, sounds, fonts
├── docs/               # Documentation
└── README.md
```

## Technology Stack

- **HTML5 Canvas** - For rendering game graphics
- **Vanilla JavaScript (ES6+)** - No frameworks or libraries
- **CSS3** - For styling and animations
- **Web Audio API** - For sound effects
- **localStorage** - For high score persistence

## Testing

Run the test suite:
```bash
npm test
```

For coverage report:
```bash
npm run test:coverage
```

## Development

To run a local development server:
```bash
npm run dev
```

To lint the code:
```bash
npm run lint
```

## Roadmap

- [x] Basic snake gameplay
- [x] Multiple game modes
- [x] Power-up system
- [x] Mobile touch controls
- [x] Sound effects and music
- [ ] Local multiplayer (2 players on same device)
- [ ] Online leaderboard
- [ ] Custom snake skins
- [ ] Level editor
- [ ] Achievements system

## Screenshots

![Gameplay Screenshot](assets/screenshot1.png)
![Mobile Controls](assets/screenshot2.png)
![Power-ups in action](assets/screenshot3.png)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the classic Nokia Snake game
- Sound effects from [ZapSplat](https://www.zapsplat.com)
- Font: 'Press Start 2P' from Google Fonts