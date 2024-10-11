class PixelArt {
  constructor(id, rows, cols) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.fillColor = "green";
    this.rows = rows;
    this.cols = cols;
    this.selectedColor = 0;
    this.palleteColors = new Array(cols.length);
    this.canvasDim = { height: this.canvas.height, width: this.canvas.width };
    this.cellDim = {
      width: this.canvas.width / cols,
      height: this.canvas.height / rows,
    };
    this.setupGrid();
    this.setupCells();
    this.setupPallete();
    // Bind methods and store them to remove later
    this.boundPaintCell = this.paintCell.bind(this);
    this.boundDragStart = this.dragStart.bind(this);
    this.boundDragEnd = this.dragEnd.bind(this);
    // Add event listeners
    this.canvas.addEventListener("mousedown", this.boundDragStart);
    this.canvas.addEventListener("mouseup", this.boundDragEnd);
    this.canvas.addEventListener("click", this.boundPaintCell);
  }

  setColor(color) {
    this.fillColor = color;
  }

  setupGrid() {
    this.drawLine(0, 0, 0, this.canvasDim.height);
    this.drawLine(
      0,
      this.canvasDim.height,
      this.canvasDim.width,
      this.canvasDim.height
    );
    this.drawLine(
      this.canvasDim.width,
      this.canvasDim.height,
      this.canvasDim.width,
      0
    );
    this.drawLine(this.canvasDim.width, 0, 0, 0);
  }

  setupCells() {
    //for each column, draw line
    for (let i = 0; i < this.cols - 1; i++) {
      //start x = (i + 1 )* this.cellDim.width
      //start y = 0
      //end x same
      //end y = this.canvasDim.height
      this.drawLine(
        (i + 1) * this.cellDim.width,
        0,
        (i + 1) * this.cellDim.width,
        this.canvasDim.height
      );
    }
    // for each row, draw line
    for (let j = 0; j < this.rows - 1; j++) {
      //start y =
      this.drawLine(
        0,
        (j + 1) * this.cellDim.height,
        this.canvasDim.width,
        (j + 1) * this.cellDim.height
      );
    }
  }

  drawLine(x1, y1, x2, y2) {
    this.ctx.strokeStyle = "grey";
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  setupPallete() {
    for (let i = 0; i < this.cols; i++) {
      this.palleteColors[i] = {
        r: Math.random() * 255,
        g: Math.random() * 255,
        b: Math.random() * 255,
      };
      this.ctx.fillStyle = `rgb(${this.palleteColors[i].r}, ${this.palleteColors[i].g}, ${this.palleteColors[i].b})`;
      this.ctx.fillRect(
        this.cellDim.width * i,
        this.canvasDim.height - this.cellDim.height,
        this.cellDim.width,
        this.cellDim.height
      );
    }
    this.fillColor = `rgb(${this.palleteColors[0].r}, ${this.palleteColors[0].g}, ${this.palleteColors[0].b})`;
  }

  paintCell(event) {
    const [col, row] = [
      Math.floor(event.offsetX / this.cellDim.width),
      Math.floor(event.offsetY / this.cellDim.height),
    ];
    if (row === this.rows - 1) {
      this.fillColor = `rgb(${this.palleteColors[col].r}, ${this.palleteColors[col].g}, ${this.palleteColors[col].b})`;
      this.selectedColor = col;
      return;
    }
    const startX = col * this.cellDim.width,
      startY = row * this.cellDim.height;
    this.ctx.fillStyle = this.fillColor;
    this.ctx.fillRect(startX, startY, this.cellDim.width, this.cellDim.height);
    //redraw stroke around it
    this.drawLine(startX, startY, startX + this.cellDim.width, startY); // Top edge
    this.drawLine(
      startX + this.cellDim.width,
      startY,
      startX + this.cellDim.width,
      startY + this.cellDim.height
    ); // Right edge
    this.drawLine(
      startX + this.cellDim.width,
      startY + this.cellDim.height,
      startX,
      startY + this.cellDim.height
    ); // Bottom edge
    this.drawLine(startX, startY + this.cellDim.height, startX, startY); // Left edge
  }

  dragStart(event) {
    this.canvas.addEventListener("mousemove", this.boundPaintCell);
  }
  dragEnd(event) {
    this.canvas.removeEventListener("mousemove", this.boundPaintCell);
  }
}

function setupGrid() {
  this.art = new PixelArt("grid", 25, 25);
}

function setRed() {
  this.art.setColor("red"); // Update the color to red
  document.getElementById("red-btn").style.backgroundColor = "blue"; // Make the Red button blue
  document.getElementById("red-btn").style.color = "azure";
  document.getElementById("green-btn").style.backgroundColor = "white"; // Reset the Green button
  document.getElementById("green-btn").style.color = "black";
}

function setGreen() {
  this.art.setColor("green"); // Update the color to green
  document.getElementById("green-btn").style.backgroundColor = "blue"; // Make the Green button blue
  document.getElementById("green-btn").style.color = "azure";
  document.getElementById("red-btn").style.backgroundColor = "white"; // Reset the Red button
  document.getElementById("red-btn").style.color = "black";
}

window.addEventListener("DOMContentLoaded", setupGrid);
