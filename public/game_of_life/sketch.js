make2DArray = (cols, rows) =>{
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

let grid;
let cols;
let rows;
let resolution = 20;

function setup() {
    let canvas = createCanvas(600, 400);
    canvas.parent('sketch-holder');
    cols = width/resolution;
    rows = height/resolution;
    grid = make2DArray(cols, rows);
    for (let col of grid) {
        for (let i = 0; i < col.length; i++) {
            col[i] = floor(random(2));
        }
    }
}

function draw() {
    frameRate(8);
    background(0);
    let nextGen = make2DArray(cols, rows);
    for (let i = 0; i < nextGen.length; i++) {
        nextGen[i].fill(0);
    }
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] == 1) {
                fill('black');
                rect(x, y, resolution, resolution);
            } else {
                fill('white');
                rect(x, y, resolution, resolution);
            }
        }
    }
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let sum = 0;
            for (let h = -1; h < 2; h++){
                for (let k = -1; k < 2; k++){
                    if (i+h>0 && j+k>0 && i+h<cols && j+k<rows) {
                        sum += grid[i+h][j+k]; // make a sum of all the tiles surrouning the current tile
                    }
                }
            }
            sum -= grid[i][j];
            if (grid[i][j] == 1 && sum < 2) {
                nextGen[i][j] = 0;
            } else if (grid[i][j] == 1 && (sum == 2 || sum == 3)) {
                nextGen[i][j] = 1;
            } else if (grid[i][j] == 1 && sum > 3) {
                nextGen[i][j] = 0;
            } else if (grid[i][j] == 0 && sum == 3) {
                nextGen[i][j] = 1;
            }
        }
    }
    grid = nextGen;
}
