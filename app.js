// prettier-ignore
let gameBoard = [
  [0, 0, 0], 
  [0, 0, 0], 
  [0, 0, 0]
];
const player = 1;
const computer = 2;

$('.game__square').click(function() {
  updateGameBoard($(this));
  drawGameBoard();
});

function updateGameBoard(move) {
  const row = move.parent().attr('data-row');
  const square = move.attr('data-square');
  gameBoard[row][square] = player;
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
      }
      squareId++;
    }
    rowId++;
  }
}
