let tree = new Array();
let leaves = new Array();
let branchCount = 0;
const NUMBER_OF_BRANCHES = 100;
const ANGLE = Math.PI/7;

setup = () => {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    let a = createVector(width/2, height);
    let b = createVector(width/2, height -100);
    tree.push(new Branch(a,b));
}

draw = () => {
    background(0);
    frameRate(25);
    if (branchCount < NUMBER_OF_BRANCHES) {
        tree.push(tree[branchCount].fork(ANGLE*(Math.random()+0.5)));
        tree.push(tree[branchCount].fork(-ANGLE*(Math.random()+0.5)));
        tree[branchCount].finished = true;
        branchCount++;
    }
    if (branchCount < NUMBER_OF_BRANCHES -1) {
        leaves = [];
    }
    for (let i = 0; i < tree.length; i++) {
        tree[i].show();
        if (!tree[i].finished && branchCount < NUMBER_OF_BRANCHES) {
            leaves.push(createVector(tree[i].final.x+random(1), tree[i].final.y+random(1), 8, 8));
        }
    }
    for (var i = 0; i < leaves.length; i++) {
        stroke('green');
        fill('green');
        ellipse(leaves[i].x, leaves[i].y, 8, 8);
        if (branchCount >= NUMBER_OF_BRANCHES  && leaves[i].y<height) {
            leaves[i].x += random(-1,1)
            leaves[i].y+=random(1,3);
        }
    }
}
