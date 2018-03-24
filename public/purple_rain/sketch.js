let drops;
let xoff = 0;
setup = () => {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    drops = Array(300).fill().map(el => new Drop());
};

draw = () => {
    background(230, 230, 250);
    stroke(138, 43, 226);
    drops = update(drops, noise(xoff));
    show(drops);
    xoff += 0.01;
};

/**
 * Drop - A raindrop, only had speed and location properties
 */
class Drop {
    constructor() {
        this.speed = createVector(0, Math.random() * 6 + 4);
        this.pos = createVector(Math.random() * width, Math.random() * height);
    }
};

/**
 * Show each drop in an array
 *
 * @param {array} arr A collection of raindrops
 *
 */
show = (arr) => {
    arr.forEach(el => {
        line(el.pos.x, el.pos.y, el.pos.x, el.pos.y - el.speed.y);
    });
};

/**
 * Unknown - Description
 *
 * @param {array} arr A collection of randrops
 * @param {num} n offset for each raindrop
 *
 * @return {array} An array with new positions
 */
update = (arr, n) => {
    return arr.map((el) => changePos(el, n));
};

/**
 * Change the postition of a raindrop based on its speed
 *
 * @param {obj} drop Drop
 * @param {num} n offset
 *
 * @return {obj} A raindrop with a new position
 */
changePos = (drop, n) => {
    drop.pos.add(drop.speed);
    drop.pos.x += n * drop.speed.y / 2 - drop.speed.y / 4;
    if (drop.pos.y > height) {
        drop.pos.y = 0;
        drop.pos.x = Math.random() * width;
        drop.speed.y = Math.random() * 6 + 4;
    }
    if (drop.pos.x > width) drop.pos.x = 0;
    if (drop.pos.x < 0) drop.pos.x = width;
    return drop;
};
