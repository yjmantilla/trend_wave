let entityArray;
var chosenOne;
let R;
var counter;
var standingThreshold = 0.8;
var standing = [];
var quality = Math.random(0,1);

function setup() 
{
  frameRate(5);
  entityArray = [];
  rectMode(CENTER)
  createCanvas(windowWidth, windowHeight);
  numEntities = 1000; //approximately how many entities will there be
  side = Math.floor(Math.sqrt(windowWidth*windowHeight/numEntities));
  numLine = 10; // number of entities in a straight line of vision that an entity can see
  R = side*numLine; // Radius of vision
  counter = 0; // this is just so that each entity knows its own index

  // entityArray init
  for (let row = 0; row < windowWidth; row+=side) 
  {
    for (let col = 0; col < windowHeight; col+=side){
    entityArray.push(new Entity(row,col,side,R,counter,quality));
    counter++;
    }
  }
  // See how many entities we got
  console.log(entityArray.length)

  // Get influencers for each entity
  entityArray.forEach(element => element.getInfluencers(entityArray));

  // Test the see result for one entity (the chosen one)
  chosenOne = entityArray[Math.round(Math.random(0,1)*(entityArray.length-1))]; // Do notice that in case that this produce an invalid index just use the floor function
  console.log(chosenOne.influencers)
 
}

function draw() {
  background(0);

  
  // Color all of them
  //entityArray.forEach(element => element.show());
  entityArray.forEach(element => element.see(entityArray,standingThreshold,entityArray.length));
  entityArray.forEach(element => element.judge(standingThreshold));
  standing = getStanding(entityArray,standingThreshold);
  showSubset(entityArray,standing)
  //Just color who the chosen one sees
  //showSubset(entityArray,chosenOne.influencers)
  //showAll(entityArray)
}

class Entity 
  {
  constructor(x=20,y=20,side=20,R=200,index=0,offset_quality = 0.5)
    {
    this.x = x;
    this.y = y;
    this.side = side;
    this.index = index;
    this.state = 0;
    this.subjectiveQuality = offset_quality + Math.random(0, 1);
    this.influencers = [];
    this.visualRadius = R;
    this.influenceability = Math.random(0,1);
    this.saw = 0;
    this.bored = 0;
    }
  
    show(){
      square(this.x, this.y, this.side)
      fill(255)//*this.state);
    }

    // maybe create a method to determine the color (or the degree of excitation of the entity)

    judge(standingThreshold=0.9,boringRate=0.001){
      this.state = this.subjectiveQuality*1 + this.saw - this.bored//include factors
      
      if(this.state >= standingThreshold)
      {
      this.bored = this.bored + boringRate;
      }
      if(this.bored >= 1){ this.bored = 0;} //this.state < standingThreshold
      return this.state;
    }


    getInfluencers(array)
    {//we should stop it from seeing itself, maybe in the doesAseeB function put that substraction cannot be 0?, though it would be best for each entity to know it own index
      for (var i = 0; i<array.length;i++)
      {
        if(doesAseeB(this,array[i],this.visualRadius))
        {
          this.influencers.push(i);
        }  
      }
    }

    see(array,standingThreshold,total_entities)
    {
      let accum = 0;
      for (var i = 0; i<this.influencers.length;i++)
      {
        if (array[this.influencers[i]].saw > standingThreshold)
        {
          accum = accum + 1;
        }
      }
      this.saw = accum/total_entities;
      return this.saw;
    }
  }


  function windowResized() {
    //resizeCanvas(windowWidth, windowHeight);
    setup();
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

  function getStanding(array,standingThreshold)
  {
    standing = [];
    for (var i = 0; i<array.length;i++)
    {
      if(array[i].state >= standingThreshold)
      {
        standing.push(i);
      }
    }
    return standing;
  }


  function showSubset(array,subset){
    subset.forEach(index => array[index].show());
  }

  function showAll(array){
    subset = range(0,array.length,1);
    showSubset(array,subset);
  }

  function range(start, stop, step) {
  // from https://stackoverflow.com/questions/8273047/javascript-function-similar-to-python-range
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
};