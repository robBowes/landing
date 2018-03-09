/*
*   Written by: Robert Bowes
*   Lorenz Attractor Written in P5
*/

let x = 1;  // Initial coordinate values
let y = 1;
let z = 1;

const beta = 9/3;   // Initial constants
const rho = 30;
const sigma = 10;

let trail = new Array(); // An array to hold a trail of points
let count = 0; // A count to measure how many points have been generated

setup = () => {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    colorMode(HSB);
    background(0);

}

draw = () => {
    // frameRate(15);
    translate(height/2, width/2);
    scale(7);
    if (count%10000===0) background(0); // Clear the screen every 1000 iterations

    const dt = 0.005;  // The increment of time for each frame

    let dx = (sigma*(y-x))*dt; // The Lorenz formula for atmospheric convection
    let dy = (x*(rho - z)-y)*dt; // dx, dy and dz represent the change over time of the coordiante of the particle
    let dz = (x*y-beta*z)*dt;

    x += dx; // Use the calculated change over time to move the coordinates of the particle
    y += dy;
    z += dz;

    trail.push(createVector(x,y,z)); //Create a vector using the coordinates of the particle
    //let depth = 1-Math.min(Math.abs(trail[0].z/100), 1);
    let speed = Math.min(((Math.abs(dx)+Math.abs(dy)+Math.abs(dz)-0.25)*120),255)
    // console.log(`speed ${speed} `);
    noFill(); // Create a line with no fill
    stroke(speed, 255, 255); // Give the line a hue based on it's position on the z-axis
    if(trail.length>1) { // As long as there are at least 2 vectors in the array, we can draw a line
        line(trail[0].x, trail[0].y,trail[1].x,trail[1].y); // draw a line between the first and second point in the array
        count++;
        trail.shift(); // Remove the first value in the array
    }
}
