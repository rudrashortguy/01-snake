export class InputHandler {
  constructor() {
    this.directionQueue = [];
  }

  handleKey(key) {
    const keyMap = {
      'ArrowUp': { x: 0, y: -1 },
      'ArrowDown': { x: 0, y: 1 },
      'ArrowLeft': { x: -1, y: 0 },
      'ArrowRight': { x: 1, y: 0 }
    };

    const direction = keyMap[key];
    if (!direction) return;

    // Queue the direction (max 2 pending)
    if (this.directionQueue.length < 2) {
      this.directionQueue.push(direction);
    }
  }

  getNextDirection(currentDirection) {
    if (this.directionQueue.length === 0) return currentDirection;

    const next = this.directionQueue.shift();
    // Prevent 180-degree turns
    if (next.x === -currentDirection.x && next.y === -currentDirection.y) {
      return this.getNextDirection(currentDirection);
    }
    return next;
  }
}
