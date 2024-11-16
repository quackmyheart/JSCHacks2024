let debris_on_screen = [];
let debris_type = ["metal", "plastic", "glass", "coolant"]; 


function setup() {
  createCanvas(800, 600);
}

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
}

class Debris {
  constructor(x, y) {
    // this.pos = createVector(x, y);
    this.x = x; 
    this.y = y; 
    this.material = debris_type[Math.floor(Math.random() * debris_type.length)]; 
    this.color_for_now = ;
    // this.size = 
    // this.position = 
  }
  
  getMaterial(){
    return this.material; 
  }
  
  display() {
    fill(color(100,100, 0));
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
