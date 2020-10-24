/**
 ** Name: Richard Shuai 
 ** Course: Computer Science 30
 ** Project: Interactive Scene Assignment
 ** Date: Sept/18/2020
 ** 
 ** Ping Pong
 **
 ** Extra for expert
 ** 1. Dealt with window resizing
 ** 2. Sound is added
 ** 3. Alert & Conslole.log are used
 ** 4. Array utilized to store background img
 **/


// Variables Dictionary:
// hit->is circle(pingpong ball) collding with rect(pad)
// rectangle_x, rectangle_y -> rectangle's left-up vertex coordinate
// rectangle_width, rectangle_height -> rect's width and height
// is_rectangle_left, is_rectangle_right -> is rect moving left or right boolean
// circle_x, circle_y -> circle's x,y coordinate
// circle_radius -> circle's radius
// circle_dx -> circle's first derivative of the x-direction displacement
// circle_dy -> circle's first derivative of the y-direction displacement
// score -> user's total score
// is_start -> boolean indicating is the game is started
// is_over -> boolean indicating is the game ended
// imgs[] -> array stores all background images
// startimg -> starting menu image
// overimg -> game over image
// sound -> sound file that plays every time Ping Pong collides
let hit, rectangle_x, rectangle_y, rectangle_width, rectangle_height, is_rectangle_left, is_rectangle_right, rectv, circle_x, circle_y, circle_radius, circle_dx, circle_dy, score, is_start, is_over, imgs = [],
  bgimg, startimg, overimg, sound;

// preload images
function preload() {
  startimg = loadImage('startimg.jpg');
  overimg = loadImage('over.jpg');
  for (let i = 1; i <= 15; ++i)
    imgs.push(loadImage('background' + i + '.jpg'));
}

// setup the program
function setup() {
  createCanvas(windowWidth, windowHeight);
  init_rect();
  is_over = false;
  is_start = false;
  is_rectangle_left = false;
  is_rectangle_right = false;
  hit = false;
  score = 0;
  init_circle();
  bgimg = random(imgs);
  soundFormats('mp3');
  sound = loadSound('popsound.mp3');
  alertmessages();
}

// main draw function
function draw() {
  if (!is_start) menu();
  else if (!is_over) play();
  else over();
}

// show menu intro
function menu() {
  background(startimg);
  fill(235, 235, 235);
  textSize(60);
  text('Ping Pong', width / 2 - 120, 80);
  textSize(40);
  text('Press C to compete', width / 2 - 120, height - 100);
}

// the screen when the game is not over
function play() {
  background(bgimg);
  rect(rectangle_x - rectangle_width / 2, rectangle_y - rectangle_height / 2, rectangle_width, rectangle_height);
  do_move();
  ci_move();
  ci_bounce();
  ci_show();
  check_collide();
  check_out_bound();
  display_score();
  speed_plus();
}

// game over screen
function over() {
  background(overimg);
  display_commentary();
}

// alert messages at the beginning
function alertmessages() {
  alert('Welcome to 2020 Tokyo Remote Olympic. The situation is unprecedented, atheletes have to stay home to keep them safe from COVID-19. As one of Ping Pong athelete representing your country, you will be competing your opponent online.');
  alert('Instruction: 1.Control you pad by pressing A and D. 2.Randomly select your competing venue by clicking the mouse. 3. Uparrow to increase difficulty, downarrow to decrease difficulty');
}

// initial rectangle function
function init_rect() {
  rectangle_x = width / 2;
  rectangle_y = height / 1.6;
  rectangle_width = width / 16;
  rectangle_height = height / 128;
  rectv = 8;
}

// initial circle function
function init_circle() {
  circle_radius = (width + height) / 64;
  circle_x = width / 2;
  circle_y = 20;
  circle_dx = -1;
  circle_dy = 4;
}

// user move the rectangle
function do_move() {
  if (is_rectangle_left && rectangle_x > rectv) rectangle_x -= rectv;
  if (is_rectangle_right && rectangle_x < width - rectv) rectangle_x += rectv;
}

// move the circle 
function ci_move() {
  circle_x += circle_dx;
  circle_y += circle_dy;
}

// bounce the circle
function ci_bounce() {
  //check to see if we need to bounce
  if (circle_x < circle_radius) {
    sound.play();
    circle_dx *= -1;
    circle_x += 0.5;
    fill(random(255), random(255), random(255));
  }
  if (circle_x + circle_radius > width) {
    sound.play();
    circle_dx *= -1;
    circle_x -= 0.5;
    fill(random(255), random(255), random(255));
  }
  if (circle_y < circle_radius) {
    sound.play();
    circle_dy *= -1;
    circle_y += 0.5;
    fill(random(255), random(255), random(255));
  }
  if (circle_y + circle_radius > height) {
    sound.play();
    circle_dy *= -1;
    circle_y -= 0.5;
    fill(random(255), random(255), random(255));
  }
}

// show circle function
function ci_show() {
  circle(circle_x, circle_y, circle_radius);
}

// check if the circle collides with the rectangle
function check_collide() {
  hit = collideRectCircle(rectangle_x - rectangle_width / 2, rectangle_y - rectangle_height / 2, rectangle_width, rectangle_height, circle_x, circle_y, circle_radius);
  if (hit) {
    sound.play();
    circle_dx *= -1;
    circle_dy *= -1;
    circle_y -= 4;
    fill(random(255), random(255), random(255));
    ++score;
  }
}

// if out of bound, switch the is_over boolean
function check_out_bound() {
  if (circle_y > rectangle_y) is_over = true;
}

// display the score on the right-up corner
function display_score() {
  textSize(32);
  text('Score: ' + score, width - 200, 30);
}

// increases speed as score increases
function speed_plus() {
  circle_dx < 0 ? circle_dx = -0.15 * score - 4 : circle_dx = 0.15 * score + 4;
  circle_dy < 0 ? circle_dy - 0.25 * score - 2 : circle_dy = 0.25 * score + 2;
}

// display commentary based on scores
function display_commentary() {
  fill(255, 0, 0);
  textSize(32);
  text('Game Over!', width / 2 - 40, height / 2 - 150);
  fill(0, 255, 0);
  text('Your score is ' + score, width / 2 - 50, height / 2 - 50);
  if (score < 15) {
    fill(60, 60, 60);
    text('Good job!', width / 2 - 40, height / 2 + 50);
  } else if (score < 30) {
    fill(20, 20, 255);
    text('That was great!', width / 2 - 40, height / 2 + 50);
  } else {
    fill(10, 255, 255);
    text('Impressive!', width / 2 - 40, height / 2 + 50);
  }
  fill(0, 0, 0);
  text('Press R to play again.', width / 2 - 80, height / 2 + 150);
}

// change left or right and change difficullty
function keyPressed() {
  if (key === 'c' && !is_start) is_start = true;
  if (key === 'd') is_rectangle_right = true;
  if (key === 'a') is_rectangle_left = true;
  if (keyCode === UP_ARROW && rectangle_width < width / 3) rectangle_width += 10; // decrease difficulty
  if (keyCode === DOWN_ARROW && rectangle_width > 20) rectangle_width -= 10; // increase difficulty
  if (key === 'r' && is_over) setup(); // restart
}

// cancel left or right
function keyReleased() {
  if (key === 'd') is_rectangle_right = false;
  if (key === 'a') is_rectangle_left = false;
}

// mouse click to change background image
function mouseClicked() {
  bgimg = random(imgs);
}

// if window resizes, reset the attributes
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  init_rect();
  init_circle();
}