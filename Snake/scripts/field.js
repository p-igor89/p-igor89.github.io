function Field(sizeX, sizeY, conteinerId) {
  this.sizeX = sizeX; // Ширина
  this.sizeY = sizeY; // Высота
  this.conteiner = $('#' + conteinerId); // Контейнер

  // Создание поля:
  this.create = function() {
    var numberOfCells = this.sizeX * this.sizeY;

    // Подготовка контейнера:
    this.conteiner.html(null);
    this.conteiner.css({
      'width': this.sizeX * 20 + 'px',
      'height': this.sizeY * 20 + 'px',
      'margin-top': '-' + this.sizeY * 10 + 'px',
      'margin-left': '-' + this.sizeX * 10 + 'px'
    });

    // Создание клеток:
    for (var i = 0; i < numberOfCells; i++) {
      $('<div class="cell"></div>').appendTo(this.conteiner);
    }
  }

  // Создание стен:
  this.wallsOn = function() {
    var leftWall = new VerticalLine(1, this.sizeY, 1);
    leftWall.create();

    var rightWall = new VerticalLine(1, this.sizeY, this.sizeX);
    rightWall.create();

    var topWall = new HorizontalLine(2, this.sizeX - 1, 1);
    topWall.create();

    var bottomWall = new HorizontalLine(2, this.sizeX - 1, this.sizeY);
    bottomWall.create();
  }
}
