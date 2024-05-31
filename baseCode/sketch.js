let gradientSky;
let gradientSea
const purpleWaves = [];
const whiteWaves = [];
let sparks = []
let illuminatedBuildings = [];

function windowResized() {
  print("resized")
  resizeCanvas(windowWidth, windowHeight);
  let skyXPos = -windowWidth / 2;
  let skyYPos = -windowHeight / 2;
  let skyWidth = windowWidth;
  let skyHeight = windowHeight / 2 + 120
  let amplitude1 = 50;
  let amplitude2 = 20;
  let yPercent1 = 0.25//0.6;
  let yPercent2 = 0.5//0.9;
  let yPercent3 = 0.1;
  let yPercent4 = 0.4;
  let color0 = color(20, 40, 120, 100); // Navy
  let color1 = color(100, 150, 150, 100); // Green
  let color2 = color(220, 180, 40, 100); // Yellow
  let color3 = color(160, 80, 50, 100); // Red
  for (let i = 0; i < 99; i++) {
    waves.push(new WaveBrush(0, 148, width / 2, 200));
  }
  gradientSky = new GradientWave(skyXPos, skyYPos, skyWidth + 200, skyHeight, amplitude1, yPercent1, yPercent2, color0, color1, color2, color3);
  gradientSea = new GradientWave(skyXPos, 150, skyWidth + 200, skyHeight, amplitude2, yPercent3, yPercent4, color3, color2, color1, color0);
}

//Set up.
function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight, WEBGL);
  //创建水  // Create water
  water = new Water(60, 90);
  //创建海鸥  // Create seagulls
  seagull1 = new Seagull(-100, -300, 300, 100, 1, color(10));  //  bigger, dark-colored seagull
  seagull2 = new Seagull(-100, -100, 200, 100, 0.7, color(100)); // Smaller, lighter-colored seagull
  seagull3 = new Seagull(-600, -200, 200, 100, 0.5, color(30)); // Smallest, dark-colored seagull

  // 创建背景 // Create gradient background
  let skyXPos = -windowWidth / 2;
  let skyYPos = -windowHeight / 2;
  let skyWidth = windowWidth;
  let skyHeight = windowHeight / 2 + 120
  let amplitude1 = 50;
  let amplitude2 = 20;
  let yPercent1 = 0.25//0.6;
  let yPercent2 = 0.5//0.9;
  let yPercent3 = 0.1;
  let yPercent4 = 0.4;
  let color0 = color(20, 40, 120, 100); // Navy
  let color1 = color(100, 150, 150, 100); // Green
  let color2 = color(220, 180, 40, 100); // Yellow
  let color3 = color(160, 80, 50, 100); // Red
  gradientSky = new GradientWave(skyXPos, skyYPos, skyWidth + 200, skyHeight, amplitude1, yPercent1, yPercent2, color0, color1, color2, color3);
  gradientSea = new GradientWave(skyXPos, 150, skyWidth + 200, skyHeight, amplitude2, yPercent3, yPercent4, color3, color2, color1, color0);
  //创建建筑  // Create building
  backgroundShadow = new BackgroundShadow(400, -120, 122);
  building = new Building(0, 120, 0, 0, 0);
  //创建水波  // Create water waves
  for (let i = 0; i < 25; i++) {
    purpleWaves.push(new WaveBrush(0, 170, width / 2, 200));
  }
  for (let i = 0; i < 10; i++) {
    whiteWaves.push(new WaveBrush(-150, 250, width / 5, 200));
  }
}

//Draw
function draw() {
  background("#FFFFFF")
  //渐变背景  // Gradient background
  gradientSky.display();
  gradientSea.display();
  //建筑  // Building
  building.display();
  building.reflection(20, 20, 20, 120);
  backgroundShadow.display();
  //水  // Water
  water.displayPerlinNoise();

  //水波  // Water waves
  for (let purpleWave of purpleWaves) {
    purpleWave.edges();
    purpleWave.flock(purpleWaves, 1, 0, 1);
    purpleWave.update(2, 1, 50, 50, 180);
    purpleWave.display();
  }
  for (let whiteWave of whiteWaves) {
    whiteWave.edges();
    whiteWave.flock(whiteWaves, 1, 0, 1);
    whiteWave.update(1, 1, 200, 200, 200);
    whiteWave.display();
  }

  //夜间蒙版 // NightMask class
  let currentFrame = frameCount % (10 * 60);// Loop every 10 seconds
  if (currentFrame < 2 * 60) {
    sunRange = map(currentFrame, 0, 2 * 60, width / 2, 150)
    //海鸥  // Seagulls
    seagullAlpha = map(currentFrame, 0, 2 * 60, 250, 0)
    seagull1.move();
    seagull2.move();
    seagull3.move();
    seagull1.display(seagullAlpha);
    seagull2.display(seagullAlpha)
    seagull3.display(seagullAlpha)
  } else if ((currentFrame < 8 * 60)) {
    sunRange = 150
  } else {
    sunRange = map(currentFrame, 8 * 60, 10 * 60, 150, width / 2)
    seagullAlpha = map(currentFrame, 8 * 60, 10 * 60, 0, 250)
    seagull1.move();
    seagull2.move();
    seagull3.move();
    seagull1.display(seagullAlpha);
    seagull2.display(seagullAlpha)
    seagull3.display(seagullAlpha)
  }
  let nightMask = new NightMask(-400, 100, width * 2, sunRange);
  nightMask.display();

  //初始建筑   // Initial building
  building.display();
  //天黑时亮灯  // Light up the building when it's dark
  if (currentFrame > 3 * 60 && currentFrame < 7 * 60) {

    // Create random fireworks based on time
    let fireworkX = random(-width / 3, width / 3)
    let fireworkY = random(-height / 2, -height / 5)
    let fireworkSize = random(1.5, 3)
    if (frameCount % 50 == 0 || frameCount % 140 == 0) {
      createFirework(fireworkX, fireworkY, fireworkSize)
      // Create building illumination effects based on firework position

      if (fireworkX < -310) {  //以建筑最高点为中线，左右两边产生不同的光照效果
        illuminatedBuildings.push(new Building(-10, 115, 230, 230, 200))
      }
      else {
        illuminatedBuildings.push(new Building(10, 115, 230, 230, 200))
      }
    }
    // Display the lighting effects
    for (let illuminatedBuilding of illuminatedBuildings) {
      illuminatedBuilding.display();
      illuminatedBuilding.illuminate();
      // Light up the building

      building.display();
      
      building.lightup()
    }
    // Play the Fireworks
  }
  for (let spark of sparks) {
    spark.show()
    spark.update()
  }
}

//个人功能部分 //Individual Work
//夜间蒙版class // NightMask class
class NightMask {
  constructor(xPos, yPos, radius, sunRange) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = radius;
    this.gradientValue = 0.5;
    this.sunRange = sunRange
    this.space = 3;
    this.R = 10;
    this.G = 30;
    this.B = 80;
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