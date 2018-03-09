let angle = Math.PI/10; // the angle to offset each branch
let length = 200; // the length of the initial branch
let branchLength = 0.67; // the amount the branch length will decrease with each iteration
let numberOfBranches; // the number of branches drawn on each iteration
const MAX_BRANCHES = 20000; // the maximum number of branches to draw

setup = () => {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    /*
    * add some event listeners for the sliders in the HTML. Redraw the canvas whenever the
    * slider is moved
    */
    $('#branch_slider').on('mousemove', (event)=>{
        branchLength=event.target.value/100;
        redraw();
    });
    $('#angle_slider').on('mousemove', (event)=>{
        angle=event.target.value/100*Math.PI;
        redraw();
    });
    $('#length_slider').on('mousemove', (event)=>{
        length=event.target.value*8;
        redraw();
    });
};

draw = () => {
    noLoop(); // Only redraw the canvas when the variables are changed
    background(0);
    stroke(255);
    translate(width/2, height); // move to the bottom middle of the canvas
    numberOfBranches = 0; // the number of branches drawn on this iteration
    branch(length, angle); // start recursively drawing branches
};

branch = (len, ang) => {
    numberOfBranches++; // increase the number of branches drawn count
    line(0, 0, 0, -len); // draw a base branch
    translate(0, -len); // move to the end of the branch
    if (len > 4 && numberOfBranches < MAX_BRANCHES) {
        len*= branchLength; // decrease the branch length
        push(); // record the current location
        rotate(ang); // rotate
        branch(len, ang); // recursively draw branches from the end of the base branch rotated to the right
        pop(); // return to the initial location
        rotate(-ang); // rotate in the other direction
        branch(len, ang); // ecursively draw branches from the end of the base branch rotated to the left
    }
};
