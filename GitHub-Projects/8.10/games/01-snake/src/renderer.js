const ctx = document?.getContext?.('2d') || null;

// Fallback: we'll set up proper imports in game.js
export class Renderer {
  constructor(ctx) {
    this.ctx = ctx;
    this.gridSize = 20;
  }

  clear() {
    this.ctx.fillStyle = '#16213e';
    this.ctx.fillRect(0, 0, 400, 400);
  }

  drawBoard() {
    this.ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    this.ctx.lineWidth = 1;
    for (let i = 0; i <= 20; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(i * 20, 0);
      this.ctx.lineTo(i * 20, 400);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(0, i * 20);
      this.ctx.lineTo(400, i * 20);
      this.ctx.stroke();
    }
  }

  drawSnake(snake) {
    snake.forEach((segment, index) => {
      const isHead = index === 0;
      this.ctx.fillStyle = isHead ? '#4ade80' : '#22c55e';
      this.ctx.fillRect(segment.x * 20 + 1, segment.y * 20 + 1, 18, 18);
      if (isHead) {
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(segment.x * 20 + 5, segment.y * 20 + 5, 4, 4);
        this.ctx.fillRect(segment.x * 20 + 11, segment.y * 20 + 5, 4, 4);
      }
    });
  }

  drawFood(food) {
    this.ctx.fillStyle = '#ef4444';
    this.ctx.beginPath();
    this.ctx.arc(food.x * 20 + 10, food.y * 20 + 10, 8, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawPowerup(powerup) {
    const colors = {
      speed: '#f59e0b',
      slow: '#3b82f6',
      double: '#a855f7',
      invincible: '#fbbf24'
    };
    this.ctx.fillStyle = colors[powerup.type] || '#fff';
    this.ctx.beginPath();
    this.ctx.arc(powerup.x * 20 + 10, powerup.y * 20 + 10, 8, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.fillStyle = '#000';
    this.ctx.font = '10px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    const symbols = { speed: '⚡', slow: '🐢', double: '×2', invincible: '★' };
    this.ctx.fillText(symbols[powerup.type] || '?', powerup.x * 20 + 10, powerup.y * 20 + 10);
  }
}
