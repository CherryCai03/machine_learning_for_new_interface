let video;
let poseNet;
let leftwristX = 0;
let leftwristY = 0;
let rightwristX = 0;
let rightwristY = 0;
let snow = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', yourPoses);

  for (let i = 0; i < 300; i++) {
    let x = random(width);
    let y = random(height);
    snow.push(new snowFlakes(x, y));
  }
}

function modelReady() {
  console.log('model ready');
}

function yourPoses(poses) {
  //console.log(leftwristX, leftwristY);

  //for the position of  the leftwrist
  if (poses.length > 0) {
    let newlwX = poses[0].pose.keypoints[9].position.x;
    let newlwY = poses[0].pose.keypoints[9].position.y;
    leftwristX = lerp(leftwristX, newlwX, 0.5);
    leftwristY = lerp(leftwristY, newlwY, 0.5);
  }

  //for the position of the rightwrist
  if (poses.length > 0) {
    let newrwX = poses[0].pose.keypoints[10].position.x;
    let newrwY = poses[0].pose.keypoints[10].position.y;
    rightwristX = lerp(rightwristX, newrwX, 0.5);
    rightwristY = lerp(rightwristY, newrwY, 0.5);
  }
}

function draw() {
  //image(video, 0, 0);

  // fill(255, 0, 0);
  // ellipse(leftwristX, leftwristY, 20);
  //
  // fill(255, 0, 0);
  // ellipse(rightwristX, rightwristY, 20);

  background(0); // clear

  //the snow will move following the rightwrist position
  let windX = map(rightwristX, 0, width, -0.7, 0.7);
  let wind = createVector(windX, 0);

  //the gravity pointing down
  let force = createVector(0, 0.5);

  for (let i = 0; i < snow.length; i++) {
    let flake = snow[i];
    flake.Force(wind);
    flake.Force(force);
    flake.update();
    flake.display();
  }

}

//more small size snow
function getRandomSize() {
  let r = pow(random(0, 1), 5);//minimum size 0
  return constrain(r * 15, 2, 10);//
}

// class for snowFlakes
class snowFlakes {
  constructor(sx, sy) {
    let x = sx || random(width);
    let y = sy || random(-100, -10);
    this.pos = createVector(x, y); //position
    this.vel = createVector(0,0); //velocity
    this.acc = createVector(); //acceleration
    this.r = getRandomSize();
    this.R = random(255);
    this.G = random(255);
    this.B = random(255);
    this.isDone = false;
  }

  //add force to the acc
  //make the bigger one fall more faster than smaller one
  Force(force) {
    let f = force.copy();
    f.mult(this.r);
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.r * 0.07);//limit the size associat with speed
    this.pos.add(this.vel);
    this.acc.mult(0);
    if (this.pos.y > height + this.r) {
      this.randomize();
    }
  }

  //when they get to the bottom, use your rightwrist to add them into the canvas
  randomize() {
    let x = random(width);
    let y = random(-100, -10);
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0); //velocity
    this.acc = createVector(); //acceleration
    this.r = getRandomSize(); //size of the snow
  }

  display() {
    stroke('#a3c5ff');
    strokeWeight(this.r);
    point(this.pos.x, this.pos.y);
  }
}
