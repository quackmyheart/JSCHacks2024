let debris_on_screen = [];
let debris_type = ["metal", "plastic", "glass", "coolant"]; 
let debris_colour = [[128, 128, 128], [255, 192, 203], [0, 0, 255], [255, 255, 255]]; 

function setup() {
  createCanvas(800, 600);
}


class Sat {
  constructor() {
    this.num = 0; 
  }
  
  display(){
    fill(color(255, 0, 255));
    square(30, 20, 55, 20)
  }
}
satellite = new Sat(); 



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



class Debris {
  constructor(x, y) {
    // this.pos = createVector(x, y);
    this.num = Math.floor(Math.random() * debris_type.length); 
    this.x = x; 
    this.y = y; 
    this.material = debris_type[this.num]; 
    this.color_for_now = debris_colour[this.num];
    // this.size = 
    // this.position = 
  }
  
  getMaterial(){
    return this.material; 
  }
  
  display() {
    fill(color(this.color_for_now[0], this.color_for_now[1], this.color_for_now[2]));
    noStroke();
    ellipse(this.x, this.y, 20);
  }
} 

function mousePressed() {
  // Add new planet on click
  debris_on_screen.push(new Debris(mouseX, mouseY));
  console.log(debris_on_screen);
  // display materials 
  for (let debris of debris_on_screen) {
    console.log(debris.getMaterial());
  }
}
