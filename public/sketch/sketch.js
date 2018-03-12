let inc = 0.01;
setup = () => {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    pixelDensity(1);
};

draw = () => {
    loadPixels();
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let index = (x + y * width) * 4;
            pixels[index] = 255;
            pixels[index + 1] = 255;
            pixels[index + 2] = 255;
            pixels[index + 3] = Math.floor(noise(x * 0.01 + inc, y * 0.01) * 255);
        }
    }
    inc += 0.1;
    updatePixels();
};
