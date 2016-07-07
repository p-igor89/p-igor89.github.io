window.addEventListener("load", function() {
    var button = document.querySelector(".startNewGame");
    var field = document.querySelector(".field");
    var cells = document.querySelectorAll(".cell");
    var winnerMessage = document.querySelector(".winner-message");
    var nextMove = "x";
    button.addEventListener("click", function() {
        for(var i = 0; i < cells.length; i++){
            cells[i].classList.remove("x");
            cells[i].classList.remove("o");
        }
        nextMove = "x";
        winnerMessage.innerHTML = "";
    });
    field.addEventListener("click", function(event){
        if(!event.target.classList.contains("cell") ||
            event.target.classList.contains("x") ||
            event.target.classList.contains("o")
        ){
            return;
        }

        if(getWinner()){
            return;
        }

        event.target.classList.add(nextMove);
        if(nextMove === "x"){
            nextMove = "o";
        }else{
            nextMove = "x";
        }
        var winner = getWinner();
        if(winner)  {
            if(winner === "x"){
                winnerMessage.innerHTML = "Крести победил";
            }else {
                winnerMessage.innerHTML = "Нолик победил";
            }
        }
    })
});