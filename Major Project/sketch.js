// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let startButton;
let running;
let gameStarted;
let isUsingMouse;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  image(running, mouseX, mouseY);
  
}

function preload() {
  running = loadImage("assets/running.png");
}
function startGame() {
  startButton.hide();
  noCursor();
  isUsingMouse = true;
  gameStarted = true;

}
//Ending game and displaying try again button
function endGame() {
  gameStarted = false;
  background("black");
  fill(255);
  text("GAME OVER", width / 2, height /2);
  cursor();
  
 
}
//Displaying start button
startButton = createButton("Start Game");
startButton.position(width / 2 - width / 4 / 2, height / 2 - height / 8 / 2);
startButton.size(width /4, height / 8);
startButton.mousePressed(startGame);