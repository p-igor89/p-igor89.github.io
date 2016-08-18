function IntRandom(min, max) {
  this.number = Math.floor(Math.random() * (max - min)) + min;

  // Вывод псевдослучайного числа:
  this.create = function() {
    return this.number;
  }
}
