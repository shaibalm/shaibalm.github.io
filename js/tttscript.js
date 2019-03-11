const player = 'O';
const comp = 'X';
const cells = document.querySelectorAll('.cell');
var currentGameBoard = Array.from(Array(9), (x, index) => index);
const winningCombos = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[2,4,6]
];

startGame(currentGameBoard, winningCombos)

function startGame(gameBoard, winningCombos) {
	document.getElementById("endGameDisplay").innerHTML = "Good Luck!";
	currentGameBoard = Array.from(Array(9), (x, index) => index);
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
}

function turnClick(square) {
	turn(square.target.id, player)
	computerLogic(square.target.id);
}

function turn(squareId, player) {
	if (!isFilled(squareId)) {
		document.getElementById(squareId).innerText = player;
		currentGameBoard[squareId] = player;
		endScreenMessage(currentGameBoard, winningCombos, player);
	}
	else {
		console.log('Cannot click on same square twice');
	}
}

function computerLogic(squareId) {
	var square;
	if (canWin()[0]) {
		computerMove(canWin()[1])
	}
	/**
	else if (canBlock(squareId)) {
		computerMove(square)
	}
	else if (canFork(squareId)) {
		computerMove(square)
	}
	else if (canBlockFork(squareId)) {
		computerMove(square)
	}
	else if (pickCenter(squareId)) {
		computerMove(square)
	}
	else if (pickOppositeCenter(squareId)) {
		computerMove(square)
	}
	else if (pickEmptyCorner(squareId)) {
		computerMove(square)
	}
	**/
	else {
		computerMove(4)
	}
}

function canWin() {
	for (var i = 0; i < winningCombos.length; i++) {
		for (var j = 0; j < winningCombos[i].length; j++) {
			var x = winningCombos[i][j];
			var y = winningCombos[i][j+1];
			var z = winningCombos[i][j+2];
			if (currentGameBoard[x] == comp && currentGameBoard[y] == comp) {
				if (!isFilled(currentGameBoard[z])) {
					return [true, currentGameBoard[z]];
				}
			}
			else if (currentGameBoard[x] == comp && currentGameBoard[z] == comp) {
				if (!isFilled(currentGameBoard[y])) {
					return [true, currentGameBoard[y]];
				}				
			}
			else if (currentGameBoard[y] == comp && currentGameBoard[z] == comp) {
				if (!isFilled(currentGameBoard[x])) {
					return [true, currentGameBoard[x]];
				}				
			}			
		}
	}
	return false;	
}

function computerMove(squareId) {
	turn(squareId, comp);
}

function isFilled(squareId) {
	if (document.getElementById(squareId).innerText) {
		return true;
	}
	else {
		return false;
	}
}

function endScreenMessage(gameBoard, winningCombos, player) {
	if (endGame(gameBoard, winningCombos, player)) {
		if (win(gameBoard, winningCombos, player)[0] == true && win(gameBoard, winningCombos, player)[1] == 'O') {
			document.getElementById("endGameDisplay").innerHTML = "You Win!";
		}
		else if (win(gameBoard, winningCombos, player)[0] == true && win(gameBoard, winningCombos, player)[1] == 'X') {
			document.getElementById("endGameDisplay").innerHTML = "You Lose!";
		}		
		else {
			document.getElementById("endGameDisplay").innerHTML = "Tie Game!";
		}
	}
}

function endGame(gameBoard, winningCombos, player) {
	if (win(gameBoard, winningCombos, player) || tie(gameBoard)) {
		return true;
	}
	else {
		return false;
	}
}

function win(gameBoard, winningCombos, player) {
	for (var i = 0; i < winningCombos.length; i++) {
		for (var j = 0; j < winningCombos[i].length; j++) {
			var x = winningCombos[i][j];
			var y = winningCombos[i][j+1];
			var z = winningCombos[i][j+2];
			if (gameBoard[x] == player && gameBoard[y] == player && gameBoard[z] == player) {
				return [true, player];
			}
		}
	}
}

function tie(gameBoard) {
	var counter = 0;
	var emptyBoard = Array.from(Array(9), (x, index) => index);
	for (var i = 0; i < gameBoard.length; i++) {
		if (gameBoard[i] != emptyBoard[i]) {
			counter++;
		}
	}
	if (counter == 9) {
		return true;
	}
}

