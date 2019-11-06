function setup() {
  createCanvas(500, 500);
  rectMode(CENTER);
}

function draw() {
  background(240, 248, 255);

  var ex = 200 * noise(0.01 * frameCount);
  var rx = 60 * noise(0.01 * frameCount + 10);

  translate(width / 2, height / 2);
  rotate(0.005 * frameCount);
  noStroke();
  ellipse(0, 0, random(width));
  fill(245, 245, 245);
  ellipse(0, 0, 100, 100);
  for (var i = 0; i < 10; i++) {
    push();
    noStroke();
    rotate(TWO_PI * i / 10);
    translate(ex, 0);
    fill(230, 230, 250);
    ellipse(0, 0, 8, 300);
    fill(176, 196, 222);
    ellipse(0, 0, 150, 8);
    for (var j = 0; j < 5; j++) {
      push();
      rotate(TWO_PI * j / 5);
      fill(119, 136, 153);
      rect(rx, 0, 5, 10);
      pop();
    }
    translate();
    pop();
  }
}