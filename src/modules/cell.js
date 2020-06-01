//--------------------------------------------------------------
// Cell Class
//--------------------------------------------------------------

// Cell Constructor
export default class Cell {
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
