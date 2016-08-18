function Cell(locationX, locationY, cellType) {
  this.locationX = locationX;
  this.locationY = locationY;
  this.cellType = cellType;

  // Создание клетки:
  this.create = function() {
    var cellNumber = (this.locationY - 1) * sizeX + this.locationX;
    $('.cell:nth-child(' + cellNumber + ')').removeClass().addClass('cell ' + this.cellType);
  }

  // Очистка клетки:
  this.delete = function() {
    var cellNumber = (this.locationY - 1) * sizeX + this.locationX;
    $('.cell:nth-child(' + cellNumber + ')').removeClass().addClass('cell');
  }
}
