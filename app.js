// prettier-ignore
let gameBoard = [
  [0, 0, 0], 
  [0, 0, 0], 
  [0, 0, 0]
];
const player = 1;
const computer = 2;
let playerMoved;

$('.board__square').click(function() {
  const row = $(this)
    .parent()
    .attr('data-row');
  const square = $(this).attr('data-square');

  if (moveAvailable()) {
    playerMove(row, square);
  } else {
    resetGameBoard();
  }
});

function moveAvailable() {
  for (let row of gameBoard) {
    for (let square of row) {
      if (square === 0) {
        return true;
      }
    }
  }
  return false;
}

function playerMove(row, square) {
  playerMoved = false;
  updateGameBoard(row, square, player);
  if (playerMoved && !checkGameOver()) {
    computerMove();
    drawGameBoard();
  }
}

function updateGameBoard(row, square, player) {
  if (
    gameBoard[row][square] !== computer &&
    gameBoard[row][square] !== player
  ) {
    gameBoard[row][square] = player;
    if (player === 1) {
      playerMoved = true;
    }

    if (checkGameOver()) {
      drawGameBoard();
      displayOverlay();
      var myVar = setTimeout(function() {
        resetGameBoard();
        removeOverlay();
      }, 2000);
    }
  }
}

function displayOverlay() {
  $('#overlay').css('display', 'flex');
  $('#overlay-text').text('You win!');
}

function removeOverlay() {
  $('#overlay').css('display', 'none');
}

function checkGameOver() {
  if (checkRows() || checkCols() || checkDiagonal()) {
    return true;
  } else return false;
}

function checkRows() {
  for (let row = 0; row < gameBoard.length; row++) {
    if (
      gameBoard[row][0] !== 0 &&
      gameBoard[row][0] === gameBoard[row][1] &&
      gameBoard[row][0] === gameBoard[row][2]
    ) {
      return true;
    }
  }
  return false;
}

function checkCols() {
  for (let index = 0; index < 3; index++) {
    if (
      gameBoard[0][index] !== 0 &&
      gameBoard[0][index] === gameBoard[1][index] &&
      gameBoard[0][index] === gameBoard[2][index]
    ) {
      return true;
    }
  }
  return false;
}

function checkDiagonal() {
  if (
    gameBoard[0][0] !== 0 &&
    gameBoard[0][0] === gameBoard[1][1] &&
    gameBoard[0][0] === gameBoard[2][2]
  ) {
    return true;
  } else if (
    gameBoard[0][2] !== 0 &&
    gameBoard[0][2] === gameBoard[1][1] &&
    gameBoard[0][2] === gameBoard[2][0]
  ) {
    return true;
  } else {
    return false;
  }
}

function computerMove() {
  let randRow = Math.floor(Math.random() * gameBoard.length);
  let randSquare = Math.floor(Math.random() * gameBoard[0].length);
  if (moveAvailable()) {
    while (
      gameBoard[randRow][randSquare] === 1 ||
      gameBoard[randRow][randSquare] === 2
    ) {
      randRow = Math.floor(Math.random() * gameBoard.length);
      randSquare = Math.floor(Math.random() * gameBoard[0].length);
    }
    return updateGameBoard(randRow, randSquare, computer);
  }
}

function drawGameBoard() {
  let rowId = 0;
  for (let row of gameBoard) {
    let squareId = 0;
    for (let square of row) {
      if (square === 1) {
        $(`[data-row=${rowId}]`)
          .children(`[data-square=${squareId}]`)
          .text('X');
      } else if (square === 2) {
        $(`[data-row=${rowId}]`)
          .children(`[data-square=${squareId}]`)
          .text('O');
      } else {
        $(`[data-row=${rowId}]`)
          .children(`[data-square=${squareId}]`)
          .text('');
      }
      squareId++;
    }
    rowId++;
  }
}

function resetGameBoard() {
  for (let row = 0; row < gameBoard.length; row++) {
    for (let square = 0; square < gameBoard.length; square++) {
      gameBoard[row][square] = 0;
    }
  }
  drawGameBoard();
}
