// NightMask class
class NightMask {
  constructor(xPos, yPos, radius, sunRange) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = radius;
    this.gradientValue = 0.5;
    this.sunRange = sunRange
    this.space = 3;
    this.R = 20;
    this.G = 30;
    this.B = 50;
  }
  display() {
    noFill();
    strokeWeight(this.space);
    for (let i = 0; i < this.radius / this.space; i++) {
      let r = sunRange + this.space * i;
      let alpha = min(this.gradientValue * i, 200); // Limit a to 255
      stroke(this.R, this.G, this.B, alpha);
      ellipse(this.xPos, this.yPos, r * 2, r);
    }
  }
}

// Function to create fireworks
function createFirework(x, y, size) {
    for (let i = 0; i < 10 + 15 * size; i++) {
      vel = p5.Vector.random2D() // Create a random 2D vector
      vel.mult(random(1, 3 * size))
      particles.push(new Particle(x, y, vel))
    }
  }
  
  // Class for individual particles in the fireworks 
  class Particle {
    constructor(x, y, vel) {
      this.pos = createVector(x, y)
      this.vel = vel
      this.trans = 255 // Initial transparency
      this.m = random(2, 5) // Affecting transparency change speed
      this.r = random(200, 255)
      this.g = random(200, 255)
      this.b = random(150, 200)
    }
    show() {
      noStroke()
      fill(this.r, this.g, this.b, this.trans)
      ellipse(this.pos.x, this.pos.y, 10)
    }
    update() {
      this.pos.add(this.vel)
      this.vel.mult(0.95)// Simulate air resistance
      this.vel.y += 0.15// Simulate gravity
      this.trans -= this.m// Gradually reduce transparency
    }
  }
  