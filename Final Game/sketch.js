// Sudoku 2d array demo

let sudoku;
let initialState;

const GRIDSIZE = 9;
let cellSize;

function preload() {
  sudoku = loadStrings("assets/1.txt");
  initialState = loadStrings("assets/1.txt");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // convert suduko into 2d array
  for (let i=0; i<sudoku.length; i++) {
    sudoku[i] = sudoku[i].split(",");
    initialState[i] = initialState[i].split(",");
  }

  //loop through the whole 2d array, and turn everything to numbers
  for (let y=0; y<GRIDSIZE; y++) {
    for (let x=0; x<GRIDSIZE; x++) {
      sudoku[y][x] = int(sudoku[y][x]);
      initialState[y][x] = int(initialState[y][x]);
    }
  }

  if (width < height) {
    cellSize = width / GRIDSIZE;
  }
  else {
    cellSize = height / GRIDSIZE;
  }
}