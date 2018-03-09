let cols;
let rows;
let w =1200;
let h = 1200;
let resolution = 20;
let terrain = [];
let flying = 0;


setup = () =>{
    const canvas = createCanvas(600, 600, WEBGL);
    canvas.parent('sketch-holder');
    cols = h / resolution;
    rows = w / resolution;
    for (let i = 0; i < rows; i++) {
        terrain[i] = [];
    }
};

draw = () => {
    frameRate(30);
    flying -= 0.1;
    let yoff = 0;
    for (let i = 0; i < rows; i++) {
        let xoff = flying;
        for (let j = 0; j < cols; j++) {
            terrain[i][j] = map(noise(yoff, xoff), 0, 2, -100, 200);
            xoff += 0.1;
        }
        yoff += 0.1;
    }
    background(0);
    translate(0, 30);
    stroke(255);
    rotateX(PI/3);
    fill(200, 200, 200, 100);
    translate(-w/2, -h/1.5);
    for (let j = 0; j < rows-1; j++) {
        beginShape(TRIANGLE_STRIP);
        for (let i = 0; i < cols; i++) {
            vertex(i * resolution, j * resolution, terrain[i][j]);
            vertex(i * resolution, (j+1) * resolution, terrain[i][j+1]);
        }
        endShape();
    }
};
