function VerticalLine(firstY, lastY, locationX) {
  this.locationX = locationX;
  this.firstY = firstY;
  this.lastY = lastY;
  this.line = [];

  // Создание вертикальной стены:
  this.create = function() {
    for (var i = 0; i <= this.lastY - this.firstY; i++) {
      this.line[i] = new Cell(this.locationX, this.firstY + i, 'obstacle');
      this.line[i].create();
    }

    walls[walls.length] = this.line;
  }
}
