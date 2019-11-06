var stars = [];
var clicks = [];
let gray = 255;

function setup() {
  createCanvas(600, 600);

  for (var i = 0; i < 60; i++) {
    stars[i] = new Star();
  }
  
  for (var i = 0; i < 60; i++) {
    clicks[i] = new click();
  }
  
}

function draw() {
  background(gray);

  for (var i = 0; i < stars.length; i++) {
    stars[i].draw();
  }
  for (var i = 0; i < clicks.length; i++) {
    clicks[i].drawStar();
  }
  
}

function mouseClicked() {
  // if (gray = 0 && gray < 255){
    gray -= 20;
  //}
}

// star class //
class Star {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(0.25, 3);
    this.t = random(TAU); //TAU = TWO_PI
  }

  draw() {
    this.t += 0.1;
    //sin() Values are returned in the range -1 to 1
    var scale = this.size + sin(this.t) * 2;
    noStroke();
    fill(255);
    ellipse(this.x, this.y, scale, scale);
  }
}

class click{
  
  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.angle = TWO_PI / 5;
    this.halfAngle = this.angle / 2.0;
    this.size = random(0.25, 0.5);
    this.t = random(TAU);
  }
  
  drawStar() {
    this.t += 0.1;
    //sin() Values are returned in the range -1 to 1
    var scale1 = this.size + sin(this.t) * 0.5;
    
    translate(this.x, this.y);
    rotate(frameCount * 0.01);
    scale(scale1);
    fill(255,255,0);
    
    beginShape();
    for (let a = 0; a < TWO_PI; a += this.angle) {
      let sx = 0 + cos(a) * 20;
      let sy = 0 + sin(a) * 20;
      vertex(sx, sy);
      sx = 0 + cos(a + this.halfAngle) * 10;
      sy = 0 + sin(a + this.halfAngle) * 10;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
}