import { describe, it, expect } from 'node:test';
import assert from 'node:assert/strict';

// Test Utils class
describe('Utils', () => {
  it('clamps value to max', () => {
    const { Utils } = require('./src/utils.js');
    assert.equal(Utils.clamp(15, 0, 10), 10);
  });

  it('clamps value to min', () => {
    const { Utils } = require('./src/utils.js');
    assert.equal(Utils.clamp(-5, 0, 10), 0);
  });

  it('does not clamp valid range', () => {
    const { Utils } = require('./src/utils.js');
    assert.equal(Utils.clamp(5, 0, 10), 5);
  });

  it('returns random choice from array', () => {
    const { Utils } = require('./src/utils.js');
    const arr = ['a', 'b', 'c'];
    const result = Utils.randomChoice(arr);
    assert.ok(arr.includes(result));
  });
});

// Test InputHandler
describe('InputHandler', () => {
  it('queues directional input', () => {
    const { InputHandler } = require('./src/input.js');
    const handler = new InputHandler();
    handler.handleKey('ArrowUp');
    assert.equal(handler.directionQueue.length, 1);
  });

  it('prevents 180-degree turn', () => {
    const { InputHandler } = require('./src/input.js');
    const handler = new InputHandler();
    handler.handleKey('ArrowRight');
    handler.handleKey('ArrowLeft'); // Opposite - should be ignored
    assert.equal(handler.directionQueue.length, 1);
  });
});

// Test AudioManager
describe('AudioManager', () => {
  it('initializes without error', () => {
    const { AudioManager } = require('./src/audio.js');
    const audio = new AudioManager();
    audio.init();
    assert.ok(audio instanceof AudioManager);
  });

  it('handles disabled state', () => {
    const { AudioManager } = require('./src/audio.js');
    const audio = new AudioManager();
    audio.enabled = false;
    assert.doesNotThrow(() => audio.play('eat'));
  });
});

// Test SnakeGame
describe('SnakeGame', () => {
  it('resets score on reset()', () => {
    const { SnakeGame } = require('./src/game.js');
    const game = new SnakeGame();
    game.score = 100;
    game.reset();
    assert.equal(game.score, 0);
  });

  it('starts with a snake of 3 segments', () => {
    const { SnakeGame } = require('./src/game.js');
    const game = new SnakeGame();
    assert.equal(game.snake.length, 3);
  });

  it('initial direction is right', () => {
    const { SnakeGame } = require('./src/game.js');
    const game = new SnakeGame();
    assert.deepEqual(game.direction, { x: 1, y: 0 });
  });
});
