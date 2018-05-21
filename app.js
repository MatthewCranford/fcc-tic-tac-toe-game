// prettier-ignore
let gameBoard = [
  [0, 0, 0], 
  [0, 0, 0], 
  [0, 0, 0]
];
const player = 1;
const computer = 2;

$('.game__square').click(function() {
  const row = $(this)
    .parent()
    .attr('data-row');
  const square = $(this).attr('data-square');

  if (moveAvailable()) {
    updateGameBoard(row, square, player);
    drawGameBoard();
    computerMove();
    drawGameBoard();
  } else {
    resetGameBoard();
  }
});

function updateGameBoard(row, square, player) {
  if (gameBoard[row][square] !== computer) {
    gameBoard[row][square] = player;
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
  } else {
    // resetGameBoard();
  }
}

function moveAvailable() {
  for (let row of gameBoard) {
    for (let square of row) {
      if (square === 0) {
        console.log('true');
        return true;
      }
    }
  }
  return false;
}

function resetGameBoard() {
  for (let row = 0; row < gameBoard.length; row++) {
    for (let square = 0; square < gameBoard.length; square++) {
      gameBoard[row][square] = 0;
    }
  }
  console.log(gameBoard);
  drawGameBoard();
}
