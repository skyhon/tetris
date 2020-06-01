//--------------------------------------------------------------
// View Class
// Description: Presentation of the game
//--------------------------------------------------------------

// Constructor
export default class View {
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
