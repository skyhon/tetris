// Start - Initialization
export const NUMROWS = 10; // number of rows on the board, default: 10
export const NUMCOLS = 7; // number of columns on the board, default: 7
export const QUEUELENGTH = 3; // length of the queue
export const SCOREBOARDID = "scoreboard";
export const GAMECONTAINERID = "game";

//--------------------------------------------------------------
// Piece's predefined properties (const)
//--------------------------------------------------------------
export const squareAttributes = {
  color: "#3f6cb7",
  image: null,
  borderColor: "#0066ff",
  borderStyle: "solid",
};

export const iAttributes = {
  color: "#0367a6",
  image: null,
  borderColor: "#006699",
  borderStyle: "solid",
};

export const lAttributes = {
  color: "#8de0f2",
  image: null,
  borderColor: "#9ec9ed",
  borderStyle: "solid",
};

export const lmAttributes = {
  color: "#663333",
  image: null,
  borderColor: "#624b1f",
  borderStyle: "solid",
};

export const nAttributes = {
  color: "#ffcc00",
  image: null,
  borderColor: "#f9cb26",
  borderStyle: "solid",
};

export const nmAttributes = {
  color: "#8cacae",
  image: null,
  borderColor: "#999999",
  borderStyle: "solid",
};

export const tAttributes = {
  color: "#993366",
  image: null,
  borderColor: "#884679",
  borderStyle: "solid",
};

//--------------------------------------------------------------
// Constants
//--------------------------------------------------------------

export const MAXPIECEINDEX = 7; // largest index for identifying pieces
// 0 = empty, 1...7 (square...t)
export const CELLSPERPIECE = 4; // number of cells per piece
