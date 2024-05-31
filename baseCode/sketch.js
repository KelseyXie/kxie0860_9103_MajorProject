//初始设置
let gradientSky;
let gradientSea
const purpleWaves = [];
const whiteWaves = [];

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
  //创建水
  water = new Water(60, 90);
  //创建海鸥
  seagull1 = new Seagull(-100, -300, 300, 100, 1, color(0));          // Original seagull
  seagull2 = new Seagull(-100, -100, 200, 100, 0.7, color(100)); // Smaller, lighter-colored seagull
  //创建背景
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
  //创建建筑
  backgroundShadow = new BackgroundShadow(400, -120, 122);
  building = new Building(0, 120, 0, 0, 0);
  //创建水波
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
  //渐变背景
  gradientSky.display();
  gradientSea.display();
  //建筑
  building.display();
  building.reflection(20, 20, 20, 120);
  backgroundShadow.display();
  //水
  water.displayPerlinNoise();
  //海鸥
  seagull1.move();
  seagull2.move();
  seagull1.display();
  seagull2.display();
  //水波
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
}