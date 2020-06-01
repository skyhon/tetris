import Matrix from "./matrix";

//--------------------------------------------------------------
// Extending Array
//--------------------------------------------------------------

// finding maximum value
Array.prototype.max = function () {
  return Math.max.apply(null, this);
};

// finding minimum value
Array.prototype.min = function () {
  return Math.min.apply(null, this);
};

//--------------------------------------------------------------
// Board Class
//--------------------------------------------------------------
export default class Board {
  constructor(numRows, numCols) {
    this.matrix = new Matrix(numRows, numCols);
    this.numRows = numRows;
    this.numCols = numCols;

    this.boundary = {
      top: 0,
      left: 0,
      right: this.numCols - 1,
      bottom: this.numRows - 1,
    };
  }

  // get board boundaries
  getBoundary() {
    return this.boundary;
  }

  // remove a row
  removeARow(rowNum) {
    this.matrix.removeARow(rowNum);
    this.numRows = this.matrix.numRows;
  }

  // insert a row
  insertARow(rowNum) {
    this.matrix.insertARow(rowNum);
    this.numRows = this.matrix.numRows;
  }

  // empty a row
  emptyRow(rowNum) {
    this.matrix.row[rowNum - 1].emptyMe();
  }

  // fill a row
  fillRow(rowNum) {
    this.matrix.row[rowNum - 1].fillMe();
  }

  // empty a cell
  emptyCell(coord) {
    var ROW = 0,
      COL = 1;

    if (this.isInBound(coord) && coord[ROW] - 1 >= 0) {
      this.matrix.row[coord[ROW] - 1].cells[coord[COL] - 1].emptyMe();
    }
  }

  // fill a cell
  fillCell(coord) {
    var ROW = 0,
      COL = 1;

    if (this.isInBound(coord) && coord[ROW] - 1 >= 0) {
      this.matrix.row[coord[ROW] - 1].cells[coord[COL] - 1].fillMe();
    }
  }

  // clears the whole board
  emptyMe() {
    this.matrix.emptyMe();
  }

  // registers piece into the board with the given array of coordinates
  // array size (of coordinates) must be less than size of one of the piece matrices (default: 5x5 or 25)
  registerPiece(filledCellCoords) {
    var ROW = 0,
      COL = 1;

    for (var i = 0; i < filledCellCoords.length; i++) {
      // coordinates validation and adjustment has been taken care of in the fillCell method
      this.fillCell(filledCellCoords[i]);
    }
  }

  // remove filled rows with given registered coordinates
  removeFilledRows(extremes) {
    var ROW = 0,
      COL = 1;

    var rowsRemoved = {
      indexes: new Array(), //new Array (extremes.max[ROW] - extremes.min[ROW] + 1),
      count: 0,
    };

    // make sure minimum is not a negative value

    if (this.isInBound(extremes.min) && extremes.min[ROW] > 0) {
      for (var i = extremes.max[ROW]; i >= extremes.min[ROW]; i--) {
        var thisRow = this.matrix.row[i - 1];

        if (thisRow.isFilled()) {
          this.removeARow(i); // remove a row from the board

          rowsRemoved.indexes[rowsRemoved.count] = i;
          rowsRemoved.count++;
        }
      }

      // add row(s) back to the board
      if (rowsRemoved.count > 0) {
        for (var i = 0; i < rowsRemoved.count; i++) {
          this.insertARow(1);
        }
      }
    }

    if (rowsRemoved.count <= 0) rowsRemoved.indexes = null;

    return rowsRemoved;
  }

  // check to see if row is filled
  isRowFilled(rowNum) {
    return this.matrix.row[rowNum - 1].isFilled();
  }

  // check to see if row is empty
  isRowEmpty(rowNum) {
    return this.matrix.row[rowNum - 1].isEmpty();
  }

  // check and see if the row is filled
  isRowFilled(rowNum) {
    var filled = false;

    if (rowNum > 0 && rowNum <= this.numRows)
      filled = this.matrix.row[rowNum - 1].isFilled();

    return filled;
  }

  // check to see if row is empty
  isCellEmpty(coord) {
    var ROW = 0,
      COL = 1;

    var cellEmpty = true;

    if (this.isInBound(coord) && coord[ROW] > this.boundary.top)
      cellEmpty = this.matrix.row[coord[ROW] - 1].cells[
        coord[COL] - 1
      ].isEmpty();

    return cellEmpty;
  }

  // check to see if piece is colliding with registered cells
  isBlockOverlapped(coords) {
    var collided = false;

    for (var i = 0; i < coords.length; i++) {
      if (this.isCellFilled(coords[i])) {
        collided = true;
        break;
      }
    }

    return collided;
  }

  // check and see if the cell is occupied
  isCellFilled(coord) {
    var ROW = 0,
      COL = 1;

    var cellFilled = false;

    if (this.isInBound(coord) && coord[ROW] > this.boundary.top)
      cellFilled = this.matrix.row[coord[ROW] - 1].cells[
        coord[COL] - 1
      ].isFilled();

    return cellFilled;
  }

  // check to see if the given cooordinate is within the boardary
  isInBound(coord) {
    var ROW = 0,
      COL = 1;

    var inBound = !(
      coord[COL] - 1 < this.boundary.left ||
      coord[COL] - 1 > this.boundary.right ||
      coord[ROW] - 1 > this.boundary.bottom
    );

    //alert ('coord: ' + coord + ', isInBound: ' + inBound);
    return inBound;
  }

  // check to see if the given cooordinate is out of the boardary
  isOutOfBound(coord) {
    return !this.isInBound(coord);
  }

  // is it possible to place the piece on the board
  isPlacementPossible(filledCoords) {
    let possible = true;

    for (let i = 0; i < filledCoords.length; i++) {
      if (
        this.isOutOfBound(filledCoords[i]) ||
        this.isCellFilled(filledCoords[i])
      ) {
        // is piece inbound or board's cell filled
        possible = false;
        break;
      }
    }
    return possible;
  }
  // print board
  printMe() {
    this.matrix.printMe();
  }

  // print board
  writeMe() {
    return this.matrix.writeMe();
  }

  // get matrix - debugging only
  getMatrixBuffer() {
    var matrixbuffer = "board <br />";

    for (var i = 0; i < this.numRows; i++) {
      for (var j = 0; j < this.numCols; j++) {
        matrixbuffer += (this.matrix.row[i].cells[j].isFilled() ? 1 : 0) + ", ";
      }
      matrixbuffer += "<br />";
    }
    return matrixbuffer;
  }
}
