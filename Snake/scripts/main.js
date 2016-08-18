function start() {
  // Обнуление счета:
  count = 0;

  // Создание игрового поля:
  var field = new Field(sizeX, sizeY, conteinerId);
  field.create();

  // Создание змейки:
  for (var i = 1; i < snakeBody.length; i++) {
    delete snakeBody[i];
  }

  var snake = new Snake(tailX, tailY, direction);
  snake.create();

  // Создание стен:
  if (wallsToggle) {
    field.wallsOn();
  }

  // Создание еды:
  var food = new Food();
  food.create();

  // Движение змейки:
  clearInterval(snakeMove);
  snakeMove = setInterval(snake.move, speed);
}

$(document).ready(function() {
  start();
});
