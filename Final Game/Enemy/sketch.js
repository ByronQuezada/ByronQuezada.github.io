// attack object and keep in track obeject
//Byron
// Interactive escene
// I'll be using this logic for my major project

let circleSize = 30;
let things = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function draw() {
  background(0);
  centerScreen();
  enemy();
}

function enemy() {
  for (let i = 0; i < things.length; i++) {
    // things[i].move();
    things[i].attack();
    things[i].show();
    for (let j = things[i].acannon.length-1; j >= 0; j--) {
      things[i].acannon[j].move();
      things[i].acannon[j].show();
      if (things[i].acannon[j].destroy()) {
        things[i].acannon.splice(j, 1);
      }
    }
  }
}

function centerScreen() {
  ellipse(width/2, height/2, circleSize);
}

function mousePressed() {
  
  things.push(new enemyAtack(mouseX, mouseY, circleSize));
}


class cannon {
  constructor(x, y, size) {
    this.x = 0;
      
    this.realX;
    this.realY;
      
    this.xTranslate = x;
    this.yTranslate = y;    
    this.size = size;
    this.rotate = atan2(height/2 - y, width/2 - x);
  }
  destroy() {
    return this.realX < width/2 + this.size*2 && this.realX > width/2 - this.size*2
          && this.realY < height/2 + this.size*2 && this.realY > height/2 - this.size*2;
  }
      
  move() {
    this.x++;
    this.realX = this.xTranslate + cos(this.rotate)*this.x;
    this.realY = this.yTranslate + sin(this.rotate)*this.x;
  }
      
  show() {
    push();
    fill("blue");
    translate(this.xTranslate, this.yTranslate);
    rotate(this.rotate);
    circle(this.x, 0, this.size/2, this.size*2);
    pop();
  }
}
      
class enemyAtack {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
      
    this.size = size;
    this.acannon = [];
      
    this.timer = 100;
    this.otherTime = millis();
    this.state = 1;
  }
      
  move() {
    if (this.x > width/2 + this.size*2) {
      this.x -= 0.5;
    }
      
    if (this.x < width/2 - this.size*2) {
      this.x += 0.5;
    }
      
    if (this.y > height/2 + this.size*2) {
      this.y -= 0.5;
    }
      
    if (this.y < height/2 - this.size*2) {
      this.y += 0.5;
    }
  }
      
  attack() {
    if (this.state === 1) {
      this.acannon.push(new cannon(this.x, this.y, this.size));
      this.state = 0;
    }
      
    else {
      let elapsedTime = millis() - this.otherTime;
      if (elapsedTime > this.timer) {
        this.state = 1;
        this.otherTime = millis();
      }
    }
  }
      
  show() {
    circle(this.x, this.y, this.size, this.size);
  }
}