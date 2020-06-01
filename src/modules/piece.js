import { SQUARE, I, L, LM, N, NM, T } from "../blocks";
import { CELLSPERPIECE, MAXPIECEINDEX } from "../config";
import Matrix from "./matrix";
import GameController from "./gameController";

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
// Piece Object
//--------------------------------------------------------------

// Constructor
//--------------------------------------------------------------
// Parameter:
// 		1) whichPiece (optional) - specifies the type of tetris piece

export default class Piece {
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
        nextCoords = this.translatedCoords(); // piece
        this.rotateCounterclockwise();
        break;

      case controller.counterclockwise().name:
        this.rotateCounterclockwise();
        nextCoords = this.translatedCoords(); // piece
        this.rotateClockwise();
        break;

      case controller.change().name:
        this.setEqualToPiece(this.getNextPieceIndex()); //piece
        nextCoords = this.translatedCoords(); //piece
        this.setEqualToPiece(this.getPreviousPieceIndex()); //piece
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
