let debris_on_screen = [];
let debris_type = ["metal", "plastic", "glass", "coolant"]; 
let debris_colour = [[128, 128, 128], [255, 192, 203], [0, 0, 255], [255, 255, 255]]; 

let debris_height = []; 
let height_Debris_valuepair = new Map();

class Sat {
  constructor() {
    this.num = 0; 
  }
  
  display(){
    fill(color(255, 0, 255));
    square(30, height / 2 - 30, 55, 20)
  }
}

class Debris {
  constructor(x, y) {
    // this.pos = createVector(x, y);
    this.num = Math.floor(Math.random() * debris_type.length); 
    this.x = x; 
    this.y = y; 
    this.material = debris_type[this.num]; 
    this.color_for_now = debris_colour[this.num];
    this.size = random(10, 50); 
    // this.size = 
    // this.position = 
  }
  
  getX() {
    return this.x; 
  }
  
  getY() {
    return this.y; 
  }
  
  getMaterial(){
    return this.material; 
  }
  
  display() {
    fill(color(this.color_for_now[0], this.color_for_now[1], this.color_for_now[2]));
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
} 

/*
function mousePressed() {
  // Add new planet on click
  debris_on_screen.push(new Debris(mouseX, mouseY));
  console.log(debris_on_screen);
  // display materials 
  for (let debris of debris_on_screen) {
    console.log(debris.getMaterial());
  }
}
*/ 


function draw() {
  background(0);
  
  // Draw stars
  for (let i = 0; i < 100; i++) {
    stroke(255);
    point(random(width), random(height));
  }
  
  for (let debris of debris_on_screen) {
    debris.display();
  }
  
  satellite.display(); 
}

function makeRandomNumberOfDebris() {
  // randomly generate some debris of different sizes 
  let max = 10; 
  let min = 3; 
  //let number_of_debris = Math.floor(Math.random() * (max - min + 1)) + min; 
  // testing with constant number for now 
  let number_of_debris = 4; 
  for (i = 0; i < number_of_debris; i++){
    debris_on_screen.push(new Debris(random(width - 300) + 150, random(height - 100) + 50));
  }
}

function setup() {
  createCanvas(800, 600);
  
  // create initial debris 
  makeRandomNumberOfDebris(); 
  
  let button = createButton('use sensor in satellite');
  button.mousePressed(useSensor);
  
  satellite = new Sat(); 
}

function sketch1(p) {
  p.setup = function () {
    p.createCanvas(500, 200);
    p.background(1);
  }; 
}


// generates an image with the sensor 
function useSensor() {
  
  // organize Debris objects with respect to height 
  // make a sorted array of heights + dictionary 
  for (let debris of debris_on_screen){
    let num_width = Math.floor(debris.getX()); 
    let num_height = Math.floor(debris.getY()); 
    debris_height.push(num_height); 
    height_Debris_valuepair.set(num_height, [debris, num_width]); 
  }
  debris_height.sort((a, b) => a - b);
  
  console.log(debris_height); 
  for (const [key, value] of  height_Debris_valuepair) {
    console.log(`${key} goes ${value}`);
  }
  
  // Run first p5 instance
  space_image = new p5(sketch1);
}


