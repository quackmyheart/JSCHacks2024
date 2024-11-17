let debris_on_screen = [];
let debris_type = ["metal", "plastic", "glass", "coolant"];
let satelliteImg;
let debrisImages = [];

let debris_height = [];
let height_Debris_valuepair = new Map();

let satellite;
let targetDebris = null;
let moveButton;
let isMoving = false;

function preload() {
  satelliteImg = loadImage('sat.png');
  debrisImages = [
    loadImage('sat.png'),
    loadImage('sat.png'),
    loadImage('sat.png'),
    loadImage('sat.png')
  ];
}

class Sat {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 2;
    this.size = 55; // Adjust this to match your image size
  }
  
  display() {
    image(satelliteImg, this.x, this.y, this.size, this.size);
  }

  moveTowards(target) {
    if (target) {
      let angle = atan2(target.y - this.y, target.x - this.x);
      this.x += cos(angle) * this.speed;
      this.y += sin(angle) * this.speed;
    }
  }
}

class Debris {
  constructor(x, y) {
    this.num = Math.floor(Math.random() * debris_type.length);
    this.x = x;
    this.y = y;
    this.material = debris_type[this.num];
    this.size = random(30, 70); // Adjust size range as needed
  }
  
  getMaterialNum() {
    return this.num;
  }
  
  getSize() {
    return this.size;
  }
  
  getX() {
    return this.x;
  }
  
  getY() {
    return this.y;
  }
  
  getMaterial() {
    return this.material;
  }
  
  display() {
    image(debrisImages[this.num], this.x, this.y, this.size, this.size);
  }

  isMetal() {
    return this.material === "metal";
  }
}

function setup() {
  createCanvas(800, 600, P2D);
  
  satellite = new Sat(30, 300);
  
  makeRandomNumberOfDebris();
  
  let sensorButton = createButton('Use sensor in satellite');
  sensorButton.position(10, height + 10);
  sensorButton.mousePressed(useSensor);
  
  moveButton = createButton('Move to closest metal debris');
  moveButton.position(200, height + 10);
  moveButton.mousePressed(startMoving);
}

function draw() {
  background(0);
  
  // Draw stars
  for (let i = 0; i < 100; i++) {
    stroke(255);
    point(random(width), random(height));
  }
  
  imageMode(CENTER);
  
  for (let debris of debris_on_screen) {
    debris.display();
  }
  
  satellite.display();
  
  if (isMoving && targetDebris) {
    satellite.moveTowards(targetDebris);
  }
}

function makeRandomNumberOfDebris() {
  let number_of_debris = 4;
  for (let i = 0; i < number_of_debris; i++) {
    debris_on_screen.push(new Debris(random(width - 300) + 150, random(height - 100) + 50));
  }
}

function startMoving() {
  if (!isMoving) {
    isMoving = true;
    targetDebris = findClosestMetalDebris();
    moveButton.html('Stop moving');
  } else {
    isMoving = false;
    targetDebris = null;
    moveButton.html('Move to closest metal debris');
  }
}

function findClosestMetalDebris() {
  let closestDebris = null;
  let closestDistance = Infinity;
  
  for (let debris of debris_on_screen) {
    if (debris.isMetal()) {
      let distance = dist(satellite.x, satellite.y, debris.x, debris.y);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestDebris = debris;
      }
    }
  }
  
  return closestDebris;
}

function sketch1(p) {
  let planet_draw = [];
  for (let num of debris_height) {
    let debris_curr = (height_Debris_valuepair.get(num))[0];
    let scaled_size = debris_curr.getSize() * ((800 - debris_curr.getX()) / 800);
    let info = [Math.floor(scaled_size), Math.floor(random(200 - 50) + 25), num, debris_curr.getMaterialNum()];
    planet_draw.push(info);
  }
  
  p.setup = function () {
    p.createCanvas(600, 200);
    p.background(1);
  };  
  
  p.draw = function () {
    for (let thing of planet_draw) {
      p.image(debrisImages[thing[3]], thing[2], thing[1], thing[0], thing[0]);
    }
  }
}

function distanceBetweenPoints(x1, y1, x2, y2) {
  return Math.floor(Math.sqrt((Math.pow(x1 - x2, 2)) + (Math.pow(y1 - y2, 2))));
}

function useSensor() {
  debris_height = [];
  height_Debris_valuepair.clear();
  
  for (let debris of debris_on_screen) {
    let num_height = Math.floor(debris.getY());
    debris_height.push(num_height);
    height_Debris_valuepair.set(num_height, [debris, Math.floor(debris.getX())]);
  }
  debris_height.sort((a, b) => a - b);
  
  // Run first p5 instance
  new p5(sketch1);
}
