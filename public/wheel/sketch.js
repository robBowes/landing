let wheels = [];
let surface;
let speed = 3;

setup = () => {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    wheels[0] = new Wheel({
        'center': createVector(width / 2 + 150, height / 1.5 - 2),
        'diameter': 200,
        'tireSize': 20,

    });
    wheels[1] = new Wheel({
        'center': createVector(width / 2 - 150, height / 1.5 - 2),
        'diameter': 200,
        'tireSize': 20,

    });
    surface = new Surface({
        'height': height / 1.5 + 100,
    });
};

draw = () => {
    background(255);
    for (let wheel of wheels) {
        wheel.show();
        wheel.rotate(speed);
    }
    surface.show();
    surface.move(speed);
};
