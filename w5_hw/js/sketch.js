console.log('ml5 version:', ml5.version);

let bodypix;
let cam;
let segmentation;

const options = {
  outputStride: 8, // 8, 16, or 32, default is 16
  segmentationThreshold: 0.3, // 0 - 1, defaults to 0.5
}

function setup() {
  createCanvas( 640, 480 );

  cam = createCapture(cam);
  cam.size(640, 480);

  bodypix = ml5.bodyPix(cam, modelReady);
}

function draw() {
  background(0);
  fill(255);
  text("MOVE TO EXPLORE YOUR BRAIN",220, 30);

  if (segmentation !== undefined) {
    let w = segmentation.raw.width;
    let h = segmentation.raw.height;
    let data = segmentation.raw.data;

    let gridSize = 20;
    noStroke();
    for (let y = 0; y < h; y+=gridSize) {
      for (let x = 0; x < w; x+=gridSize) {
        let index = x + y*w;
        let mappedX = map(x, 0, w, 0, width);
        let mappedY = map(y, 0, h, 0, height);

        if ( data[index] >= 0 ) {
          let colorIndex = data[index];
          fill(random(255), random(0), random(255));
          rect(mappedX, mappedY, 10, 10);
        }

        //for Left Brain
        if ( data[index] == 1 ) {
          if (x <= 180) {
            fill(255,0,0);
            rect(mappedX, mappedY, 20, 20);
            fill(255);
            text( "Logic", x, y);
            text( "Squencing", x+10, y+10);
            text( "Linear Thinking", x-10, y+20);
            text( "Mathematics", x+10, y-30);
            text( "Facts", x-10, y-10);
            text( "Balance", x-20, y-20);
          }
        }
        if ( data[index] == 0 ) {
          if (x >= 460) {
            fill(0,0,255);
            rect(mappedX, mappedY, 20, 20);
            fill(255);
            text( "Imagination", x, y);
            text( "Arts", x+10, y+10);
            text( "Creative", x-10, y+20);
            text( "Rhythm", x+10, y-30);
            text( "Intuition", x-10, y-10);
            text( "Daydreaming", x-20, y-20);
          }
        }
      }
    }
  }
}

function modelReady() {
  console.log('Model Ready!');
  bodypix.segmentWithParts(gotResults, options);
}

function gotResults(error, result) {
  if (error) {
    console.log(error);
    return;
  }
  segmentation = result;
  bodypix.segmentWithParts(gotResults, options);
}
