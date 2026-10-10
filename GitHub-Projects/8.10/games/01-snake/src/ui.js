export class UIManager {
  constructor() {
    this.scoreEl = document.getElementById('score');
    this.bestScoreEl = document.getElementById('best-score');
    this.overlay = document.getElementById('overlay');
    this.overlayTitle = document.getElementById('overlay-title');
    this.overlaySubtitle = document.getElementById('overlay-subtitle');
    this.modeDisplay = document.getElementById('mode-display');
    this.powerupDisplay = document.getElementById('powerup-display');
  }

  updateScore(score) {
    this.scoreEl.textContent = score;
  }

  updateBestScore(score) {
    this.bestScoreEl.textContent = score;
  }

  updateModeDisplay(mode) {
    const labels = { classic: 'Classic', timeattack: 'Time Attack', survival: 'Survival' };
    this.modeDisplay.textContent = labels[mode] || mode;
  }

  showOverlay(title, subtitle) {
    this.overlayTitle.textContent = title;
    this.overlaySubtitle.textContent = subtitle;
    this.overlay.classList.remove('hidden');
  }

  hideOverlay() {
    this.overlay.classList.add('hidden');
  }

  showPowerup(type) {
    const labels = {
      speed: '⚡ SPEED!',
      slow: '🐢 SLOW!',
      double: '×2 POINTS!',
      invincible: '★ INVINCIBLE!'
    };
    this.powerupDisplay.textContent = labels[type] || '';
    this.powerupDisplay.classList.remove('hidden');
    setTimeout(() => this.hidePowerup(), 2000);
  }

  hidePowerup() {
    this.powerupDisplay.classList.add('hidden');
  }
}
