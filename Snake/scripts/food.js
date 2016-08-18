function Food() {
  this.food;
  var locationX;
  var locationY;
  var foodX;
  var foodY;

  // Генерация координат:
  function coordinateGeneration() {
    locationX = new IntRandom(1, sizeX);
    locationY = new IntRandom(1, sizeY);
    foodX = locationX.create();
    foodY = locationY.create();
  }

  // Проверка координат:
  function checkTheCoordinates(checkingObject) {
    var check = true;

    for (var i = 0; i < checkingObject.length; i++) {
      if (foodX == checkingObject[i].locationX && foodY == checkingObject[i].locationY) {
        check = false;
        break;
      }
    }

    return check;
  }

  // Создание еды:
  this.create = function() {
    var checkSnake = true;
    var checkWalls = true;

    // Генерация и проверка координат:
    coordinateGeneration();
    checkSnake = checkTheCoordinates(snakeBody);
    for (var i = 0; i < walls.length; i++) {
      checkWalls = checkTheCoordinates(walls[i]);
      if (!checkWalls) break;
    }

    if (checkSnake && checkWalls) {
      this.food = new Cell(foodX, foodY, 'food');
      this.food.create();
    } else {
      this.create();
    }
  }
}
