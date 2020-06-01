//--------------------------------------------------------------
// Scoreboard Class
//--------------------------------------------------------------

// Constructor
export default class Scoreboard {
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
