class Seagull {
  constructor(x, y, width,height, size, color) {
    this.x = x;
    this.y = y;
    this.pivotX = x;
    this.pivotY = y;
    this.width = width;
    this.height = height;
    this.size = size;
    this.color = color;
    this.wingAngle = 0;
    this.wingSpeed = 0.1;
    this.noiseOffsetX = random(1000); // Offset for Perlin noise in x direction
    this.noiseOffsetY = random(1000); // Offset for Perlin noise in y direction
  }

  display() {
    push();
    translate(this.x, this.y);
    stroke(this.color);
    noFill();
    strokeWeight(2);
    scale(this.size);
    
    // Draw left wing
    beginShape();
    vertex(-20, 0);
    vertex(-10, -10);
    vertex(0, 0);
    endShape();
    
    // Draw right wing
    beginShape();
    vertex(0, 0);
    vertex(10, -10);
    vertex(20, 0);
    endShape();
    
    pop();

    // Update wing angle for next frame
    this.wingAngle += this.wingSpeed;
  }

  move() {
    // Update position using Perlin noise
    this.x = this.pivotX + noise(this.noiseOffsetX) * this.width;
    this.y = this.pivotY + noise(this.noiseOffsetY) * this.height;

    // Increment noise offsets for next frame (slower speed)
    this.noiseOffsetX += 0.005;
    this.noiseOffsetY += 0.005;
  }
}
