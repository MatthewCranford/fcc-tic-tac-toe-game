// prettier-ignore
let gameBoard = [
  [0, 0, 0], 
  [0, 0, 0], 
  [0, 0, 0]
];
let player;
let computer;
let playerMoved;
let winner;

$('.menu__option').on('click', function() {
  if ($(this).attr('id') === 'x') {
    player = 1;
    computer = 2;
  } else {
    player = 2;
    computer = 1;
  }
  $('.menu').css('display', 'none');
});

$('.board__square').click(function() {
  const row = $(this)
    .parent()
    .attr('data-row');
  const square = $(this).attr('data-square');
  playerMove(row, square);
});

function playerMove(row, square) {
  playerMoved = false;
  updateGameBoard(row, square, player);
  if (playerMoved && !checkGameOver()) {
    computerMove();
    drawGameBoard();
  }
}

function updateGameBoard(row, square, move) {
  if (
    gameBoard[row][square] !== computer &&
    gameBoard[row][square] !== player
  ) {
    gameBoard[row][square] = move;
    playerMoved = true;
    if (!moveAvailable()) {
      drawGameBoard();
      displayOverlay(move);
      var myVar = setTimeout(function() {
        resetGameBoard();
        removeOverlay();
      }, 2000);
    }
    if (checkGameOver()) {
      winner = true;
      drawGameBoard();
      displayOverlay(move);
      var myVar = setTimeout(function() {
        resetGameBoard();
        removeOverlay();
        winner = false;
      }, 2000);
    }
  }
}

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

function displayOverlay(move) {
  $('#overlay').css('display', 'flex');
  if (winner) {
    if (player === move) {
      $('#overlay-text').text('You win!');
    } else {
      $('#overlay-text').text('You lose!');
    }
  } else {
    $('#overlay-text').text('Draw');
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
    calculateMove();
  }
}

function calculateMove() {
  computerMoved = false;

  if (!computerMoved) {
    scanRows();
  }
  if (!computerMoved) {
    scanCols();
  }
  if (!computerMoved) {
    scanDiagonals();
}
  if (!computerMoved && gameBoard[1][1] === 0) {
    updateGameBoard(1, 1, computer);
  }
}

function scanRows() {
    for (let row = 0; row < gameBoard.length; row++) {
    let playerCount = 0;
    let computerCount = 0;

      for (let square = 0; square < gameBoard[row].length; square++) {
        if (gameBoard[row][square] === player) {
        playerCount++;
      } else if (gameBoard[row][square] === computer) {
        computerCount++;
        }
      }
    if (computerCount === 2) {
        for (let square = 0; square < gameBoard[row].length; square++) {
          if (
            gameBoard[row][square] !== player &&
            gameBoard[row][square] !== computer
          ) {
            computerMoved = true;
            return updateGameBoard(row, square, computer);
          }
        }
    } else if (playerCount === 2) {
      for (let square = 0; square < gameBoard[row].length; square++) {
        if (
          gameBoard[row][square] !== player &&
          gameBoard[row][square] !== computer
        ) {
          computerMoved = true;
          return updateGameBoard(row, square, computer);
      }
    }
  }
}
}

function scanCols() {
    for (let i = 0; i < gameBoard.length; i++) {
    let playerCount = 0;
    let computerCount = 0;

      for (let row = 0; row < gameBoard.length; row++) {
        if (gameBoard[row][i] === player) {
        playerCount++;
      } else if (gameBoard[row][i] === computer) {
        computerCount++;
        }
      if (computerCount === 2) {
          for (let row = 0; row < gameBoard.length; row++) {
          if (gameBoard[row][i] !== player && gameBoard[row][i] !== computer) {
              computerMoved = true;
              updateGameBoard(row, i, computer);
            }
          }
      } else if (playerCount === 2) {
        for (let row = 0; row < gameBoard.length; row++) {
          if (gameBoard[row][i] !== player && gameBoard[row][i] !== computer) {
            computerMoved = true;
            updateGameBoard(row, i, computer);
        }
      }
    }
  }
  }
}

function scanDiagonals() {
  let leftDiagonalCount = 0;
  let rightDiagonalCount = 0;
  let leftClearRow = 0;
  let leftClearSquare = 0;
  let rightClearRow = 0;
  let rightClearSquare = 0;

  for (let row = 0; row < gameBoard.length; row++) {
    if (row === 1 && gameBoard[row][1] === player) {
      leftDiagonalCount++;
      rightDiagonalCount++;
    } else if (row === 0) {
      if (gameBoard[row][0] === player) {
        leftDiagonalCount++;
      } else {
        leftClearRow = row;
        leftClearSquare = 0;
      }
      if (gameBoard[row][2] === player) {
        rightDiagonalCount++;
      } else {
        rightClearRow = row;
        rightClearSquare = 2;
      }
    } else if (row === 2) {
      if (gameBoard[row][2] === player) {
        leftDiagonalCount++;
      } else {
        leftClearRow = row;
        leftClearSquare = 2;
      }
      if (gameBoard[row][0] === player) {
        rightDiagonalCount++;
      } else {
        rightClearRow = row;
        rightClearSquare = 0;
      }
    }
  }
  if (leftDiagonalCount === 2) {
    if (gameBoard[leftClearRow][leftClearSquare] === 0) {
      updateGameBoard(leftClearRow, leftClearSquare, computer);
    }
  }
  if (rightDiagonalCount === 2) {
    if (gameBoard[leftClearRow][leftClearSquare] === 0) {
      updateGameBoard(rightClearRow, rightClearSquare, computer);
    }
  }
}
