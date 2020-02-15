function setup() {
  // Create the canvas
  createCanvas(720, 400);
  background(200);

  // Set colors
  fill1(204, 101, 192, 127);
  fill2(208, 101, 192, 127);
  stroke(127, 63, 120);

 

  // A design for a simple flower
  translate(580, 200);
  noStroke();
  for (let i = 0; i < 10; i ++) {
    rect(0, 30, 20, 80);
    rotate(5);
  }
}