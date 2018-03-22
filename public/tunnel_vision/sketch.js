let arr = Array(18);

setup = () => {
    let canvas = createCanvas(600, 600, WEBGL);
    canvas.parent('sketch-holder');
    angleMode(DEGREES);
    perspective(PI / 4);
    arr.fill(squareBuilder());
};

draw = () => {
    background(0);
    frameRate(30);
    translate(0, 0, -350);
    arr.forEach((sq, index) => sq(zAxis(index * 10, 900), index));
};

const returnInt = (n, max = 300) => {
    let cache = {};
    return (n, max) => {
        if (cache[n] >= max) {
            cache[n] = 0;
            return cache[n];
        } else if (cache[n] <= max) {
            cache[n] += 4;
            return cache[n];
        } else {
            cache[n] = n * 5;
            return cache[n];
        }
    };
};

const zAxis = returnInt();

const squareBuilder = (z, n) => {
    let count = {};
    return (z, n) => {
        if (!count[n]) count[n] = n * 10;
        else count[n]++;
        push();
        translate(0, 0, z);
        colorMode(HSB);
        noFill();
        strokeWeight(1);
        stroke(count[n] % 510, 255, 255);
        box(50);
        pop();
    };
};

const square = squareBuilder();
