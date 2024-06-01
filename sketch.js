let gradientSky;
let gradientSea;
let purpleWaves = [];
let whiteWaves = [];
let particles = [];
let illuminatedBuildings = [];
let water, seagull1, seagull2, seagull3, backgroundShadow, building;
let waveR, waveG, waveB;
let sunRange, seagullAlpha;

// Handle window resizing
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

// Setup \\
function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight, WEBGL);
  // Create water.
  water = new Water(60, 90);
  // Create seagulls.
  seagull1 = new Seagull(-100, -300, 300, 100, 1, color(10));  // Bigger, dark-colored seagull
  seagull2 = new Seagull(-100, -100, 200, 100, 0.7, color(100)); // Smaller, lighter-colored seagull
  seagull3 = new Seagull(-600, -200, 200, 100, 0.5, color(30)); // Smallest, dark-colored seagull
  // Create gradient background.
  let color0 = color(20, 40, 120, 100); // Navy
  let color1 = color(100, 150, 150, 100); // Green
  let color2 = color(220, 180, 40, 100); // Yellow
  let color3 = color(160, 80, 50, 100); // Red
  gradientSky = new GradientWave(-windowWidth / 2, -windowHeight / 2, windowWidth + 200, windowHeight / 2 + 120, 50, 0.25, 0.5, color0, color1, color2, color3);
  gradientSea = new GradientWave(-windowWidth / 2, 150, windowWidth + 200, windowHeight / 2 + 120, 20, 0.1, 0.4, color3, color2, color1, color0);
  // Create building and shadow of background building.
  backgroundShadow = new BackgroundShadow(400, -120, 122);
  building = new Building(0, 120, 0, 0, 0);
  // Create purple and white water waves.
  for (let i = 0; i < 20; i++) {
    purpleWaves.push(new WaveBrush(0, 200, width / 2, 200));
  }
  for (let i = 0; i < 10; i++) {
    whiteWaves.push(new WaveBrush(-150, 120, width / 4, 120));
  }
}

// Draw \\
function draw() {
  background("#FFFFFF")
  // Draw gradient background.
  gradientSky.display();
  gradientSea.display();
  // Draw buildings and its reflection.
  building.reflection(20, 20, 20, 120);
  backgroundShadow.display();
  // Draw water.
  water.displayPerlinNoise();
  // Draw purple and white water waves.
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
  if (currentFrame < 3 * 60) { 
    // Transition to night: decrease brightness and seagull opacity.    
    sunRange = map(currentFrame, 0, 3 * 60, width, 180)
    seagullAlpha = map(currentFrame, 0, 3 * 60, 300, 0)
  } else if ((currentFrame < 9 * 60)) {
    // Night time
    sunRange = 180
  } else { 
    // Transition to day: increase brightness and seagull opacity
    sunRange = map(currentFrame, 9 * 60, 12 * 60, 180, width)
    seagullAlpha = map(currentFrame, 9 * 60, 12 * 60, 0, 300)
  }
  // Draw night mask.
  let nightMask = new NightMask(-310, 100, width * 2, sunRange);
  nightMask.display();
  //Draw seagulls.
  seagull1.move();
  seagull2.move();
  seagull3.move();
  seagull1.display(seagullAlpha);
  seagull2.display(seagullAlpha)
  seagull3.display(seagullAlpha)

  //Draw the initial building.
  building.display();

  //During nighttime:
  //1- Fireworks
  //2- Illuminated buildings
  //3- lighted windows
  //4- Yellow waves
  if (currentFrame > 4 * 60 && currentFrame < 8 * 60) {
    //Create random fireworks at random time.
    let fireworkX = random(-width / 3, width / 3)
    let fireworkY = random(-height / 2, -height / 5)
    let fireworkSize = random(1.5, 3)
    if (frameCount % 50 == 0 || frameCount % 140 == 0) {
      createFirework(fireworkX, fireworkY, fireworkSize)
      //Create building illumination effects on the left or right side, 
      //based on the firework position.
      if (fireworkX < -310) {
        illuminatedBuildings.push(new Building(-10, 115, 230, 230, 200))
      }
      else {
        illuminatedBuildings.push(new Building(10, 115, 230, 230, 200))
      }
    }
    //Draw the illuminatd buildings.
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
  // Draw fireworks particles
  for (let particle of particles) {
    particle.show()
    particle.update()
  }
}
