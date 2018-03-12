let inc = 0.1;
let scale = 10;
let cols;
let rows;
let zoff = 0;
let particles = [];
let flowField = [];
setup = () => {
    let canvas = createCanvas(400, 400);
    canvas.parent('sketch-holder');
    colorMode(HSB, 255);
    background(51);
    cols = Math.floor(width / scale);
    rows = Math.floor(height / scale);
    // translate(width, height)
    for (let i = 0; i < 500; i++) {
        particles[i] = new Particle();
    }
    for (let i = 0; i < cols * rows; i++) {
        flowField[i] = null;
    }
};

draw = () => {
    // let fr = Math.floor(frameRate() / 10) * 10;
    // document.getElementById('fr').innerHTML = fr;
    //console.log(fr);
    background(0, 5)
    stroke(0, 50);
    let yoff = 0;
    for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
            let index = x + y * rows;
            let perlin = noise(xoff, yoff, zoff) * 24;
            let vector = p5.Vector.fromAngle(perlin * 360);
            vector.setMag(1);
            flowField[index] = vector;
            xoff += inc;
            // push();
            // translate(x * scale, y * scale);
            // rotate(vector.heading());
            // stroke(255, 50);
            // line(0, 0, scale, 0);
            // pop();
        }
        yoff += inc;
        zoff += 0.0003;
    }


    for (let particle of particles) {
        particle.follow(flowField);
        particle.update();
        particle.edges();
        particle.show();
    }
};
