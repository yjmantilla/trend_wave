side = 20;

function setup(){
    createCanvas(windowWidth, windowHeight);

}


function draw() {
    background(51);

    for (var i = 0; i < windowHeight; i += side)
    {
        square(0, 20, side);

    }
    
  }


  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

