let walkers;

setup = () => {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    walkers = Array(1).fill().map(e => new Walker);
};

draw = () => {
    walkers = walkers.map(e => move(e));
    show(walkers);
};

class Walker {
    constructor() {
        this.x = 300;
        this.y = 300;
    }
}

move = (obj) => {
    obj.x += random(-1, 1);
    obj.y += random(-1, 3);
    if (obj.y > 600) obj.y = 0;
    return obj;
};

show = (arr) => {
    stroke(255);
    arr.forEach(e => ellipse(e.x, e.y, 2));
};
