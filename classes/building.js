//Class Building to constructed the main churchlike building in the centrepiece.

class Building {
  constructor(xPos, yPos, R, G, B) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.R = R;
    this.G = G;
    this.B = B;
  }

  display() {
    push();
    //set setting for brush
    scale(.8);
    translate(this.xPos, this.yPos);
    stroke(this.R, this.G, this.B);
    //Draw Base
    fill(this.R, this.G, this.B);
    beginShape()
    vertex(-800, 0);
    vertex(0, 0);
    vertex(0, -50);
    vertex(-10, -60);
    vertex(-35, -80);
    vertex(-60, -90);
    vertex(-170, -90);
    vertex(-200, -115);
    vertex(-200, -140);
    vertex(-195, -140);
    vertex(-200, -145);
    vertex(-225, -160);
    vertex(-250, -170);
    vertex(-260, -210);
    vertex(-260, -170);
    vertex(-280, -165);
    vertex(-340, -195);
    vertex(-390, -195);
    vertex(-390, -235);
    //Dome
    vertex(-400, -255);
    vertex(-430, -275);
    vertex(-430, -295);
    vertex(-440, -315);
    vertex(-450, -295);
    vertex(-450, -275);
    vertex(-470, -265);
    vertex(-480, -245);
    //Tower
    vertex(-480, -500);
    vertex(-500, -560);
    vertex(-510, -650);
    vertex(-520, -645);
    vertex(-530, -650);
    vertex(-535, -590);
    vertex(-537, -590);
    vertex(-540, -500);
    vertex(-545, -520);
    vertex(-550, -500);
    vertex(-555, -520);
    vertex(-560, -500);
    vertex(-560, -200);
    //Left Side Wall
    vertex(-590, -180);
    vertex(-600, -170);
    vertex(-630, -190);
    vertex(-640, -215);
    vertex(-640, -180);
    vertex(-700, -180);
    vertex(-730, -150);
    vertex(-730, -100);
    vertex(-900, -100);
    vertex(-935, -80);
    vertex(-950, -50);
    vertex(-950, 0);
    endShape(CLOSE);
    pop();
  }

  reflection(r, g, b, a) {
    push();
    translate(this.xPos, this.yPos-24);
    scale(.8, -.8);
    stroke(r, g, b, a);
    //Draw Base
    fill(r, g, b, a);
    beginShape()
    vertex(-730, -100);
    vertex(-900, -100);
    vertex(-935, -80);
    vertex(-950, -50);
    vertex(-950, 0);
    vertex(-800, 0);
    vertex(0, 0);
    vertex(0, -50);
    vertex(-10, -60);
    vertex(-35, -80);
    vertex(-60, -90);
    vertex(-170, -90);
    endShape(CLOSE);
    //City
    beginShape();
    vertex(-200, -115);
    vertex(-200, -140);
    vertex(-195, -140);
    vertex(-200, -145);
    vertex(-225, -160);
    vertex(-250, -170);
    vertex(-260, -210);
    vertex(-260, -170);
    vertex(-280, -165);
    vertex(-340, -195);
    vertex(-390, -195);
    //Left Side Wall
    vertex(-590, -180);
    vertex(-600, -170);
    vertex(-630, -190);
    vertex(-640, -215);
    vertex(-640, -180);
    vertex(-700, -180);
    vertex(-730, -150);
    vertex(-730, -125);
    endShape(CLOSE);
    beginShape();
    //Dome
    vertex(-390, -215);
    vertex(-400, -255);
    vertex(-430, -275);
    vertex(-430, -295);
    vertex(-440, -315);
    vertex(-450, -295);
    vertex(-450, -275);
    vertex(-470, -265);
    vertex(-560, -245);
    vertex(-560, -200);
    //Tower
    endShape(CLOSE);
    beginShape();
    vertex(-480, -285);
    vertex(-480, -500);
    vertex(-500, -560);
    vertex(-510, -650);
    vertex(-520, -645);
    vertex(-530, -650);
    vertex(-535, -590);
    vertex(-537, -590);
    vertex(-540, -500);
    vertex(-545, -520);
    vertex(-550, -500);
    vertex(-555, -520);
    vertex(-560, -500);
    vertex(-560, -275);
    endShape(CLOSE)
    pop();
  }

  update() { }


}