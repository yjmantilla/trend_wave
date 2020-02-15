function setup() {
  // Create the canvas
  createCanvas(720, 400);
  background(200);

  // Set colors
  fill(204, 101, 192, 127);
  stroke(127, 63, 120);

  // A rectangle
  rect(40, 120, 120, 40);

  // A design for a simple flower
  translate(580, 200);
  noStroke();
  for (let i = 0; i < 10; i ++) {
    rect(80, 2*(1+1), 20, 20);
  }
}