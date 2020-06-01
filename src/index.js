//--------------------------------------------------------------
// Author: 		Steve Hon
// Name:   		Tetris.js
// Description:	Containing all required components to build Tetris.
// Last Update: 5/29/2020
//--------------------------------------------------------------

import {
  squareAttributes,
  iAttributes,
  lAttributes,
  lmAttributes,
  nAttributes,
  nmAttributes,
  tAttributes,
  NUMROWS,
  NUMCOLS,
  QUEUELENGTH,
  GAMECONTAINERID,
} from "./config";

import Piece from "./modules/piece";
import Board from "./modules/board";
import GameController from "./modules/gameController";
import Scoreboard from "./modules/scoreboard";
import Queue from "./modules/queue";
import View from "./modules/view";
import QueueView from "./modules/queueView";
import css from "./css/style.css";

// Wrapper
// JavaScript Document

// Start - Initialization
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

var pass = 0; // stores the interval
var dropSpeed = 100; // default: 100
var dropInterval = 10; // default: 10, the lower the faster
var gameOver = true;
var t = null; // stores timer id for stopping timer

// var minScore = parseInt(document.getElementById("hiddenMinScore").value); // lowest score of the top 10 ranking
// var hiddenScoreboardNames = document.getElementById("hiddenScoreboardNames")
//   .value; // names (or 3 letters-initials) of top ten players with highest scores
// var hiddenScoreboardScores = document.getElementById("hiddenScoreboardScores")
//   .value; // scores of top ten players with highest scores

// End - Initialization
// Begin - Game Logic

// Actions taken after a key is pressed
function keyEvents(e) {
  let keyCode = window.event ? window.event.keyCode : e.keyCode; // windows.event.keyCode for IE browsers
  // e.keyCode for the rest of the world
  if (controller.isEnabled) {
    controller.setLastKeyPressedByCode(keyCode);

    let nextCoords = piece.getNextPosition(controller.last()["name"]);

    let placementIsPossible = board.isPlacementPossible(nextCoords);

    piece.keyPressed(keyCode, placementIsPossible);

    if (placementIsPossible) boardView.refreshCells(nextCoords);
  }
}

// Events after each drop
function dropOnce() {
  let coords = piece.translatedCoords();
  let nextCoords = piece.getNextPosition("down");

  if (board.isPlacementPossible(nextCoords) && pass >= dropInterval) {
    piece.stepDown();
    boardView.refreshCells(nextCoords);
    pass = 0;
  } else if (pass >= dropInterval + 5) {
    // register piece style into the board
    registerPiece(coords);

    // *** check for gameover condition first *** //
    for (let i = 0; i < coords.length; i++) {
      let coordRow = coords[i][0];
      if (coordRow <= 0) {
        gameOver = true;
        break;
      }
    }

    var numRowsRemoved = board.removeFilledRows(piece.translatedExtremes());

    // clear row(s)
    if (numRowsRemoved.count > 0) {
      boardView.removeRows(numRowsRemoved);
      boardView.refreshAll();

      // update points
      scoreboard.addPoints(numRowsRemoved.count);
      updateScoreboardView();
    }

    // get next piece from the queue
    let nextPieceInfo = queue.popMe();

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

// appends style to stylesheet
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

  var sideStatus = document.getElementById("sideStatus");
  sideStatus.style.width = statusRightWidth;
  // sideStatus.id = "sideStatus";
  // sideStatus.style.margin = "0";
  // //statusRight.style.marginBottom = "50px";
  // sideStatus.style.padding = "0";
  // sideStatus.style.border = "0";
  // sideStatus.style.position = "relative";
  // sideStatus.style.cssFloat = "left";
  // sideStatus.style.display = "inline-block";

  // var playButtonForm = document.createElement("form");
  // playButtonForm.id = "playButtonForm";
  // playButtonForm.style.border = "0";
  // playButtonForm.style.padding = "0";
  // playButtonForm.style.margin = "0";
  // playButtonForm.style.width = "100%";
  // playButtonForm.style.cssFloat = "left";

  // statusRight.appendChild(playButtonForm);

  var playButton = document.getElementById("playButton");
  // playButton.id = "playButton";
  // playButton.setAttribute("type", "button");
  // playButton.innerText = "Play";
  // playButton.style.color = "#FFF";
  // playButton.style.backgroundColor = "#333";
  // playButton.style.border = "0";
  // playButton.style.position = "relative";
  // playButton.style.marginLeft = "20px";
  // playButton.style.marginBottom = "20px";
  // playButton.style.cssFloat = "left";
  playButton.addEventListener("click", hidePlayButtonAndStartGame);

  var scoreboardView = document.createElement("p");
  // scoreboardView.id = "scoreboardView";
  // scoreboardView.style.position = "relative";
  // scoreboardView.style.cssFloat = "left";
  // scoreboardView.style.margin = "0";
  // scoreboardView.style.marginLeft = "15px";
  // scoreboardView.style.padding = "0";
  // scoreboardView.style.border = "0";

  //sideStatus.appendChild(scoreboardView);

  //document.getElementById(GAMEID).appendChild(sideStatus);
  queueView.draw(sideStatus.id);
}

// displays home screen
//function drawRankingView(parentNodeId) {
// if (
//   minScore != null ||
//   hiddenScoreboardNames != null ||
//   hiddenScoreboardScores != null
// ) {
//   var hiddenScoreboard = {
//     names: hiddenScoreboardNames.split(","),
//     scores: hiddenScoreboardScores.split(","),
//   };
//   var rankTextStyle =
//     ".rankText {font-size: 16px; float: left; width: 38%; margin: 5px 0px; padding: 0; border: 0; }";
//   appendStyle(rankTextStyle);
// for (var i = 0; i < hiddenScoreboard["names"].length; i++) {
//   var j = i + 1;
//   var rankIndexCol = document.createElement("p");
//   rankIndexCol.className = "rankText";
//   rankIndexCol.style.width = "20%";
//   rankIndexCol.appendChild(document.createTextNode(j));
//   var rankNameCol = document.createElement("p");
//   rankNameCol.className = "rankText";
//   rankNameCol.appendChild(
//     document.createTextNode(hiddenScoreboard.names[i])
//   );
//   var rankScoreCol = document.createElement("p");
//   rankScoreCol.className = "rankText";
//   rankScoreCol.appendChild(
//     document.createTextNode(hiddenScoreboard.scores[i])
//   );
//   rankingView.appendChild(rankIndexCol);
//   rankingView.appendChild(rankNameCol);
//   rankingView.appendChild(rankScoreCol);
// }
//main.appendChild(startButton);
//}
//document.getElementById(parentNodeId).appendChild(main);
//}

// function drawHighScoreEntryView(parentNodeId) {
//   var highScoreEntryView = document.createElement("form");
//   highScoreEntryView.id = "highScoreEntryView";
//   highScoreEntryView.name = "highScoreEntryView";
//   highScoreEntryView.method = "post";
//   highScoreEntryView.action = "php/recordNewScore.php";

//   var label = document.createElement("label");
//   var labelText = "Please enter your initials (maximum 3 letters): ";
//   label.appendChild(document.createTextNode(labelText));

//   var initialInput = document.createElement("input");
//   initialInput.type = "text";
//   initialInput.name = "initials";
//   initialInput.id = "initials";
//   initialInput.accessKey = "1";
//   initialInput.size = "3";
//   initialInput.maxLength = "3";
//   initialInput.value = "AAA";
//   label.appendChild(initialInput);

//   var nameSubmission = document.createElement("input");
//   nameSubmission.setAttribute("type", "submit");
//   nameSubmission.id = "nameSubmission";
//   nameSubmission.value = "submit";

//   var finalScore = document.createElement("input");
//   finalScore.id = "finalScore";
//   finalScore.name = "finalScore";
//   finalScore.type = "hidden";
//   finalScore.value = "0";

//   highScoreEntryView.appendChild(finalScore);
//   highScoreEntryView.appendChild(label);
//   highScoreEntryView.appendChild(nameSubmission);

//   document.getElementById(parentNodeId).appendChild(highScoreEntryView);
// }

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
  hideBlock("sideStatus");
  hideBlock(boardView.wrapper.id);
}

// show all the components of the presentation layer of the game
function showAllGameViews() {
  showBlock(boardView.wrapper.id);
  showBlock("sideStatus");
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
  //var finalScore = document.getElementById("finalScore");
  //finalScore.value = parseInt(scoreboard.myScore());
  pauseGame();
  hideAllGameViews();
  resetGame();
  //changeSideNote(briefIntro);

  // if (minScore != -1 && parseInt(minScore) < finalScore.value)
  //   // -1 meaning minScore hasn't been set
  //   showBlock("highScoreEntryView");
  // else {
  // show home screen
  let main = document.getElementsByTagName("main")[0];
  main.removeAttribute("style");
  // console.log(
  //   "var rankingView = document.getElementById ('rankingView'); rankingView.style.display = 'static';"
  // );
  // }
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

// displays game components
boardView.draw(GAMECONTAINERID);

drawStatusRight(); // wrapping queueView.draw and drawScoreboardView on the right side
hideAllGameViews();

//drawHighScoreEntryView(GAMEVIEWPARENTID);
//hideBlock("highScoreEntryView");

let startButton = document.getElementsByClassName("start")[0];
startButton.addEventListener("click", (e) => {
  e.preventDefault();
  goToMainGame();
});

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
