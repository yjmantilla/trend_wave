
function setup(){
    createCanvas(windowWidth, windowHeight);
}
function draw() {
    background(51);
    side = 20;
    for (var i = 0; i < 2*windowHeight; i += side)
    {
    for (var j = 0; j < 2*windowWidth; j += side)
        {
            square(0+i, 0+j, side/2);
        }
    }
  }


  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

