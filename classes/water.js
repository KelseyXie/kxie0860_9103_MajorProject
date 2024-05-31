class Water{
    constructor(){
        this.yoff = 0;
    }
    display(array){
        let counter =0;
        fill(50,0,50,122);
        // We are going to draw a polygon out of the wave points
        beginShape();
        noStroke();
        let xoff = 0; // Option #1: 2D Noise
        // let xoff = yoff; // Option #2: 1D Noise
        let steps = 0;
        if(array){
            print("array>0")
            steps = width / array.length;
        } else {
            steps = 10;
        }
        // Iterate over horizontal pixels
        for (let x = -width/2; x < width/2; x += steps) {
            // Calculate a y value according to noise, map to
            let y = 0
            // Option #1: 2D Noise
            if(array){

                y = map(array[counter]/255, 0, 1, 80, 100);
            } else{

                y = map(noise(xoff, this.yoff), 0, 1, 60, 100);
            }
            counter +=1;
      
          // Option #2: 1D Noise
          // let y = map(noise(xoff), 0, 1, 200,300);
      
          // Set the vertex
          vertex(x, y);
          // Increment x dimension for noise
          xoff += 0.05;
        }
        // increment y dimension for noise
        this.yoff += 0.01;
        vertex(width/2,80);
        vertex(width/2, height);
        vertex(-width/2, height);
        endShape(CLOSE);
    }
}