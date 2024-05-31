//This class creates a wave-like texture that has a gradient of 4 colour.
class GradientWave {
  constructor(xPos, yPos, w, h, amplitude, yPercent1, yPercent2, color0, color1, color2, color3) {
    // Set the X, Y position
    this.xPos = xPos; 
    this.yPos = yPos;
    // Width and height of the gradient background
    this.w = w; 
    this.h = h;
    // Four main colors, creating three gradient sections
    this.color0 = color0;
    this.color1 = color1;
    this.color2 = color2;
    this.color3 = color3;
    // Set the percentages that divide the gradient sections and calculate their base lines
    this.yPercent1 = yPercent1;
    this.yPercent2 = yPercent2;
    this.yBase1 = this.yPercent1 * this.h;
    this.yBase2 = this.yPercent2 * this.h;
    // Parameters for the wave effect using Perlin noise
    this.amplitude = amplitude;
    this.frequency = 0.01;
    this.offset1 = random(100);
    this.offset2 = random(100);
    this.offset3 = random(100);
    this.offset4 = random(100);
    this.offset5 = random(100);
    this.offset6 = random(100);
  }

  //the display function draw the texture
  display() {
    push();
    noStroke()
    translate(this.xPos, this.yPos);
    let nx1 = this.offset1;
    let nx2 = this.offset2;
    // Draw the background from left to right
    for (let x = -10; x <= this.w; x += 20) {
      let n1 = map(noise(nx1), 0, 1, -1, 1);
      let n2 = map(noise(nx2), 0, 1, -1, 1);
      // Add noise to the base lines to create a wave effect
      let waveHeight1 = this.yBase1 + this.amplitude * n1;
      let waveHeight2 = this.yBase2 + this.amplitude * n2;
      // Calculate the height of each section
      let gap1 = waveHeight1;
      let gap2 = waveHeight2 - waveHeight1;
      let gap3 = this.h - waveHeight2;
      // Draw the first gradient section
      for (let y = 0; y < gap1; y += 15) {
        let inter = map(y, 0, gap1, 0, 1);
        let interColor = lerpColor(this.color0, this.color1, inter);
        fill(interColor);
        circle(x, y ,100); 
      }
      // Draw the second gradient section
      for (let y = 0; y < gap2; y += 15) {
        let inter = map(y, 0, gap2, 0, 1);
        let interColor = lerpColor(this.color1, this.color2, inter);
        fill(interColor);
        circle(x , waveHeight1 + y , 100); 
      }
      // Draw the third gradient section
      for (let y = 0; y < gap3; y += 15) {
        let inter = map(y, 0, gap3, 0, 1);
        let interColor = lerpColor(this.color2, this.color3, inter);
        fill(interColor);
        circle(x , waveHeight2 + y , 100); 
      }
      nx1 += this.frequency;
      nx2 += this.frequency;
    }
    this.offset1 += 0.05;
    this.offset2 += 0.05;
    pop();
  }
}


