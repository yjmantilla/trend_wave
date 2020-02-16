let entityArray = [];
function setup() 
{
  rectMode('CENTER')
  createCanvas(windowWidth, windowHeight);
  side = 20
  for (let row = 0; row < windowWidth; row+=side) 
  {
    for (let col = 0; col < windowHeight; col+=side)
    entityArray.push(new Entity(row,col,side));
  }
}

function draw() {
  background(100);
  
 entityArray.forEach(element => element.show())
  
  
}

class Entity 
  {
  constructor(x=20,y=20,side=20)
    {
    this.x = x;
    this.y = y;
    this.side = side;
    this.state = 0;
    this.subjectiveQuality = random(0, 1);  
    }
  
    show(){
      square(this.x, this.y, this.side)
      fill(255*this.judge());
    }

    // maybe create a method to determine the color (or the degree of excitation of the entity)

    judge(){
      this.state = this.subjectiveQuality*1 //include factors
      return this.state
    }
  
  }  


  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }