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
	currentGameBoard = Array.from(Array(9), (x, index) => index);
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}

}

function turnClick(square) {
	turn(square.target.id, player)
}

function turn(squareId, player) {
	if (!isFilled(squareId)) {
		document.getElementById(squareId).innerText = player;
		currentGameBoard[squareId] = player;
		endScreenMessage(currentGameBoard, winningCombos);
		console.log('Filled');
	}
	else {
		console.log('Cannot click on same square twice');
	}
}

function isFilled(squareId) {
	if (document.getElementById(squareId).innerText) {
		return true;
	}
	else {
		return false;
	}
}

function endScreenMessage(gameBoard, winningCombos) {
	if (endGame(gameBoard, winningCombos)) {
		if (win(gameBoard, winningCombos)) {
			document.getElementById("endGameDisplay").innerHTML = "You Win!";
		}
		else {
			document.getElementById("endGameDisplay").innerHTML = "Tie Game!";
		}
	}
}

function endGame(gameBoard, winningCombos) {
	if (win(gameBoard, winningCombos) || tie(gameBoard)) {
		return true;
	}
	else {
		return false;
	}
}

function win(gameBoard, winningCombos) {
	var counter = 0;
	for (var i = 0; i < gameBoard.length; i++) {

	}	
}

function tie(gameBoard) {
	var counter = 0;
	var emptyBoard = Array.from(Array(9), (x, index) => index);
	for (var i = 0; i < gameBoard.length; i++) {
		if (gameBoard[i] != emptyBoard[i]) {
			counter++;
			console.log(gameBoard, counter)
			if (counter = 9) {
			}
		}
	}
}

