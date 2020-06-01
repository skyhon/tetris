import View from "./view";
//--------------------------------------------------------------
// QueueView Class
// Description: Shows the queue of the upcoming tetris pieces.
//--------------------------------------------------------------

// Constructor
export default class QueueView {
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
