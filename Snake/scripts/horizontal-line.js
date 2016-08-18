function HorizontalLine(firstX, lastX, locationY) {
  this.firstX = firstX;
  this.lastX = lastX;
  this.locationY = locationY;
  this.line = [];

  // Создание горизонтальной стены:
  this.create = function() {
    for (var i = 0; i <= this.lastX - this.firstX; i++) {
      this.line[i] = new Cell(this.firstX + i, this.locationY, 'obstacle');
      this.line[i].create();
    }

    walls[walls.length] = this.line;
  }
}
