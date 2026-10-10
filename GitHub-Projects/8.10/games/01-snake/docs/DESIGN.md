# Snake Game - Design Document

## Overview
A classic Snake game implementation with multiple modes, power-ups, and mobile support.

## Architecture

### Core Modules
- `game.js` - Game loop, state management, collision detection
- `renderer.js` - Canvas rendering, board drawing, snake/food/powerup rendering
- `input.js` - Keyboard and touch input handling, direction queue
- `audio.js` - Web Audio API sound effects
- `ui.js` - Score, mode display, power-up UI management
- `utils.js` - Utility functions (clamp, random choice, etc.)

### Game Modes
- **Classic**: Traditional snake - grow longer, avoid walls and self
- **Time Attack**: Score as many points as possible in 60 seconds
- **Survival**: Snake speeds up over time, difficulty increases

### Power-ups
- Speed Boost (⚡): 2x movement speed for 5 seconds
- Slow Motion (🐢): Half speed for 8 seconds
- Double Points (×2): 2x points for 10 seconds
- Invincibility (★): Pass through walls/self for 6 seconds

## Controls

### Desktop
- Arrow keys to move
- Space to pause/resume
- R to restart

### Mobile
- Swipe to move
- Tap to pause/resume
- D-pad buttons for explicit control

## Rendering
- HTML5 Canvas (400x400)
- 20x20 grid (20px cells)
- Pixel art style for retro feel

## Future Enhancements
- Level editor
- Custom snake skins
- Online leaderboards
- Local multiplayer