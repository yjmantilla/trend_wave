function draw() {
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
    rect(3*(i+10), 2*(i+10), 20, 20);
  }
}