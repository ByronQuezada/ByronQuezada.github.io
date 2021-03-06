// I got some ideas from tutorials and also look up some new funtions myself in the referece to make this work but mostly we cover all this funtions in class.

// Description: 
//if you mouseclick in any of the lines it will change position from  "\\" to this "//"..
// You will be able to make Prongs Illutions.
// and if you click "SPACE" or "ENTER" a new Illution lines will pop up.
// ⚠️⚠️⚠️ if you want to change your background you must mouseclick first or else it will stay the same.



var u;
var count;
var mods = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  u = 50;
  var highCount = (height/50)+3;
  var wideCount = (width/50)+3;
  count = int(highCount * wideCount);
  
  const newLocal = 0;
  var index = newLocal;
  for (var xc = 0; xc < wideCount; xc++) {
    for (var yc = 0; yc < highCount; yc++) {
      mods[index++] = new Module(int(xc)*u,int(yc)*u);
    }
   }
}

function draw() {
  //background(200);
  noStroke();
  for (var i = 0; i <= count; i++) {
    mods[i].draw2();
    mods[i].Over();
  }
}

function mousePressed() {
  for (var i = 0; i <= count; i++) {
    mods[i].Pressed();
  }
}

function keyTyped() {
  for (var i = 0; i <= count; i++) {
    mods[i].Typed();
  }
  
 if ( keyCode === ENTER ||
       keyCode === TAB ) {
    mods[i].Typed();
}
}

function Module(_x, _y) {
  this.x = _x;
  this.y = _y;
  this.a = 0;
  this.b = false;
  this.c = 200;
  this.isOverRectangle = false;
  this.k = 1;
  this.s = 25;
  this.r = 0;
  this.c1 = '#000000';
  this.c2 = '#FFFFFF';
}

     //extra for expert challenge ↓↓↓

Module.prototype.Pressed = function() {
    if (mouseX>(this.x)-(this.s) && mouseX<(this.x)+(this.s) && mouseY>(this.y)-(this.s) && mouseY<(this.y)+(this.s)){
      this.r = this.r+HALF_PI;
      //this.k = this.k+1;
      //if (this.k === 2) {
      //  this.k = 0;
      //}
    }
}

Module.prototype.Typed = function() {
    this.k = this.k+1;
      if (this.k === 3) {
        this.k = 0;
    }
    //if (mouseX>(this.x)-(this.s) && mouseX<(this.x)+(this.s) && mouseY>(this.y)-(this.s) && mouseY<(this.y)+(this.s)){
    //  this.r = this.r+HALF_PI;
    //}
}

Module.prototype.Over = function() {
  if (mouseX>(this.x)-(this.s) && mouseX<(this.x)+(this.s) && mouseY>(this.y)-(this.s) && mouseY<(this.y)+(this.s)){
    this.isOverRectangle = true;
  } else {
    this.isOverRectangle = false;
  }
}


Module.prototype.draw2 = function() {
  push();
  translate(this.x, this.y);
  rectMode(CENTER);
  rotate(this.r);
  if (this.k === 0){
    noStroke();
    fill(this.c1);
    rect(0,0,this.s*2,this.s*2);
    strokeWeight(2);
    stroke(this.c2);
    line(-this.s,-this.s,this.s,this.s);
  }
  if (this.k === 1){
    noStroke();
    fill(this.c1);
    rect(0,0,this.s*2,this.s*2);
    strokeWeight(2);
    stroke(this.c2);
    line(-this.s,-this.s,this.s,this.s);
    line(0,-this.s,this.s,0);
    line(-this.s,0,0,this.s);
  }
  if (this.k === 2){
    noStroke();
    fill(this.c1);
    rect(0,0,this.s*2,this.s*2);
    strokeWeight(2);
    stroke(this.c2);
    line(-this.s,-this.s,this.s,this.s);
    line(0,-this.s,this.s,0);
    line(-this.s,0,0,this.s);
    line(-this.s,this.s/2,-this.s/2,this.s);
    line(-this.s,-this.s/2,this.s/2,this.s);
    line(-this.s/2,-this.s,this.s,this.s/2);
    line(this.s/2,-this.s,this.s,-this.s/2);
  }

     //extra for expert challenge ↑↑↑  
  
  if(this.isOverRectangle === true)
  {
    fill('rgba(255, 255, 255, 0.2)');
  } else {
	  noFill(); 
  }
  rectMode(CENTER);
  noStroke();
  rect(0,0,this.s*2,this.s*2);
  
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}