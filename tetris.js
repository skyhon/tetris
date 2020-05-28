//--------------------------------------------------------------
// Author: 		Steve Hon
// Name:   		Tetris.js
// Description:	Containing all required objects to build Tetris.
// Last Update: 11/7/2017
//--------------------------------------------------------------

//--------------------------------------------------------------
// Piece's predefined properties (const)
//--------------------------------------------------------------
const squareAttributes = {
  color: "#3f6cb7",
  image: null,
  borderColor: "#0066ff",
  borderStyle: "solid",
};

const iAttributes = {
  color: "#0367a6",
  image: null,
  borderColor: "#006699",
  borderStyle: "solid",
};

const lAttributes = {
  color: "#8de0f2",
  image: null,
  borderColor: "#9ec9ed",
  borderStyle: "solid",
};

const lmAttributes = {
  color: "#663333",
  image: null,
  borderColor: "#624b1f",
  borderStyle: "solid",
};

const nAttributes = {
  color: "#ffcc00",
  image: null,
  borderColor: "#f9cb26",
  borderStyle: "solid",
};

const nmAttributes = {
  color: "#8cacae",
  image: null,
  borderColor: "#999999",
  borderStyle: "solid",
};

const tAttributes = {
  color: "#993366",
  image: null,
  borderColor: "#884679",
  borderStyle: "solid",
};

//--------------------------------------------------------------
// Constants
//--------------------------------------------------------------

const MAXPIECEINDEX = 7; // largest index for identifying pieces
// 0 = empty, 1...7 (square...t)
const CELLSPERPIECE = 4; // number of cells per piece

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

// for browsers that do not support indexOf method (Mozilla's ECMA-262 version)
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (searchElement /*, fromIndex */) {
    "use strict";

    if (this === void 0 || this === null) throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;

    if (len === 0) return -1;

    var n = 0;
    if (arguments.length > 0) {
      n = Number(arguments[1]);
      if (n !== n) n = 0;
      else if (n !== 0 && n !== 1 / 0 && n !== -(1 / 0))
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
    }

    if (n >= len) return -1;

    var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);

    for (; k < len; k++) {
      if (k in t && t[k] === searchElement) return k;
    }

    return -1;
  };
}

//--------------------------------------------------------------
// Piece Data (Do NOT modify)
//--------------------------------------------------------------
// Square
const SQUARE = {
  name: "square",

  translation: [
    [-3, -2],
    [-3, -2],
    [-3, -2],
    [-3, -2],
  ],

  matrix: [
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 2, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 2, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 2, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 2, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ],
  ],
};

// I
const I = {
  name: "I",

  translation: [
    [-2, -2],
    [-3, -2],
    [-2, -2],
    [-3, -2],
  ],
  matrix: [
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 2, 1, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 2, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
    ],

    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 1, 2, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],

    [
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 2, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  ],
};

// L
const L = {
  name: "L",

  translation: [
    [-3, -2],
    [-3, -2],
    [-3, -2],
    [-2, -2],
  ],
  matrix: [
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 2, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 2, 1, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 2, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 1, 2, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  ],
};

// L-mirror
const LM = {
  name: "LM",

  translation: [
    [-3, -2],
    [-2, -2],
    [-3, -2],
    [-3, -2],
  ],
  matrix: [
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 2, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 1, 2, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 2, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 2, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0],
    ],
  ],
};

// N
const N = {
  name: "N",

  translation: [
    [-3, -2],
    [-3, -2],
    [-3, -2],
    [-2, -2],
  ],
  matrix: [
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 2, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 2, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 2, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 2, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  ],
};

// N-mirror
const NM = {
  name: "NM",

  translation: [
    [-3, -2],
    [-3, -2],
    [-3, -2],
    [-2, -2],
  ],
  matrix: [
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 2, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 2, 1, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 1, 2, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 1, 2, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  ],
};

// T
const T = {
  name: "T",

  translation: [
    [-3, -2],
    [-3, -2],
    [-3, -2],
    [-2, -2],
  ],
  matrix: [
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 2, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 2, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 2, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 2, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  ],
};

//--------------------------------------------------------------
// Cell Object
//--------------------------------------------------------------

// Cell Constructor
class Cell {
  constructor() {
    this.FILLED = 1;
    this.EMPTY = 0;
    this.state = this.EMPTY;
  }

  fillMe() {
    this.state = this.FILLED;
  }

  emptyMe() {
    this.state = this.EMPTY;
  }

  isFilled() {
    return this.state;
  }

  isEmpty() {
    return !this.state;
  }

  currentState() {
    return this.state;
  }

  setEqualTo(cell) {
    this.state = cell.currentState();
  }
}

//--------------------------------------------------------------
// Row Object
//--------------------------------------------------------------
// Row Constructor

class Row {
  constructor(cellsPerRow) {
    this.EMPTY = 0; // empty row
    this.FILLED = 1; // filled row
    this.PARTIALLYFILLED = -1; // has some filled cells, but the whole
    //	 row is not completely filled/empty

    this.numCells = cellsPerRow; // number of cells
    this.cells = new Array(this.numCells); // all cells in the row
    this.state = this.EMPTY; // current state

    for (let i = 0; i < this.numCells; i++) {
      this.cells[i] = new Cell();
    }
  }

  // set row equal to another row
  setEqualTo(row) {
    if (row.numCells > 0) {
      // if cells in both objects' rows are not equal in length,
      // 	delete old row and create a new one
      if (this.numCells !== row.numCells) {
        this.numCells = row.numCells;

        this.cells = null;
        this.cells = new Array(row.numCells);

        for (let i = 0, numCells = row.numCells; i < numCells; i++)
          this.cells[i] = new Cell();
      }

      for (let i = 0, numCells = row.numCells; i < numCells; i++)
        this.cells[i].setEqualTo(row.cells[i]);
    } else {
      console.log("Error: number of cells in a row must be greater than 0");
    }
  }

  // initializes row with array of numbers
  setEqualToArray(array) {
    if (array.length == this.numCells) {
      for (let i = 0; i < this.numCells; i++) {
        if (array[i] == 0) this.cells[i].emptyMe();
        else this.cells[i].fillMe();
      }
    } else {
      console.log("Error: Unequal size.");
    }
  }

  // gets cell by given index
  cell(cellIndex) {
    return this.cells[cellIndex - 1];
  }

  // empties all cells in the row
  emptyMe() {
    if (!this.isEmpty()) {
      for (let i = 0; i < this.numCells; i++) {
        this.cells[i].emptyMe();
      }
    }
    this.state = this.EMPTY;
  }

  // fills all cells the row
  fillMe() {
    if (!this.isFilled()) {
      for (let i = 0; i < this.numCells; i++) {
        this.cells[i].fillMe();
      }
    }
    this.state = this.FILLED;
  }

  // fills a particular cell
  fillCell(cellIndex) {
    this.cells[cellIndex - 1].fillMe();
  }

  // empties a particular cell
  emptyCell(cellIndex) {
    this.cells[cellIndex - 1].emptyMe();
  }

  // check to see if row is empty
  isEmpty() {
    let empty = true;
    for (let i = 0; i < this.numCells; i++) {
      if (this.cells[i].isFilled()) {
        empty = false;
        break;
      }
    }
    return empty;
  }

  // checks to see if row is filled
  isFilled() {
    let filled = true;
    for (let i = 0; i < this.numCells; i++) {
      if (this.cells[i].isEmpty()) {
        filled = false;
        break;
      }
    }
    return filled;
  }
  // check to see if the row is partially filled
  isPartiallyFilled() {
    let partiallyFilled = false;

    if (!this.isFilled() && !this.isEmpty()) partiallyFilled = true;

    return partiallyFilled;
  }

  // prints the matrix block
  printMe() {
    let buffer = "";

    for (let i = 0; i < this.numCells; i++) {
      buffer += this.cells[i].isEmpty() ? 0 : 1;
    }
    console.log(buffer);
  }
}
//--------------------------------------------------------------
// Matrix class
//--------------------------------------------------------------

// Constructor
class Matrix {
  constructor(numRows, numCols) {
    this.numRows = numRows; // number of rows in the matrix
    this.numCols = numCols; // number of cols in the matrix

    this.row = new Array(this.numRows);

    for (let i = 0; i < this.numRows; i++) this.row[i] = new Row(this.numCols);
  }

  // gets row by given index
  r(rowIndex) {
    return this.row[rowIndex - 1];
  }

  // gets row by given index
  c(colIndex) {
    let newCol = new Row(this.numRows);
    for (let i = 0; i < this.numRows; i++) {
      newCol[i] = this.row[i].cells[colIndex - 1];
    }
    return newCol;
  }

  // set an 2d array to this matrix
  setEqualTo(matrix) {
    if (matrix.numRows > 0 && matrix.numCols > 0) {
      // remove all rows and reset corresponding values
      this.removeRows(1, this.numRows);
      this.numRows = 0;
      this.numCols = 0;

      this.row = null;
      this.row = new Array(matrix.numRows);

      for (let i = 0; i < matrix.numRows; i++) {
        this.row[i] = new Row(matrix.numCols);
        this.row[i].setEqualTo(matrix.row[i]);
      }

      this.numRows = matrix.numRows;
      this.numCols = matrix.numCols;
    }
  }

  // set an 2d array to this matrix
  setEqualToArray(array) {
    if (
      typeof array != "undefined" &&
      array.length == this.numRows &&
      array[0].length == this.numCols
    ) {
      this.numRows = array.length;
      this.numCols = array.length;

      this.row = null;

      this.row = new Array(this.numRows);

      for (let i = 0; i < this.numRows; i++) {
        this.row[i] = new Row(this.numCols);
        this.row[i].setEqualToArray(array[i]);
      }
      //alert ('matrix.setEqualTo ()');
    } else {
      alert("Error: Out of range.");
      //alert ("typeof (array): " + typeof (array) + ", array.length: " + array.length + ", this.numRows: " + this.numRows + ", array[0].length: " + array[0].length + ", this.numCols: " + this.numCols);
    }
  }

  // insert rows to the specified row index
  insertRows(toRowNum, numRows, rowArrayValues) {
    let newRow = new Row(rowArrayValues.length);
    newRow.setEqualToArray(rowArrayValues);

    for (let i = 0; i < numRows; i++) this.row.splice(toRowNum - 1, 0, newRow);
    this.numRows = this.row.length;
  }

  // insert rows to the specified row index
  insertARow(toRowNum) {
    let newEmptyRow = new Array(this.numCols);

    for (let i = 0; i < this.numCols; i++) newEmptyRow[i] = 0;

    this.insertRows(toRowNum, 1, newEmptyRow);
  }

  // insert a row to the specified row index
  insertAnEmptyRow(toRowNum) {
    this.insertRows(toRowNum, 1);
  }

  // remove multiple rows
  removeRows(fromRowNum, numRows) {
    let dummy = this.row.splice(fromRowNum - 1, numRows);
    this.numRows = this.row.length;
  }

  // remove a row
  removeARow(fromRowNum) {
    this.removeRows(fromRowNum, 1);
  }

  // checks to see if the matrix is empty
  isEmpty() {
    let empty = true;
    for (let i = 0; i < this.numRows; i++) {
      if (this.row[i].isFilled() || this.row[i].isPartiallyFilled()) {
        empty = false;
        break;
      }
    }
    return empty;
  }

  // checks to see if the matrix is filled
  isFilled() {
    let filled = true;
    for (let i = 0; i < this.numRows; i++) {
      if (this.row[i].isEmpty() || this.row[i].isPartiallyFilled()) {
        filled = false;
        break;
      }
    }
    return filled;
  }

  // checks to see if the matrix is partially filled
  isPartiallyFilled() {
    let partiallyFilled = false,
      hasEmptyRow = false,
      hasFilledRow = false;
    for (let i = 0; i < this.numRows; i++) {
      if (this.row[i].isPartiallyFilled()) {
        partiallyFilled = true;
        break;
      } else if (this.row[i].isFilled()) hasFilledRow = true;
      else hasEmptyRow = true;

      if (hasFilledRow && hasEmptyRow) {
        partiallyFilled = true;
        break;
      }
    }
    return partiallyFilled;
  }

  // fills the whole matrix
  fillMe() {
    for (let i = 0; i < this.numRows; i++) this.row[i].fillMe();
  }

  // empty matrix
  emptyMe() {
    for (let i = 0; i < this.numRows; i++) this.row[i].emptyMe();
  }

  // fills a row
  emptyRow(rowIndex) {
    this.row[rowIndex - 1].emptyMe();
  }

  // empties a row
  fillRow(rowIndex) {
    this.row[rowIndex - 1].fillMe();
  }

  // fills a cell in the matrix
  fillCell(coord) {
    const ROW = 0,
      COL = 1;

    if (
      coord[ROW] - 1 >= 0 &&
      coord[ROW] - 1 < this.numRows &&
      coord[COL] - 1 >= 0 &&
      coord[COL] - 1 < this.numCols
    )
      // within the four boundaries
      this.row[coord[ROW] - 1].cells[coord[COL] - 1].fillMe();
  }

  // empty a cell in the matrix
  emptyCell(coord) {
    const ROW = 0,
      COL = 1;

    if (
      coord[ROW] - 1 >= 0 &&
      coord[ROW] - 1 < this.numRows &&
      coord[COL] - 1 >= 0 &&
      coord[COL] - 1 < this.numCols
    )
      // within the four boundaries
      this.row[coord[ROW] - 1].cells[coord[COL] - 1].emptyMe();

    //this.row[rowIndex - 1].cells[colIndex - 1].emptyMe ();
  }

  // prints the matrix block
  printMe() {
    let buffer = "";

    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        buffer += this.row[i].cells[j].isEmpty() ? 0 : 1;
      }
      buffer += "\n";
    }
    console.log(buffer);
  }

  // prints the matrix block
  writeMe() {
    let buffer = "";
    let cellStyle = "width: 8px; height: 8px; ";

    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        var bgColor = "none";
        var borderStyle = "border: 1px #FFF solid";

        if (this.row[i].cells[j].isFilled()) {
          bgColor = "#CCCCCC";
          borderStyle = "border: 1px #333 solid; ";
        }

        let bgStyle = "background-color: " + bgColor + "; ";

        buffer += "<span style = ' ";
        buffer += bgStyle + cellStyle + borderStyle;
        buffer += "'>&nbsp;&nbsp;</span>";
      }

      buffer += "<br />";
    }

    return buffer;
  }
}

//--------------------------------------------------------------
// Coord Object
//--------------------------------------------------------------

// Constructor
class Coord {
  constructor(R, C) {
    this.R = R;
    this.C = C;
  }

  // set coordinate values
  move(R, C) {
    this.R = R;
    this.C = C;
  }
}

//--------------------------------------------------------------
// Piece Object
//--------------------------------------------------------------

// Constructor
//--------------------------------------------------------------
// Parameter:
// 		1) whichPiece (optional) - specifies the type of tetris piece

class Piece {
  constructor(whichPiece) {
    var matrixLength = 5;

    // Constants
    this.NUMMATRICES = CELLSPERPIECE;
    this.ROW = 0; // 0 = ROW
    this.COL = 1; // 1 = COLUMN

    this.matrix = new Array(this.NUMMATRICES);

    for (var i = 0; i < this.NUMMATRICES; i++)
      this.matrix[i] = new Matrix(matrixLength, matrixLength);

    this.state = 0; // one of the four rotational states of a piece, default: 0

    if (whichPiece === undefined) {
      this.setRandomPiece();
      this.setRandomState();
    } else {
      for (var i = 0; i < this.NUMMATRICES; i++) {
        this.matrix[i].setEqualToArray(whichPiece.matrix[i]);
      }

      this.name = whichPiece.name; // piece name
      this.translation = whichPiece.translation; // adjusts the piece in the correct position
    }

    this.pos = [0, 0]; // coordinate of the piece on the board
  }

  // sets equal to one of the pieces
  setEqualTo(piece) {
    this.piece = piece;
    this.name = piece.name;

    for (var i = 0; i < this.NUMMATRICES; i++) {
      this.matrix[i].setEqualToArray(this.piece.matrix[i]);
    }
    this.translation = this.piece.translation;
    this.state = 0;
  }

  // gets the name
  myName() {
    return this.name;
  }

  // change piece by index
  setEqualToPiece(byPieceIndex) {
    if (byPieceIndex > MAXPIECEINDEX) byPieceIndex = MAXPIECEINDEX - 6;
    else if (byPieceIndex < MAXPIECEINDEX - 6) byPieceIndex = MAXPIECEINDEX;

    switch (byPieceIndex) {
      case MAXPIECEINDEX - 6:
        this.setEqualTo(SQUARE);
        break;

      case MAXPIECEINDEX - 5:
        this.setEqualTo(I);
        break;

      case MAXPIECEINDEX - 4:
        this.setEqualTo(L);
        break;

      case MAXPIECEINDEX - 3:
        this.setEqualTo(LM);
        break;

      case MAXPIECEINDEX - 2:
        this.setEqualTo(N);
        break;

      case MAXPIECEINDEX - 1:
        this.setEqualTo(NM);
        break;

      case MAXPIECEINDEX:
        this.setEqualTo(T);
        break;
    }
  }

  // set equal to a random piece
  setRandomPiece() {
    let pieceId = parseInt(Math.floor(Math.random() * 7));
    this.setEqualToPiece(pieceId);
  }

  // gets current piece index
  getCurrentPieceIndex() {
    let pieceIndex = 0;
    switch (this.myName()) {
      case SQUARE.name:
        pieceIndex = MAXPIECEINDEX - 6;
        break;

      case I.name:
        pieceIndex = MAXPIECEINDEX - 5;
        break;

      case L.name:
        pieceIndex = MAXPIECEINDEX - 4;
        break;

      case LM.name:
        pieceIndex = MAXPIECEINDEX - 3;
        break;

      case N.name:
        pieceIndex = MAXPIECEINDEX - 2;
        break;

      case NM.name:
        pieceIndex = MAXPIECEINDEX - 1;
        break;

      case T.name:
        pieceIndex = MAXPIECEINDEX;
        break;
    }
    return pieceIndex;
  }

  // gets previous piece's index
  getPreviousPieceIndex() {
    let pieceIndex = this.getCurrentPieceIndex();

    if (pieceIndex <= MAXPIECEINDEX - 6) pieceIndex = MAXPIECEINDEX + 1;

    return pieceIndex - 1;
  }

  // gets next piece's index
  getNextPieceIndex() {
    let pieceIndex = this.getCurrentPieceIndex();

    if (pieceIndex >= MAXPIECEINDEX) pieceIndex = 0;

    return pieceIndex + 1;
  }

  // change state
  changeStateTo(newState) {
    if (newState > 0 && newState <= this.NUMMATRICES) this.state = newState - 1;
  }

  // set random state
  setRandomState() {
    let randomState = parseInt(Math.floor(Math.random() * 4)) + 1;
    this.changeStateTo(randomState);
  }

  // sets position
  setPos(coord) {
    const ROW = 0,
      COL = 1;
    this.pos = [coord[ROW] - 1, coord[COL] - 1];
  }

  // one step to the left
  stepLeft() {
    this.pos[this.COL]--;
  }

  // one step to the right
  stepRight() {
    this.pos[this.COL]++;
  }

  // one step up
  stepUp() {
    this.pos[this.ROW]--;
  }

  // one step down
  stepDown() {
    this.pos[this.ROW]++;
  }

  // get all coordinates of filled cells (human readable)
  getFilledCellCoords() {
    let filledCellCoords = new Array(CELLSPERPIECE);
    let filledCounts = 0;

    for (let i = 0; i < this.matrix[this.state].numRows; i++) {
      if (this.matrix[this.state].row[i].isPartiallyFilled()) {
        for (let j = 0; j < this.matrix[this.state].numCols; j++) {
          if (this.matrix[this.state].row[i].cells[j].isFilled()) {
            filledCellCoords[filledCounts] = [i + 1, j + 1];
            filledCounts++;
          }

          if (filledCounts >= CELLSPERPIECE) break;
        }
      }
      if (filledCounts >= CELLSPERPIECE) break;
    }

    return filledCellCoords;
  }

  // get current position (human)
  currentPosition() {
    const ROW = 0,
      COL = 1;

    return [this.pos[ROW] + 1, this.pos[COL] + 1];
  }

  // show translated position (human readable format)
  translatedPosition() {
    return [
      this.pos[this.ROW] + this.translation[this.state][this.ROW] + 1,
      this.pos[this.COL] + this.translation[this.state][this.COL] + 1,
    ];
  }

  // show translated coords (human)
  translatedCoords() {
    let filledCellCoords = this.getFilledCellCoords();
    let translatedCoords = new Array(filledCellCoords.length);

    let translatedPosition = this.translatedPosition();
    let offset = -1; // offset -1 to each of the above coords

    for (let i = 0; i < filledCellCoords.length; i++) {
      translatedCoords[i] = [
        filledCellCoords[i][this.ROW] + translatedPosition[this.ROW] + offset,
        filledCellCoords[i][this.COL] + translatedPosition[this.COL] + offset,
      ];
    }
    //alert ("translatedCoords[i]: " + translatedCoords[0] + ", " + translatedCoords[1] + ", " + translatedCoords[2] + ", " + translatedCoords[3]);
    return translatedCoords;
  }

  // show translated extremes (human)
  translatedExtremes() {
    let extremes = this.getExtremes();
    let translatedPosition = this.translatedPosition();
    let offset = -1; // offset one to each of the above coords

    return {
      max: [
        extremes.max[this.ROW] + translatedPosition[this.ROW] + offset,
        extremes.max[this.COL] + translatedPosition[this.COL] + offset,
      ],
      min: [
        extremes.min[this.ROW] + translatedPosition[this.ROW] + offset,
        extremes.min[this.COL] + translatedPosition[this.COL] + offset,
      ],
    };
  }

  // show current rotational state (human)
  currentState() {
    return this.state + 1;
  }

  // gets the matrix
  currentMatrix() {
    return this.matrix[this.state];
  }

  // gets translation
  currentTranslation() {
    return this.translation[this.state];
  }

  // find the farthest row and column index
  getExtremes() {
    let filledCellCoords = this.getFilledCellCoords();

    let rowValues = new Array(filledCellCoords.length);
    let colValues = new Array(filledCellCoords.length);

    //let extremes;

    // separate row and column values
    for (let i = 0; i < filledCellCoords.length; i++) {
      rowValues[i] = filledCellCoords[i][this.ROW];
      colValues[i] = filledCellCoords[i][this.COL];
    }

    return {
      min: [rowValues.min(), colValues.min()],
      max: [rowValues.max(), colValues.max()],
    };
  }

  // rotates block by the given number of turns
  rotateBy(numberOfTurns) {
    var initState = this.state; // initial state
    var willRotate = numberOfTurns % 4; // number of rotations
    var endState = [1, 2, 3, 0, 1, 2, 3, 0, 1, 2]; // end state
    var indexOffset = 3; // off set to avoid negative index

    this.state = endState[initState + willRotate + indexOffset];
  }

  // rotates clockwise
  rotateClockwise() {
    this.rotateBy(1);
  }

  // rotates counterclockwise
  rotateCounterclockwise() {
    this.rotateBy(-1);
  }

  // returns a coords (translated) of the next step on the board
  getNextPosition(direction) {
    var controller = new GameController();

    var nextCoords = new Array(CELLSPERPIECE);

    switch (direction) {
      case controller.up().name:
        this.stepUp();
        nextCoords = this.translatedCoords();
        this.stepDown();
        break;

      case controller.down().name:
        this.stepDown();
        nextCoords = this.translatedCoords();
        this.stepUp();
        break;

      case controller.left().name:
        this.stepLeft();
        nextCoords = this.translatedCoords();
        this.stepRight();
        break;

      case controller.right().name:
        this.stepRight();
        nextCoords = this.translatedCoords();
        this.stepLeft();
        break;

      case controller.clockwise().name:
        this.rotateClockwise();
        nextCoords = piece.translatedCoords();
        this.rotateCounterclockwise();
        break;

      case controller.counterclockwise().name:
        this.rotateCounterclockwise();
        nextCoords = piece.translatedCoords();
        this.rotateClockwise();
        break;

      case controller.change().name:
        this.setEqualToPiece(piece.getNextPieceIndex());
        nextCoords = piece.translatedCoords();
        this.setEqualToPiece(piece.getPreviousPieceIndex());
        break;
    }
    return nextCoords;
  }

  // Responding to key press
  keyPressed(keyCode, conditions) {
    var controller = new GameController();

    if (conditions === undefined) conditions = true;
    if (conditions) {
      switch (keyCode) {
        case controller.up().code:
          this.stepUp();
          break;

        case controller.down().code:
          this.stepDown();
          break;

        case controller.left().code:
          this.stepLeft();
          break;

        case controller.right().code:
          this.stepRight();
          break;

        case controller.clockwise().code:
          this.rotateClockwise();
          break;

        case controller.counterclockwise().code:
          this.rotateCounterclockwise();
          break;

        case controller.change().code:
          this.setEqualToPiece(this.getNextPieceIndex());
          break;
      }
    }
  }

  // prints matrix
  printMe() {
    this.matrix[this.state].printMe();
  }

  // writes matrix
  writeMe() {
    return this.matrix[this.state].writeMe();
  }

  // show coordinates
  showCoord() {
    return "r: " + this.pos[this.ROW] + ", c: " + this.pos[this.COL];
  }
}

//--------------------------------------------------------------
// Board Object
//--------------------------------------------------------------
class Board {
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
  isOutBound(coord) {
    var outBound = !this.isInBound(coord);
    return outBound;
  }

  // is it possible to place the piece on the board
  isPlacementPossible(filledCoords) {
    var ROW = 0,
      COL = 1;

    var possible = true;

    for (var i = 0; i < filledCoords.length; i++) {
      if (
        this.isOutBound(filledCoords[i]) ||
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

//--------------------------------------------------------------
// GameController Object - controller for the piece movements
//--------------------------------------------------------------

// Constructor
class GameController {
  constructor() {
    this.enabledKeys = {
      up: {
        code: 87, // w
        key: String.fromCharCode(87),
        name: "up",
      },

      down: {
        code: 83, // s
        key: String.fromCharCode(83),
        name: "down",
      },

      left: {
        code: 65, // a
        key: String.fromCharCode(65),
        name: "left",
      },

      right: {
        code: 68, // d
        key: String.fromCharCode(68),
        name: "right",
      },

      clockwise: {
        code: 69, // e
        key: String.fromCharCode(81),
        name: "clockwise",
      },

      counterclockwise: {
        code: 81, // q
        key: String.fromCharCode(69),
        name: "counterclockwise",
      },

      change: {
        code: 50, // 2
        key: String.fromCharCode(50),
        name: "change",
      },
      last: {
        code: null, // null
        key: null,
        name: null,
      },
    };

    this.disabledKeys = {
      up: {
        code: null,
        key: null,
        name: null,
      },

      down: {
        code: null,
        key: null,
        name: null,
      },

      left: {
        code: null,
        key: null,
        name: null,
      },

      right: {
        code: null,
        key: null,
        name: null,
      },

      clockwise: {
        code: null,
        key: null,
        name: null,
      },

      counterclockwise: {
        code: null,
        key: null,
        name: null,
      },

      change: {
        code: null,
        key: null,
        name: null,
      },
      last: {
        code: null,
        key: null,
        name: null,
      },
    };

    // disable up, remove the following to enable up
    this.enabledKeys.up = {
      code: null,
      key: null,
      name: null,
    };

    this.key = this.enabledKeys;
    this.isEnabled = true;
  }

  // assigns ASCII key values
  setKeys(up, down, left, right, clockwise, counterclockwise, change) {
    this.enabledKeys.up.code = up;
    this.enabledKeys.down.code = down;
    this.enabledKeys.left.code = left;
    this.enabledKeys.right.code = right;
    this.enabledKeys.clockwise.code = clockwise;
    this.enabledKeys.counterclockwise.code = counterclockwise;
    this.enabledKeys.change.code = change;

    if (this.isEnabled) this.key = this.enabledKeys;
  }

  // enable all keys
  enabled() {
    if (!this.isEnabled) {
      this.key = this.enabledKeys;
      this.isEnabled = true;
    }
  }

  // disable all keys
  disabled() {
    if (this.isEnabled) {
      this.key = this.disabledKeys;
      this.isEnabled = false;
    }
  }

  // get keycode to move up (unusable in actual gameplay)
  up() {
    return this.key.up;
  }

  // get keycode to move down
  down() {
    return this.key.down;
  }

  // get keycode to move left
  left() {
    return this.key.left;
  }

  // get keycode to move right
  right() {
    return this.key.right;
  }

  // get keycode to rotate clockwise
  clockwise() {
    return this.key.clockwise;
  }

  // get keycode to rotate counterclockwise
  counterclockwise() {
    return this.key.counterclockwise;
  }

  // get keycode to rotate counterclockwise
  change() {
    return this.key.change;
  }

  // last key Pressed
  last() {
    return this.key.last;
  }

  // get key name by ASCII code
  setLastKeyPressedByCode(keyCode) {
    this.key.last.code = keyCode;
    this.key.last.key = String.fromCharCode(keyCode);

    switch (keyCode) {
      case this.key.up.code:
        this.key.last.name = this.key.up.name;
        break;

      case this.key.down.code:
        this.key.last.name = this.key.down.name;
        break;

      case this.key.left.code:
        this.key.last.name = this.key.left.name;
        break;

      case this.key.right.code:
        this.key.last.name = this.key.right.name;
        break;

      case this.key.clockwise.code:
        this.key.last.name = this.key.clockwise.name;
        break;

      case this.key.counterclockwise.code:
        this.key.last.name = this.key.counterclockwise.name;
        break;

      case this.key.change.code:
        this.key.last.name = this.key.change.name;
        break;

      default:
        this.key.last.name = "undefined";
    }
  }
}

//--------------------------------------------------------------
// Scoreboard Object
//--------------------------------------------------------------

// Constructor
class Scoreboard {
  constructor() {
    this.level = 1;
    this.totalRowsRemoved = 0;
    this.score = 0;
    this.increment = 100;
  }

  // set level
  setLevel(level) {
    this.level = level;
  }

  // set increment
  setIncrement(increment) {
    this.increment = increment;
  }

  // add points
  addPoints(numRowsRemoved) {
    this.score += parseInt(numRowsRemoved * this.increment); // * this.level * 0.15);
    this.totalRowsRemoved += numRowsRemoved;
  }

  // get the total number of rows removed
  getTotalRowsRemoved() {
    return this.totalRowsRemoved;
  }

  // get the score
  myScore() {
    return this.score;
  }

  // get the level
  myLevel() {
    return this.level;
  }

  // reset the Scoreboards
  resetMe() {
    this.level = 1;
    this.totalRowsRemoved = 0;
    this.score = 0;
  }
}

//--------------------------------------------------------------
// Queue Object
// Description: Queue is list containing element id's and
// 				states of upcoming pieces. Note: The queue does
//				not contains the piece itself.
//--------------------------------------------------------------

// Constructor
class Queue {
  constructor(length) {
    this.length = length;
    if (length === undefined) {
      this.length = 1;
    }

    if (length > 0) {
      this.element = new Array(this.length);

      for (var i = 0; i < this.length; i++) {
        this.element[i] = {
          id: parseInt(Math.floor(Math.random() * MAXPIECEINDEX) + 1),
          state: parseInt(Math.floor(Math.random() * 4)),
        };
      }
    } else {
      console.log("Invalid queue length.");
    }
  }

  // get next piece
  popMe() {
    var nextPiece = this.element.pop();

    var insertNewElement = {
      id: parseInt(Math.floor(Math.random() * MAXPIECEINDEX) + 1),
      state: parseInt(Math.floor(Math.random() * 4)),
    };

    var dummy = this.element.unshift(insertNewElement);

    return nextPiece;
  }

  // get corresponding matrix by index
  getPieceInfo(queueIndex) {
    var pieceInfo = {
      matrix: new Array(5, 5),
      name: "",
    };

    var state = this.element[queueIndex].state;

    if (queueIndex >= 0 && queueIndex < this.element.length) {
      switch (this.element[queueIndex].id) {
        case MAXPIECEINDEX - 6:
          pieceInfo.matrix = SQUARE.matrix[state].slice(0);
          pieceInfo.name = SQUARE.name;
          break;

        case MAXPIECEINDEX - 5:
          pieceInfo.matrix = I.matrix[state].slice(0);
          pieceInfo.name = I.name;
          break;

        case MAXPIECEINDEX - 4:
          pieceInfo.matrix = L.matrix[state].slice(0);
          pieceInfo.name = L.name;
          break;

        case MAXPIECEINDEX - 3:
          pieceInfo.matrix = LM.matrix[state].slice(0);
          pieceInfo.name = LM.name;
          break;

        case MAXPIECEINDEX - 2:
          pieceInfo.matrix = N.matrix[state].slice(0);
          pieceInfo.name = N.name;
          break;

        case MAXPIECEINDEX - 1:
          pieceInfo.matrix = NM.matrix[state].slice(0);
          pieceInfo.name = NM.name;
          break;

        case MAXPIECEINDEX:
          pieceInfo.matrix = T.matrix[state].slice(0);
          pieceInfo.name = T.name;
          break;
      }
    } else {
      alert(queueIndex + " is not a valid index.");
    }
    return pieceInfo;
  }

  // refresh all elements with random ids and states
  refreshElements() {
    for (var i = 0; i < this.length; i++) {
      this.element[i] = {
        id: parseInt(Math.floor(Math.random() * MAXPIECEINDEX) + 1),
        state: parseInt(Math.floor(Math.random() * 4)),
      };
    }
  }
}

//--------------------------------------------------------------
// View Object
// Description: Presentation layer of the game
//--------------------------------------------------------------

// Constructor
class View {
  constructor(name, numRows, numCols, height, width, innerBorderSize) {
    this.name = name;

    this.width = width;
    this.height = height;

    this.numRows = numRows;
    this.numCols = numCols;

    this.innerBorderSize = innerBorderSize;

    this.cellWidth = parseInt(
      (this.width - 4) / this.numCols - 2 * this.innerBorderSize
    );
    this.cellHeight = parseInt(
      (this.height - 4) / this.numRows - 2 * this.innerBorderSize
    );

    this.wrapper = document.createElement("div");

    this.blockStyles = new Array();

    // each cell in the matrix contains an id corresponding style
    this.matrix = new Array(this.numRows);

    for (let i = 0; i < this.numRows; i++) {
      this.matrix[i] = new Array(this.numCols);

      for (let j = 0; j < this.numCols; j++) {
        this.matrix[i][j] = 0;
      }
    }

    this.initMe();
  }

  // initialize
  initMe() {
    let styleName = "cellStyles";
    let cellStyles = document.getElementById(styleName);

    if (cellStyles == null) {
      // style tag is not generated

      let cellStyles = document.createElement("style");
      let docHead = document.getElementsByTagName("head")[0];

      cellStyles.setAttribute("type", "text/css");
      cellStyles.id = styleName;

      docHead.appendChild(cellStyles);
    }

    let emptyAttributes = {
      color: "none",
      image: null,
      borderColor: "transparent",
      borderStyle: "solid",
    };

    this.addClass("emptyStyle", emptyAttributes, 8);
    this.className = this.blockStyles[0]; // blockStyles[0] = emptyStyle

    this.wrapper = document.createElement("span");
    this.wrapper.id = this.name + "_wrapper";
    this.wrapper.style.cssFloat = "left";
    this.wrapper.style.width = this.width + "px";
    this.wrapper.style.border = "solid 1px #000";
    this.wrapper.style.display = "inline-block";

    for (let i = 1; i <= this.numRows; i++) {
      for (let j = 1; j <= this.numCols; j++) {
        let cell = document.createElement("span");

        let cellName = this.name + "_r" + i + "c" + j;

        cell.id = cellName;

        cell.className = this.blockStyles[0];

        this.wrapper.appendChild(cell);
      }
    }

    // for refreshing view, removing all previous footprints
    this.prevCoords = [];

    this.drawn = false;
  }

  // create css class by cell or piece attributes
  addClass(className, cellAttributes, optionalZIndex) {
    let cellStyles = document.getElementById("cellStyles");

    let background = "background: ";
    let hasBackground = false;
    let zIndex = 7;

    if (optionalZIndex !== undefined) zIndex = optionalZIndex;

    this.blockStyles.push(this.name + "_" + className);

    if (cellAttributes.image != null && cellAttributes.image != "") {
      background +=
        "url (" + cellAttributes.image + ") " + cellAttributes.color;
      hasBackground = true;
    }

    if (cellAttributes.color != null && cellAttributes.color != "") {
      background += cellAttributes.color;
      hasBackground = true;
    }

    let buffer =
      "." +
      this.blockStyles[this.blockStyles.length - 1] +
      " { " +
      "float:left; margin: 0; padding: 0; z-index: " +
      zIndex +
      "; " +
      "border: " +
      cellAttributes.borderStyle +
      " " +
      this.innerBorderSize +
      "px " +
      cellAttributes.borderColor +
      "; " +
      "width: " +
      this.cellWidth +
      "px; " +
      "height: " +
      this.cellHeight +
      "px; " +
      "display: inline-block; ";

    // add cell background properties
    if (hasBackground) buffer += background + "; ";
    buffer += "} ";
    /*
            //alert ("buffer\n==========\n" + buffer);
            alert ("cellStyles.innerHTML\n=====================\n" + cellStyles.innerHTML);
            cellStyles.innerHTML += "a"; // buffer;
            alert ("cellStyles.innerHTML\n=====================\n" + cellStyles.innerHTML);
            */
    if (cellStyles.styleSheet) {
      //IE Browser
      cellStyles.styleSheet.cssText += buffer;
    } else {
      // Everthing else
      cellStyles.appendChild(document.createTextNode(buffer));
    }
  }

  // set filled cell style
  setFilledClass(className) {
    this.className = className;
  }

  // convert id and get the corresponding class name
  getClassNameById(id) {
    let className = null;

    if (id >= 0 && id <= this.blockStyles.length)
      className = this.blockStyles[id];

    return className;
  }

  // convert class name and get the corresponding id
  getIdByClassName(className) {
    let id = null;
    return this.blockStyles.indexOf(className);
  }

  // draw board
  draw(parentNodeId) {
    //document.getElementById("main").appendChild (this.wrapper);
    if (!this["drawn"]) {
      let parent = document.getElementById(parentNodeId);
      parent.appendChild(this.wrapper);
      this["drawn"] = true;
    }
  }

  // empties a cell
  emptyCell(coord) {
    if (this.isWithinVisibleArea(coord)) {
      const ROW = 0,
        COL = 1;

      let id = this.name + "_r" + coord[ROW] + "c" + coord[COL];
      let cell = document.getElementById(id);

      cell.className = this.blockStyles[0];
    }
  }

  // fills a cell
  fillCell(coord, optionalClassName) {
    let setClassNameTo = this.className;

    if (optionalClassName !== undefined) {
      setClassNameTo = optionalClassName;
    }
    if (this.isWithinVisibleArea(coord)) {
      const ROW = 0,
        COL = 1;

      let id = this.name + "_r" + coord[ROW] + "c" + coord[COL];
      let cell = document.getElementById(id);

      cell.className = setClassNameTo;
    }
  }

  // refresh cell blocks
  refreshCells(newPosCoords) {
    this.unregister(this.prevCoords);
    this.register(newPosCoords);
  }

  // refresh cell blocks
  refreshAll() {
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        let coord = [i + 1, j + 1];

        if (this.matrix[i][j] == 0) {
          this.emptyCell(coord);
        } else {
          this.fillCell(coord, this.getClassNameById(this.matrix[i][j]));
        }
      }
    }
  }

  // refresh the whole board
  removeRows(rowsRemoved) {
    if (rowsRemoved.count > 0) {
      let blankRow = new Array(this.numCols);

      for (let i = 0; i < this.numCols; i++) blankRow[i] = 0;

      // remove rows (indexes are in reverse order already,
      // so there is no need to start from the bottom)
      for (let i = 0; i < rowsRemoved.count; i++)
        this.matrix.splice(rowsRemoved.indexes[i] - 1, 1);

      // add rows
      for (let i = 0; i < rowsRemoved.count; i++)
        // splice method is used to duplicate an array
        // rather than referencing to an array
        this.matrix.splice(0, 0, blankRow.slice(0));
    }
  }

  // register cells
  register(coords) {
    const ROW = 0,
      COL = 1;

    if (coords.length > 0) this.prevCoords = [];

    for (let i = 0; i < coords.length; i++) {
      this.prevCoords[i] = coords[i];
      this.fillCell(coords[i]);
    }
  }

  // unregister cells
  unregister(coords) {
    const ROW = 0,
      COL = 1;

    for (var i = 0; i < coords.length; i++) {
      this.emptyCell(coords[i]);
    }
  }

  // set a style to a single or multiple cells
  setFootprints(coords, styleId) {
    const ROW = 0,
      COL = 1;

    for (let i = 0; i < coords.length; i++)
      if (this.isWithinVisibleArea(coords[i]))
        this.matrix[coords[i][ROW] - 1][coords[i][COL] - 1] = styleId;
  }

  // is the coord within the view's area
  isWithinVisibleArea(coord) {
    const ROW = 0,
      COL = 1;

    let boundaries = {
      top: 0,
      left: 0,
      right: this.numCols - 1,
      bottom: this.numRows - 1,
    };

    let isWithinVisibleArea = !(
      coord[COL] - 1 < boundaries.left ||
      coord[COL] - 1 > boundaries.right ||
      coord[ROW] - 1 < boundaries.top ||
      coord[ROW] - 1 > boundaries.bottom
    );

    return isWithinVisibleArea;
  }

  // clear previous coords
  clearPrevCoords() {
    this.prevCoords = [];
  }

  // get matrix buffer
  getMatrixBuffer() {
    let matrixbuffer = "boardview, rowNum: " + this.matrix.length + "<br />";

    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[i].length; j++)
        matrixbuffer += this.matrix[i][j] + ", ";

      matrixbuffer += "<br />";
    }

    return matrixbuffer;
  }

  // reset view
  resetMe() {
    for (let r = 0; r < this.numRows; r++) {
      for (let c = 0; c < this.numCols; c++) {
        if (this.matrix[r][c] != 0) {
          let coord = [r + 1, c + 1];
          this.matrix[r][c] = 0;
          this.emptyCell(coord);
        }
      }
    }
  }
}

//--------------------------------------------------------------
// QueueView Object
// Description: Presentation layer of queue list
//--------------------------------------------------------------

// Constructor
class QueueView {
  constructor(
    queueLength,
    numRowsPerPiece,
    numColsPerPiece,
    width,
    height,
    innerBorder
  ) {
    this.blockId = "queueViewWrapper";
    this.length = queueLength;
    this.matrix = new Array(this.length);
    this.drawn = false;
    this.width = width;
    this.wrapper = document.createElement("span");
    this.wrapper.id = this.blockId;

    this.wrapper.style.margin = 0;
    this.wrapper.style.padding = 0;
    this.wrapper.style.position = "relative";
    this.wrapper.style.cssFloat = "left";
    this.wrapper.style.width = parseInt(this.width + 2) + "px";
    this.wrapper.style.display = "inline-block";
    this.wrapper.style.border = "solid 0px";

    for (let i = 0; i < this["length"]; i++) {
      this.matrix[i] = new View(
        "queueView" + i,
        numRowsPerPiece,
        numColsPerPiece,
        width,
        height,
        innerBorder
      );
      this.matrix[i].wrapper.style.border = "0px solid transparent";
    }
  }

  // add a class
  addClass(className, classAttributes) {
    for (let i = 0; i < this["length"]; i++)
      this.matrix[i].addClass(className, classAttributes);
  }

  // draw queue view
  draw(parentNodeId) {
    // check to see if queue view has already been drawn

    if (!this["drawn"]) {
      for (let i = this["length"] - 1; i >= 0; i--) {
        this.wrapper.appendChild(this.matrix[i].wrapper);
      }

      let parent = document.getElementById(parentNodeId);
      parent.appendChild(this.wrapper);

      this.drawn = true;
    } else console.log("Queue view has already been drawn.");
  }

  // update queue view
  update(queue) {
    for (let i = 0; i < this.length; i++) {
      // get class name, but getting id first
      let id = queue.element[i].id;
      let className = this.matrix[i].getClassNameById(id);

      // pieceInfo contains a matrix and name of the piece
      let pieceInfo = queue.getPieceInfo(i);
      this.matrix[i].setFilledClass(className);

      // refreshAllCells
      this.refreshAllCells(i, pieceInfo);
    }
  }

  // refresh all cells
  refreshAllCells(index, pieceInfo) {
    for (let r = 0; r < pieceInfo.matrix.length; r++) {
      for (let c = 0; c < pieceInfo.matrix[r].length; c++) {
        let coord = [r + 1, c + 1];
        if (pieceInfo.matrix[r][c] == 0) this.matrix[index].emptyCell(coord);
        else this.matrix[index].fillCell(coord);
      }
    }
  }

  // reset view
  resetMe() {
    for (let i = 0; i < this.length; i++) {
      for (let r = 0; r < pieceInfo.matrix.length; r++) {
        for (let c = 0; c < pieceInfo.matrix[r].length; c++)
          if (this.matrix[i][r][c] != 0) this.matrix[i] = 0;
      }
    }
  }
}

// Wrapper
// JavaScript Document

// Start - Initialization
var NUMROWS = 10, // number of rows in the board
  NUMCOLS = 7; // number of columns in the board
var QUEUELENGTH = 3; // length of the queue
var GAMEVIEWPARENTID = "main";

var piece = new Piece(); // piece object
var board = new Board(NUMROWS, NUMCOLS); // board object
var controller = new GameController(); // responsibles for the movement of the piece
var scoreboard = new Scoreboard(); // keeps track of the scores
var queue = new Queue(QUEUELENGTH); // stores the upcoming piece(s)

var boardView = new View("tetrisboard", NUMROWS, NUMCOLS, 426, 300, 0); // default: w:488, h:344
var queueView = new QueueView(
  QUEUELENGTH,
  piece.matrix["length"] + 1,
  piece.matrix["length"] + 1,
  120,
  120,
  1
);

var pass = 0; // stores the interval of
var dropSpeed = 50; // default: 100
var dropInterval = 10; // default: 10, the lower the faster
var gameOver = true;

var minScore = parseInt(document.getElementById("hiddenMinScore").value); // lowest score of the top 10 ranking
var hiddenScoreboardNames = document.getElementById("hiddenScoreboardNames")
  .value; // names (or 3 letters-initials) of top ten players with highest scores
var hiddenScoreboardScores = document.getElementById("hiddenScoreboardScores")
  .value; // scores of top ten players with highest scores

// End - Initialization
// Begin - Game Logic

// Actions taken after a key is pressed
function keyEvents(e) {
  var keyCode = window.event ? window.event.keyCode : e.keyCode; // windows.event.keyCode for IE browsers
  // e.keyCode for the rest of the world
  if (controller.isEnabled) {
    controller.setLastKeyPressedByCode(keyCode);

    var nextCoords = piece.getNextPosition(controller.last()["name"]);

    var placementIsPossible = board.isPlacementPossible(nextCoords);

    piece.keyPressed(keyCode, placementIsPossible);

    if (placementIsPossible) boardView.refreshCells(nextCoords);
  }
}

// Events after each drop
function dropOnce() {
  var coords = piece.translatedCoords();
  var nextCoords = piece.getNextPosition("down");

  if (board.isPlacementPossible(nextCoords) && pass >= dropInterval) {
    piece.stepDown();
    boardView.refreshCells(nextCoords);
    pass = 0;
  } else if (pass >= dropInterval + 5) {
    // register piece style into the board
    registerPiece(coords);

    // *** check for gameover condition first *** //
    for (var i = 0; i < coords.length; i++) {
      var coordRow = coords[i][0];
      if (coordRow <= 0) {
        gameOver = true;
        break;
      }
    }

    var numRowsRemoved = board.removeFilledRows(piece.translatedExtremes());

    // process clear row(s)
    if (numRowsRemoved.count > 0) {
      boardView.removeRows(numRowsRemoved);
      boardView.refreshAll();

      // update points
      scoreboard.addPoints(numRowsRemoved.count);
      updateScoreboardView();
    }

    // get next piece from the queue
    var nextPieceInfo = queue.popMe();

    // update queue view
    queueView.update(queue);

    // sets new piece on the board
    piece.setEqualToPiece(nextPieceInfo.id);
    piece.changeStateTo(nextPieceInfo.state);
    piece.setPos([1, parseInt(board.numCols / 2)]);

    boardView.setFilledClass(boardView.getClassNameById(nextPieceInfo.id));
    // sets piece color on the board
    boardView.clearPrevCoords(); // erases (or empties) piece coord on the board
    boardView.refreshCells(piece.translatedCoords()); // redraws piece coord on the board

    // check to see if game over
    if (board.isBlockOverlapped(piece.translatedCoords())) {
      gameOver = true;
    }

    if (gameOver) {
      alert("Game Over");
      endGame();
    }

    pass = 0;
  }

  pass++;
}

// registers the piece
function registerPiece(coords) {
  var styleId = piece.getCurrentPieceIndex();
  board.registerPiece(coords);
  boardView.setFootprints(coords, styleId);
}

// append style to styleseeht
function appendStyle(styleClass) {
  var cellStyles = document.getElementById("cellStyles");

  if (cellStyles.styleSheet) {
    cellStyles.styleSheet.cssText += styleClass;
  } else {
    cellStyles.appendChild(document.createTextNode(styleClass));
  }
}

// draws game status on the right side of gameboard
function drawStatusRight() {
  var statusRightWidth = parseInt(queueView.width + 5) + "px";

  var statusRight = document.createElement("span");
  statusRight.id = "statusRight";
  statusRight.style.margin = "0";
  //statusRight.style.marginBottom = "50px";
  statusRight.style.padding = "0";
  statusRight.style.border = "0";
  statusRight.style.position = "relative";
  statusRight.style.cssFloat = "left";
  statusRight.style.display = "inline-block";
  statusRight.style.width = statusRightWidth;

  var playButtonForm = document.createElement("form");
  playButtonForm.id = "playButtonForm";
  playButtonForm.style.border = "0";
  playButtonForm.style.padding = "0";
  playButtonForm.style.margin = "0";
  playButtonForm.style.width = "100%";
  playButtonForm.style.cssFloat = "left";

  statusRight.appendChild(playButtonForm);

  var playButton = document.createElement("input");
  playButton.id = "playButton";
  playButton.setAttribute("type", "button");
  playButton.value = "Play";
  playButton.style.color = "#FFF";
  playButton.style.backgroundColor = "#333";
  playButton.style.border = "0";
  playButton.style.position = "relative";
  playButton.style.marginLeft = "20px";
  playButton.style.marginBottom = "20px";
  playButton.style.cssFloat = "left";
  playButton.onclick = hidePlayButtonAndStartGame;

  playButtonForm.appendChild(playButton);

  var scoreboardView = document.createElement("p");
  scoreboardView.id = "scoreboardView";
  scoreboardView.style.position = "relative";
  scoreboardView.style.cssFloat = "left";
  scoreboardView.style.margin = "0";
  scoreboardView.style.marginLeft = "15px";
  scoreboardView.style.padding = "0";
  scoreboardView.style.border = "0";

  statusRight.appendChild(scoreboardView);

  document.getElementById(GAMEVIEWPARENTID).appendChild(statusRight);
  queueView.draw(statusRight.id);
}

// draws cover view
function drawRankingView(parentNodeId) {
  var rankingView = document.createElement("form");
  rankingView.id = "rankingView";
  rankingView.name = "rankingView";
  rankingView.className = "main";

  var h2 = document.createElement("h2");
  h2.style.width = "70%";
  h2.style.border = "0";
  h2.style.position = "relative";
  h2.style.color = "#FFF";
  h2.style.backgroundColor = "#333";
  h2.style.textAlign = "center";
  h2.appendChild(document.createTextNode("Tetris"));

  var startButton = document.createElement("input");

  startButton.style.border = "0";
  startButton.style.position = "relative";
  startButton.style.color = "#FFF";
  startButton.style.backgroundColor = "#333";
  startButton.style.marginTop = "25px";
  startButton.style.marginLeft = "220px";
  startButton.type = "button";
  startButton.value = "start";
  startButton.onclick = goToMainGame;

  rankingView.appendChild(h2);

  if (
    minScore != null ||
    hiddenScoreboardNames != null ||
    hiddenScoreboardScores != null
  ) {
    var hiddenScoreboard = {
      names: hiddenScoreboardNames.split(","),
      scores: hiddenScoreboardScores.split(","),
    };

    var rankTextStyle =
      ".rankText {font-size: 16px; float: left; width: 38%; margin: 5px 0px; padding: 0; border: 0; }";
    appendStyle(rankTextStyle);

    for (var i = 0; i < hiddenScoreboard["names"].length; i++) {
      var j = i + 1;
      var rankIndexCol = document.createElement("p");
      rankIndexCol.className = "rankText";
      rankIndexCol.style.width = "20%";
      rankIndexCol.appendChild(document.createTextNode(j));

      var rankNameCol = document.createElement("p");
      rankNameCol.className = "rankText";
      rankNameCol.appendChild(
        document.createTextNode(hiddenScoreboard.names[i])
      );

      var rankScoreCol = document.createElement("p");
      rankScoreCol.className = "rankText";
      rankScoreCol.appendChild(
        document.createTextNode(hiddenScoreboard.scores[i])
      );

      rankingView.appendChild(rankIndexCol);
      rankingView.appendChild(rankNameCol);
      rankingView.appendChild(rankScoreCol);
    }
    rankingView.appendChild(startButton);
  }

  document.getElementById(parentNodeId).appendChild(rankingView);
}

function drawHighScoreEntryView(parentNodeId) {
  var highScoreEntryView = document.createElement("form");
  highScoreEntryView.id = "highScoreEntryView";
  highScoreEntryView.name = "highScoreEntryView";
  highScoreEntryView.method = "post";
  highScoreEntryView.action = "php/recordNewScore.php";

  var label = document.createElement("label");
  var labelText = "Please enter your initials (maximum 3 letters): ";
  label.appendChild(document.createTextNode(labelText));

  var initialInput = document.createElement("input");
  initialInput.type = "text";
  initialInput.name = "initials";
  initialInput.id = "initials";
  initialInput.accessKey = "1";
  initialInput.size = "3";
  initialInput.maxLength = "3";
  initialInput.value = "AAA";
  label.appendChild(initialInput);

  var nameSubmission = document.createElement("input");
  nameSubmission.setAttribute("type", "submit");
  nameSubmission.id = "nameSubmission";
  nameSubmission.value = "submit";

  var finalScore = document.createElement("input");
  finalScore.id = "finalScore";
  finalScore.name = "finalScore";
  finalScore.type = "hidden";
  finalScore.value = "0";

  highScoreEntryView.appendChild(finalScore);
  highScoreEntryView.appendChild(label);
  highScoreEntryView.appendChild(nameSubmission);

  document.getElementById(parentNodeId).appendChild(highScoreEntryView);
}

// makes a block appears
function showBlock(elementId, displayStyle) {
  var elementBlock = document.getElementById(elementId);
  var style = "inline-block";

  if (
    typeof displayStyle == "string" &&
    displayStyle !== "" &&
    displayStyle !== undefined
  )
    style = displayStyle;

  elementBlock.style.display = style;
}

// makes a block disappears
function hideBlock(elementId) {
  var elementBlock = document.getElementById(elementId);
  elementBlock.style.display = "none";
}

// hide all the components of the presentation layer of the game
function hideAllGameViews() {
  hideBlock("statusRight");
  hideBlock(boardView.wrapper.id);
}

// show all the components of the presentation layer of the game
function showAllGameViews() {
  showBlock(boardView.wrapper.id);
  showBlock("statusRight");
  //showBlock ('gamecontrolview');
}

// go to game screen
function goToMainGame() {
  //changeSideNote (gameInstructions);
  showAllGameViews();
  hideBlock("rankingView");
}

// updates scoreboard view
function updateScoreboardView() {
  var scoreboardView = document.getElementById("scoreboardView");
  //scoreboardView.innerHTML = "Level: &nbsp; " + scoreboard.myLevel () +" <br />";
  scoreboardView.innerHTML =
    "Lines: &nbsp;&nbsp;" + scoreboard.getTotalRowsRemoved() + "<br />";
  scoreboardView.innerHTML += "Scores: " + scoreboard.myScore() + "<br />";
}

// starts the game
function startGame() {
  if (gameOver) {
    controller.enabled();
    t = setInterval(dropOnce, dropSpeed);
    gameOver = false;
  }
}

// resets the game
function resetGame() {
  board.emptyMe(); // empties board
  boardView.resetMe(); // clears board
  boardView.refreshAll(); // resets board view
  scoreboard.resetMe(); // resets scoreboard
  updateScoreboardView(); // updates scoreboard
  queue.refreshElements(); // resets the queue
  showBlock("playButton");
  var nextPieceInfo = queue.popMe();

  // update queue view
  queueView.update(queue);

  // sets new piece on the board
  piece.setEqualToPiece(nextPieceInfo.id);
  piece.changeStateTo(nextPieceInfo.state);
  piece.setPos([1, parseInt(board.numCols / 2)]);

  pass = 0;
  dropSpeed = 50; // default: 100
  dropInterval = 10; // default: 10, the lower the faster
}

// ends the game
function endGame() {
  var finalScore = document.getElementById("finalScore");
  finalScore.value = parseInt(scoreboard.myScore());
  pauseGame();
  hideAllGameViews();
  resetGame();
  //changeSideNote(briefIntro);

  if (minScore != -1 && parseInt(minScore) < finalScore.value)
    // -1 meaning minScore hasn't been set
    showBlock("highScoreEntryView");
  else {
    var rankingView = document.getElementById("rankingView");
    rankingView.removeAttribute("style");
    console.log(
      "var rankingView = document.getElementById ('rankingView'); rankingView.style.display = 'static';"
    );
  }
}

// restarts the game
function restartGame() {
  if (!gameOver) endGame();

  resetGame();
  startGame();
}

// pauses game
function pauseGame() {
  controller.disabled();
  clearInterval(t);
}

// resumes game
function resumeGame() {
  if (!gameOver) {
    controller.enabled();
    t = setInterval(dropOnce, dropSpeed);
  }
}

// hide play button and start game
function hidePlayButtonAndStartGame() {
  restartGame();
  hideBlock("playButton");
}
// add styles
boardView.addClass("squareStyle", squareAttributes);
boardView.addClass("iStyle", iAttributes);
boardView.addClass("lStyle", lAttributes);
boardView.addClass("lmStyle", lmAttributes);
boardView.addClass("nStyle", nAttributes);
boardView.addClass("nmStyle", nmAttributes);
boardView.addClass("tStyle", tAttributes);

queueView.addClass("squareStyle", squareAttributes);
queueView.addClass("iStyle", iAttributes);
queueView.addClass("lStyle", lAttributes);
queueView.addClass("lmStyle", lmAttributes);
queueView.addClass("nStyle", nAttributes);
queueView.addClass("nmStyle", nmAttributes);
queueView.addClass("tStyle", tAttributes);

// draw game components
boardView.draw(GAMEVIEWPARENTID);

drawStatusRight(); // wrapping queueView.draw and drawScoreboardView on the right side
hideAllGameViews();

drawHighScoreEntryView(GAMEVIEWPARENTID);
hideBlock("highScoreEntryView");

drawRankingView(GAMEVIEWPARENTID);

boardView.setFilledClass(
  boardView.getClassNameById(piece.getCurrentPieceIndex())
);

queueView.update(queue);

piece.setPos([1, parseInt(board.numCols / 2)]);

boardView.setFilledClass(
  boardView.getClassNameById(piece.getCurrentPieceIndex())
);

boardView.register(piece.translatedCoords());

document.onkeydown = keyEvents;

controller.disabled();
