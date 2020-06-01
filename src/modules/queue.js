import { SQUARE, I, L, LM, N, NM, T } from "../blocks";
import { MAXPIECEINDEX } from "../config";
//--------------------------------------------------------------
// Queue Object
// Description: Queue is list containing element id's and
// 				states of upcoming pieces. Note: The queue does
//				not contains the piece itself.
//--------------------------------------------------------------

// Constructor
export default class Queue {
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
