let gradientSky;
let gradientSea;
let purpleWaves = [];
let whiteWaves = [];
let sparks = []
let illuminatedBuildings = [];
let waveR
let waveG
let waveB

//Set up.
function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight, WEBGL);
  //Create water.
  water = new Water(60, 90);
  //Create seagulls.
  seagull1 = new Seagull(-100, -300, 300, 100, 1, color(10));  // Bigger, dark-colored seagull
  seagull2 = new Seagull(-100, -100, 200, 100, 0.7, color(100)); // Smaller, lighter-colored seagull
  seagull3 = new Seagull(-600, -200, 200, 100, 0.5, color(30)); // Smallest, dark-colored seagull
  //Create gradient background.
  let color0 = color(20, 40, 120, 100); // Navy
  let color1 = color(100, 150, 150, 100); // Green
  let color2 = color(220, 180, 40, 100); // Yellow
  let color3 = color(160, 80, 50, 100); // Red
  gradientSky = new GradientWave(-windowWidth / 2, -windowHeight / 2, windowWidth + 200, windowHeight / 2 + 120, 50, 0.25, 0.5, color0, color1, color2, color3);
  gradientSea = new GradientWave(-windowWidth / 2, 150, windowWidth + 200, windowHeight / 2 + 120, 20, 0.1, 0.4, color3, color2, color1, color0);
  //Create buildinga and background building shadow.
  backgroundShadow = new BackgroundShadow(400, -120, 122);
  building = new Building(0, 120, 0, 0, 0);
  //Create purple and white water waves.
  for (let i = 0; i < 25; i++) {
    purpleWaves.push(new WaveBrush(0, 200, width / 2, 200));
  }
  for (let i = 0; i < 10; i++) {
    whiteWaves.push(new WaveBrush(-150, 120, width / 4, 120));
  }
  //  let colorPurple = color(70, 80, 180)
  // let colorWhite = color(200, 200, 200)


}

//Draw
function draw() {
  background("#FFFFFF")
  //Draw gradient background.
  gradientSky.display();
  gradientSea.display();
  //Draw the building and its reflection.
  building.display();
  building.reflection(20, 20, 20, 120);
  backgroundShadow.display();
  //Draw water.
  water.displayPerlinNoise();
  //Draw purple and white water waves.

  //  let colorPurple = color(70, 80, 180)
  // let colorWhite = color(200, 200, 200)
  for (let purpleWave of purpleWaves) {
    purpleWave.edges();
    purpleWave.flock(purpleWaves, 1, 0, 1);
    purpleWave.update(2, 1, waveR, waveG, waveB);
    purpleWave.display();
  }
  for (let whiteWave of whiteWaves) {
    whiteWave.edges();
    whiteWave.flock(whiteWaves, 1, 0, 1);
    whiteWave.update(1, 1, 180, 180, 220);
    whiteWave.display();
  }

  //Loop between day and night in 12-second intervals.
  let currentFrame = frameCount % (12 * 60);
  //The first 3 seconds of every interval.
  if (currentFrame < 3 * 60) {
    //Decrease the brightness area of NightMask.    
    sunRange = map(currentFrame, 0, 3 * 60, width / 2, 200)
    //Decrease the seagulls' opacity from 255 to 0.
    seagullAlpha = map(currentFrame, 0, 3 * 60, 300, 0)
    //The 3~9 seconds of every interval.
  } else if ((currentFrame < 9 * 60)) {
    sunRange = 200
    //The last 3 seconds of every interval.
  } else {
    //Increase the brightness area of NightMask
    sunRange = map(currentFrame, 9 * 60, 12 * 60, 200, width / 2)
    //Increase the seagulls' opacity from 0 to 255.
    seagullAlpha = map(currentFrame, 9 * 60, 12 * 60, 0, 300)
  }
  //Draw the nightMask.
  let nightMask = new NightMask(-310, 100, width * 2, sunRange);
  nightMask.display();
  //Draw the seagulls.
  seagull1.move();
  seagull2.move();
  seagull3.move();
  seagull1.display(seagullAlpha);
  seagull2.display(seagullAlpha)
  seagull3.display(seagullAlpha)

  //Draw initial building.
  building.display();

  //During nighttime,there will be:
  //1- Fireworks
  //2- Illuminated buildings
  //3- lighted building's windows
  //4- Yellow wave
  if (currentFrame > 4 * 60 && currentFrame < 8 * 60) {
    //Create random fireworks at random time.
    let fireworkX = random(-width / 3, width / 3)
    let fireworkY = random(-height / 2, -height / 5)
    let fireworkSize = random(1.5, 3)
    if (frameCount % 50 == 0 || frameCount % 140 == 0) {
      createFirework(fireworkX, fireworkY, fireworkSize)
      //Create building illumination effects on the left or right side, 
      //based on the firework position and the centerline of the building.
      if (fireworkX < -310) {
        illuminatedBuildings.push(new Building(-10, 115, 230, 230, 200))
      }
      else {
        illuminatedBuildings.push(new Building(10, 115, 230, 230, 200))
      }
    }
    //Draw the illumination effects of the building.
    for (let illuminatedBuilding of illuminatedBuildings) {
      illuminatedBuilding.display();
      illuminatedBuilding.illuminate();
      // Light up the building
      building.display();
      building.lightup()

    }
    //Change wave color to yellow.
    waveR = 200
    waveG = 170
    waveB = 130
  }
  else {
    //Change wave color back to purple.
    waveR = 100
    waveG = 100
    waveB = 170
  }
  // Draw the Fireworks
  for (let spark of sparks) {
    spark.show()
    spark.update()
  }
}

function windowResized() {
  print("resized")
  resizeCanvas(windowWidth, windowHeight);
  //Make sure the background fill the window.
  let color0 = color(20, 40, 120, 100); // Navy
  let color1 = color(100, 150, 150, 100); // Green
  let color2 = color(220, 180, 40, 100); // Yellow
  let color3 = color(160, 80, 50, 100); // Red
  gradientSky = new GradientWave(-windowWidth / 2, -windowHeight / 2, windowWidth + 200, windowHeight / 2 + 120, 50, 0.25, 0.5, color0, color1, color2, color3);
  gradientSea = new GradientWave(-windowWidth / 2, 150, windowWidth + 200, windowHeight / 2 + 120, 20, 0.1, 0.4, color3, color2, color1, color0);
}

// Individual Work：
// NightMask class
class NightMask {
  constructor(xPos, yPos, radius, sunRange) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = radius;
    this.gradientValue = 0.4;
    this.sunRange = sunRange
    this.space = 3;
    this.R = 10;
    this.G = 20;
    this.B = 60;
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

// Fireworks 
function createFirework(x, y, size) {
  for (let i = 0; i < 10 + 15 * size; i++) {
    vel = p5.Vector.random2D()
    vel.mult(random(1, 3 * size))
    sparks.push(new Spark(x, y, vel))
  }
}

// Fireworks Class
class Spark {
  constructor(x, y, vel) {
    this.pos = createVector(x, y)
    this.vel = vel
    this.trans = 255
    this.m = random(2, 5)
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
    this.vel.mult(0.95)
    this.vel.y += 0.15
    this.trans -= this.m
  }
}
