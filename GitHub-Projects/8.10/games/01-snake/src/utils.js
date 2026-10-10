export class Utils {
  static clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  static randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  static lerp(a, b, t) {
    return a + (b - a) * t;
  }
}
