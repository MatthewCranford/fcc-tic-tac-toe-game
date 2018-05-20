// prettier-ignore
let gameBoard = [
  [1, 2, 1], 
  [0, 2, 1], 
  [2, 0, 1]
];

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
