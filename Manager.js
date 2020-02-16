let entityArray = [];
var chosenOne;
function setup() 
{
  rectMode(CENTER)
  createCanvas(windowWidth, windowHeight);
  side = 20
  numLine = 10; // number of entities in a straight line of vision that an entity can see
  R = side*numLine; // Radius of vision
  counter = 0; // this is just so that each entity knows its own index

  // entityArray init
  for (let row = 0; row < windowWidth; row+=side) 
  {
    for (let col = 0; col < windowHeight; col+=side){
    entityArray.push(new Entity(row,col,side,R,counter));
    counter++;
    }
  }

  // See how many entities we got
  console.log(entityArray.length)

  // Make each entity see
  entityArray.forEach(element => element.see(entityArray));

  // Test the see result for one entity (the chosen one)
  chosenOne = entityArray[Math.round(Math.random(0,1)*(entityArray.length-1))];
  colorWhoAsees(chosenOne,R,entityArray);
  console.log(chosenOne.influencers)
 
}

function draw() {
  background(255);
  
  // Color all of them
  //entityArray.forEach(element => element.show());
  
  //Just color who the chosen one sees
  colorWhoAsees(chosenOne,R,entityArray);
  
}

class Entity 
  {
  constructor(x=20,y=20,side=20,R=200,index=0)
    {
    this.x = x;
    this.y = y;
    this.side = side;
    this.index = index;
    this.state = 0;
    this.subjectiveQuality = Math.random(0, 1);
    this.influencers = [];
    this.visualRadius = R;
    }
  
    show(){
      square(this.x, this.y, this.side)
      fill(255*this.judge());
    }

    // maybe create a method to determine the color (or the degree of excitation of the entity)

    judge(){
      this.state = this.subjectiveQuality*1 //include factors
      return this.state;
    }

    see(array)
    {//we should stop it from seeing itself, maybe in the doesAseeB function put that substraction cannot be 0?, though it would be best for each entity to know it own index
      for (var i = 0; i<array.length;i++)
      {
        if(doesAseeB(this.x,this.y,array[i].x,array[i].y,this.visualRadius))
        {
          this.influencers.push(i);
        }  
      }
    }
  
  }  


  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

  function doesAseeB(A,B,R){
    // this can be easily modified to a hearing field , just delete the inFront condition
    notFar = Math.pow(B.x-A.x,2)+Math.pow(B.y-A.y,2) <= Math.pow(R,2); // radius condition, we could ignore if we want them to see all in front of them
    inFront = B.y <= A.y; // all in front of them or in the same line
    notSame = A.index != B.index;
    if (notFar && inFront && notSame)
    {
      return true;
    }
    else 
    {
      return false;
    }

  }

  function colorWhoAsees(A,R,array){

    for (var i = 0; i<array.length;i++)
    {
      if(doesAseeB(A,array[i],R))
      {
        array[i].show();
      }  
    }
  }