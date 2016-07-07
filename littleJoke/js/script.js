"use strict"

$(document).ready(function(){
	$("#yes").click(function(){
		alert("Отлично, мы планируем понижение её на 30%!");
	})
	$("#no").mouseover(function(event){
		var coordinateX = event.pageX;
		var coordinateY = event.pageY;
		var max = 300;
		var min = 100;
		var randomX = Math.floor(Math.random() * (max - min + 1)) + min;
		var randomY = Math.floor(Math.random() * (max - min + 1)) + min;
		
		coordinateX = randomX;
		coordinateY = randomY;
		
		var summCoord = " (по Х: " + coordinateX + " px" + ", " + "по Y: " + coordinateY + " px" + ")"

	$("#no").offset({top:coordinateX, left:coordinateY});
	$("span").text("Координаты:" + summCoord);	

	});
});


