/*Модель:
	1. boardSize: размер игровой сетки поля
	2. numShips: кол-во кораблей в игре
	3. ships: позиций кораблей и координаты попаданий
	4. shipsSunk: количество потопленных кораблей
	5. shipLength: длина каждого корабля в клетках
	6. fire: метод для выполнения выстрела и проверки результата(промах или попадание)
*/

var model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,
	// масивы хранят координаты клеток корабля и с попаданиями выстрелами в клетки.
	ships: [
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] }
	],

// Фискированое позициронировае кораблей для тестирования
/*
	ships: [
		{ locations: ["06", "16", "26"], hits: ["", "", ""] },
		{ locations: ["24", "34", "44"], hits: ["", "", ""] },
		{ locations: ["10", "11", "12"], hits: ["", "", ""] }
	],
*/

	fire: function(guess) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess); // Проверка, есть ли в массиве выбранное значение

			// here's an improvement! Check to see if the ship
			// has already been hit, message the user, and return true.
			if (ship.hits[index] === "hit") {
				view.displayMessage("Oops, you already hit that location!");
				return true;
			} else if (index >= 0) {
				ship.hits[index] = "hit"; // ставим отметку в масив hits
				//Отображаем маркер попадания
				view.displayHit(guess);
				view.displayMessage("HIT!");
				//Если корабль потоплен, увеличиваем счетчик потоплений на +1
				if (this.isSunk(ship)) {
					view.displayMessage("You sank my battleship!"); // сообщение о том что мы потопили корабль
					this.shipsSunk++;
				}
				return true;
			}
		}
		//Если промазали
		view.displayMiss(guess);
		view.displayMessage("You missed.");
		return false;
	},
	// Проверка, корабль полностью потоплен или нет
	isSunk: function(ship) {
		for (var i = 0; i < this.shipLength; i++)  {
			if (ship.hits[i] !== "hit") {
				return false; // если ещё не все клетки заполнены hit то возвращает false
			}
		}
	    return true;
	},
	//Создаем в модели массив с кол-во кораблей
	generateShipLocations: function() {
		var locations;
		for (var i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip(); //генирация нового набора позиций
			} while (this.collision(locations)); // проверка, перекрываел ли эти позиций с существующими кораблями на доске
			this.ships[i].locations = locations;
		}
		console.log("Ships array: ");
		console.log(this.ships);
	},
	// Создаем один корабль в произвольном месте игрового поля
	generateShip: function() {
		var direction = Math.floor(Math.random() * 2);
		var row, col;

		if (direction === 1) { // будет распологаться горизонтально
			row = Math.floor(Math.random() * this.boardSize); //начало корабля по x
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1)); //начало корабля по y
		} else { // будет распологаться вертикально
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1)); //начало корабля по x
			col = Math.floor(Math.random() * this.boardSize); //начало корабля по y
		}

		var newShipLocations = []; // для набора позиций нового корабля
		for (var i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i)); // для горизонтального корабля
			} else {
				newShipLocations.push((row + i) + "" + col); // для вертикального корабля
			}
		}
		return newShipLocations; // если все позиций сгенирированы
	},
	//Проверка, перекрывает ли корабль другие корабли
	collision: function(locations) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}
	
}; 


var view = {
	//получаем строковое сообщение и выводим его в области сообщения
	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},
	// если попали
	displayHit: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},
	// если промахнулись
	displayMiss: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	}

}; 


/*
	Контроллер
	1. processGuess: ПОлечение и обработка координат выстрела
	2. guesses: Отслеживание количества выстрелов
	3. Запрос к модели на обновление в соответствий с последним выстрелом
	4. Проверка завершения игры, когда все корабли потоплены.
*/
var controller = {
	guesses: 0,

	processGuess: function(guess) {
		var location = parseGuess(guess); // проверка введеных данных
		if (location) {
			this.guesses++; // счетчик увеличиваем попаданий
			var hit = model.fire(location);
			if (hit && model.shipsSunk === model.numShips) { //сообщение, когда все корабли потопленны
					view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
			}
		}
	}
}
//Проверка ввода координат от пользователя на валидность
function parseGuess(guess) {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"]; //масив букв для проверки
	// Проверка на нул и на кол-во символов
	if (guess === null || guess.length !== 2) {
		alert("Oops, please enter a letter and a number on the board.");
	} else {
		var firstChar = guess.charAt(0); // извлекаем первый символ строки
		var row = alphabet.indexOf(firstChar); // получаем цифру в диапазоне от 0 до 6
		var column = guess.charAt(1); // извлекаем второй символ
		//Проверки на валидность координат
		if (isNaN(row) || isNaN(column)) {
			alert("Oops, that isn't on the board.");
		} else if (row < 0 || row >= model.boardSize ||
		           column < 0 || column >= model.boardSize) {
			alert("Oops, that's off the board!");
		} else { // если всё ок, возвращаем результат
			return row + column;
		}
	}
	return null; //значит проверка не пройденна
}


// Обрабочик события, получение координат от игрока
function handleFireButton() {
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value.toUpperCase(); // переводим в верхний регистр

	controller.processGuess(guess); // передаем координнаты контроллеру

	guessInput.value = ""; //очищаем поле с вводимыми координатами
}
//Обрабочик нажатия клавиши enter
function handleKeyPress(e) {
	var fireButton = document.getElementById("fireButton");
	if (e.keyCode === 13) {
		fireButton.click();
		return false; // что бы форма не делала нечего лишнего(не пыталась педавать данные)
	}
}


// Брвузер должен выполнять init при полной загрузке страницы
window.onload = init;

function init() {
	// обработчик собития кнопки Fire
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;

	// запускаем обрабочик, который позволяет вводить координаты через enter
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;

	// генирация позиций кораблей
	model.generateShipLocations();
}
//Автофокус для инпута
function setFocus(){
      document.getElementById("guessInput").focus();
 }




