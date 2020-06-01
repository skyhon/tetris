import Cell from "./cell";
//--------------------------------------------------------------
// Row Class
//--------------------------------------------------------------

export default class Row {
  constructor(cellsPerRow) {
    this.EMPTY = 0; // empty row
    this.FILLED = 1; // filled row
    this.PARTIALLYFILLED = -1; // has filled cell(s), but the whole
    // row is not completely filled or empty

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
      // if the cells in both objects' rows are not equal in length,
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

  // prints the matrix block for debugging
  printMe() {
    let buffer = "";

    for (let i = 0; i < this.numCells; i++) {
      buffer += this.cells[i].isEmpty() ? 0 : 1;
    }
    console.log(buffer);
  }
}
