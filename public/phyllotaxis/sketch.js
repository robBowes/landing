let h = 600;
let w = 600;
const c = 5;
const ANGLE = 2.6;
class Petal {
    constructor(i) {
        this.angle = i * ANGLE;
        this.r = c * Math.sqrt(i);
        this.x = this.r * Math.cos(this.angle) + w / 2;
        this.y = this.r * Math.sin(this.angle) + h / 2;
    }
}
let petals = Array(1000).fill().map((el, i) => new Petal(i));

setup = () => {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    colorMode(HSB);

};

draw = () => {
    background(0);
    noStroke();
    petals.forEach((petal, i, arr) => {
        fill(Math.floor(i / arr.length * 400), 255, 255);
        ellipse(petal.x, petal.y, 6);
    });
};
