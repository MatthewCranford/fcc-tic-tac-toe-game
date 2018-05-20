// prettier-ignore
let gameBoard = [
  [1, 2, 1], 
  [0, 2, 1], 
  [2, 0, 1]
];

$('.game__square').click(function() {
  updateGameBoard($(this));
});

function updateGameBoard(move) {
  const row = move.parent().attr('data-row');
  const square = move.attr('data-square');
  console.log(row, square);
}

function displayGameBoard() {
  let rowId = 0;
  let squareId = 1;

  for (let row of gameBoard) {
    squareId = 0;
    for (let square of row) {
      if (square === 1) {
        $(`#row${rowId} div:nth-child(${squareId + 1})`).text('X');
      } else if (square === 2) {
        $(`#row${rowId} div:nth-child(${squareId + 1})`).text('O');
      }
      squareId++;
    }
    rowId++;
  }
}
displayGameBoard();
