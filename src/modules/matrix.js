import Row from "./row";

//--------------------------------------------------------------
// Matrix class
//--------------------------------------------------------------

export default class Matrix {
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

  // prints the matrix block for debugging
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
