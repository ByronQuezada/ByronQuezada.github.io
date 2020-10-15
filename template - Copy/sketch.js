const GRIDSIZE = 3;
// let state = "title";
let cellSize;
let grid = [[1,2,3],
  [4,5,6],
  [7,8,9]];
let newGrid = [];
let scenery, scenery1, scenery2, scenery3, scenery4, scenery5, scenery6, scenery7, scenery8, scenery9;
let shouldMove = false;

function preload(){
  scenery = loadImage("assets/scenery.jpg");
  scenery1 = loadImage("assets/scenery1.jpg");
  scenery2 = loadImage("assets/scenery2.jpg");
  scenery3 = loadImage("assets/scenery3.jpg");
  scenery4 = loadImage("assets/scenery4.jpg");
  scenery5 = loadImage("assets/scenery5.jpg");
  scenery6 = loadImage("assets/scenery6.jpg");
  scenery7 = loadImage("assets/scenery7.jpg");
  scenery8 = loadImage("assets/scenery8.jpg");
  scenery9 = loadImage("assets/scenery9.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  if(width < height){
    cellSize = width/GRIDSIZE;
  }
  else{
    cellSize = height/GRIDSIZE;
  }
} 

function draw() {
  displayGrid();
  //switchScreens();
}

//function switchScreens(){   // function I was working on but couldn't complete
//   if (state === "title"){
//     titlePage();
//   }
//   else if (state === "game" ){
//     shuffleImage();
//   }
//   else if (state === "image"){
//     imageMode (CENTER);
//     image(scenery, 0, cellSize / 2, cellSize * 1.5, cellSize * 1.5);
//     if (mousePressed){ // FIX 
//       state = "game";
//     }
//   }
// }

function titlePage(){
  textSize(40);
  textAlign (CENTER, CENTER);
  text("Picture Sliding Puzzle Easy Mode", windowWidth / 2, windowHeight / 4);
  text("Press the 's' key to shuffle", windowWidth / 2, windowHeight / 2);
  // text("Press the 'i' key to see the final image", windowWidth / 2, windowHeight / 1.5);
}

function displayGrid(){
  // assigning each image to a grid
  for (let y = 0; y < GRIDSIZE; y++){
    for (let x = 0; x < GRIDSIZE; x++){
      newGrid[y][x] = int(newGrid[y][x]);
    
      if (newGrid[y][x] === 1){
        image(scenery1, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      if (newGrid[y][x] === 2){
        image(scenery2, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      if (newGrid[y][x] === 3){
        image(scenery3, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      if (newGrid[y][x] === 4){
        image(scenery4, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      if (newGrid[y][x] === 5){
        image(scenery5, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      if (newGrid[y][x] === 6){
        image(scenery6, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      if (newGrid[y][x] === 7){
        image(scenery7, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      if (newGrid[y][x] === 8){
        image(scenery8, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      if (newGrid[y][x] === 9) {
        rect(x*cellSize, y*cellSize, cellSize, cellSize);
      }
    }
  }
  strokeLines();
}

function strokeLines(){
  // drawing the stroke lines
  strokeWeight(3);
  stroke(255);
  line(0, 0, windowWidth/2 - cellSize*1.5 + 3*cellSize, 0);
  line(0, cellSize, windowWidth/2 - cellSize*1.5 + 3*cellSize, cellSize);
  line(0, 2*cellSize, windowWidth/2 - cellSize*1.5 + 3*cellSize, 2*cellSize);
  line(0, 3*cellSize, windowWidth/2 - cellSize*1.5 + 3*cellSize, 3*cellSize);
  line(0, 0, 0, 3*cellSize);
  line(cellSize, 0, cellSize, 3*cellSize);
  line(2*cellSize, 0, 2*cellSize, 3*cellSize);
  line(3*cellSize, 0, 3*cellSize, 3*cellSize);
}

function mousePressed(){
  let x = floor(mouseX / cellSize);
  let y = floor(mouseY / cellSize);
  
  checkGrid(y, x);
}

function checkGrid(y, x){
  if (y+1 < GRIDSIZE && x < GRIDSIZE&& newGrid[y + 1][x] === 9){
    // to check if it should move down
    
    newGrid[y + 1][x] = newGrid[y][x];
    newGrid[y][x] = 9;
    displayGrid();
  }
  if (x+1 < GRIDSIZE && y < GRIDSIZE && newGrid [y][x + 1] === 9){
    // to check if it should move right
    
    newGrid [y][x + 1] = newGrid[y][x];
    newGrid[y][x] = 9;
    displayGrid();
  }
  if (x-1 >= 0 && y >= 0 && newGrid [y][x - 1] === 9){
    // to check if it should move left
    
    newGrid[y][x - 1] = newGrid[y][x];
    newGrid[y][x] = 9;
    displayGrid();
  }
  if (y-1 >= 0 && x >= 0 && newGrid [y - 1][x] === 9){
    // to check if it should move up
    
    newGrid[y - 1][x] = newGrid[y][x];
    newGrid[y][x] = 9;
    displayGrid();
  } 
  if (newGrid === grid){
    image(scenery9, windowWidth/2 - cellSize*1.5 + cellSize*2, cellSize*2, cellSize, cellSize);
  }
}

function shuffleImage(){
  // to randomize the grid (easy mode)
  for (let x = 0; x < GRIDSIZE; x++){
    newGrid [x] = shuffle(grid[x]);
  }
  displayGrid();
}

function keyPressed(){
  // to start the game
  if (key === "s"){
    // state = "game";
    grid = shuffleImage();
  }
//   if (key === "i"){
//     image(scenery, 0, 0, cellSize * 3, cellSize * 3);
//     state = "image";
//   }
}