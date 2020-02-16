 <reference path="/p5.global-mode.d.ts" />
let entityArray = [];

function setup() 
{
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) 
  {
    entityArray.push(new Entity());
  }
}

function draw() {
  background(100);
  
 entityArray.forEach(element => square(30, 20, 55))
  
  
}

class Entity 
  {
  constructor()
    {
    this.x = 20;
    this.y = 20;
    this.state =0;
    this.subjectiveQuality = random(0, 1);  
    }
  }  

 