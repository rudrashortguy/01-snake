import { Renderer } from './renderer.js';
import { InputHandler } from './input.js';
import { AudioManager } from './audio.js';
import { UIManager } from './ui.js';

class SnakeGame {
  constructor() {
    this.score = 0;
    this.snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    this.direction = { x: 1, y: 0 };
    this.food = { x: 15, y: 10 };
  }
  reset() { this.score = 0; }
}

const game = new SnakeGame();

window.addEventListener('DOMContentLoaded', () => {
  console.log('Snake Game Loaded');
});

export { SnakeGame };
