/* Параметры игрового поля */

var sizeX = 20; // Ширина
var sizeY = 20; // Высота
var conteinerId = 'conteiner'; // id контейнера
var wallsToggle = false;
var walls = []; // Массив клеток стен


/* Параметры змейки */

var snakeBody = []; // Тело змейки
// Начальные координаты хвоста:
var tailX = (wallsToggle) ? 2 : 1; // По оси X
var tailY = (wallsToggle) ? 2 : 1; // По оси Y
var direction = 'right'; // Направление
var speed = 500; // Скорость
var snakeMove; // Интервал


/* Параметры игры */
var count = 0; // Счет
