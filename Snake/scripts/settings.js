// Показать/скрыть меню настроек:
$('.open a').click(function() {
  $('.settings').slideDown(500);
  $('.finish').slideUp(500);
})

$('.close a').click(function() {
  $('.settings').slideUp(500);
})


// Валидация текстовых полей:
$('#fieldX, #fieldY').change(function() {
  if (parseInt($('#fieldX').val()) < 10) {
    $('#fieldX').val('20');
    alert('Допускаются значения ширины от 10 до 30 столбцов. Установлено значение по умолчанию.')
  } else if (parseInt($('#fieldX').val()) > 30) {
    $('#fieldX').val('20');
    alert('Допускаются значения ширины от 10 до 30 столбцов. Установлено значение по умолчанию.')
  }
})

// Новая игра и применение
$('.finish a, input[type = button]').click(function() {
  applyChanges();
  $('.finish').slideUp(500);
});


// Применение настроек:
function applyChanges() {
  // Размеры игрового поля:
  sizeX = parseInt($('#fieldX').val());
  sizeY = parseInt($('#fieldY').val());

  // Границы:
  if ($('#borders').prop('checked')) {
    wallsToggle = true;
  } else {
    wallsToggle = false;
  }

  // Очистка тела змейки:
  snakeBody = [];

  // Начальные координаты хвоста и направление:
  tailX = (wallsToggle) ? 2 : 1;
  tailY = (wallsToggle) ? 2 : 1;
  direction = 'right';

  // Скорость змейки:
  speed = 600 - $('#snakeSpeed').val();

  start();
}
