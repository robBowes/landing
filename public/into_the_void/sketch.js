let creatures;
let attractors;

setup = () => {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    creatures = Array(100).fill().map(el => new Creature());
    attractors = Array(1).fill().map(el => new Attractor());
    mousePressed = () => reset(creatures);
    mouseMoved = () => {
        attractors[0].pos.x = mouseX;
        attractors[0].pos.y = mouseY;
    };
};

draw = () => {
    background('gray');
    creatures = creatures.map(el => {
        el = move(el, attractors);
        el = findDesire(el, attractors);
        return el;
    });
    [...creatures, ...attractors].forEach(el => show(el));
};

class Creature {
    constructor() {
        this.pos = createVector(Math.random() * width, Math.random() * height);
        this.dir = createVector(0, -2);
        this.desire = createVector(0, 0);
        this.MAX_SPEED = 4;
        this.size = 4;
        this.color = 'white';
    }
}
class Attractor {
    constructor() {
        this.pos = createVector(Math.random() * width, Math.random() * height);
        this.radius = 100;
        this.size = 50;
        this.color = 'black';
    }
}
show = (element) => {
    noStroke();
    fill(element.color);
    ellipse(element.pos.x, element.pos.y, element.size);
};
move = (element, attractors) => {
    element.pos.add(element.dir);
    element.dir.sub(element.desire);
    if (element.dir.mag() > element.MAX_SPEED) {
        element.dir.setMag(element.MAX_SPEED);
    }
    attractors.filter(att => p5.Vector.dist(att.pos, element.pos) < 100)
        .forEach(att => element.dir.mult(p5.Vector.dist(att.pos, element.pos) / 100));
    if (element.pos.dist(attractors[0].pos) <= 25) {
        let a = random(1);
        random(1) > 0.5 ? element.pos = createVector(Math.round(a) * width, random(height)) :
            element.pos = createVector(random(width), Math.round(a) * height);
    }
    return element;
};
findDesire = (element, attractors) => {
    element.desire = attractors.reduce(
            (a, b) => a.sub(b.pos.copy().sub(element.pos)), createVector(0, 0))
        .div(attractors.length)
        .setMag(1);
    return element;
};
reset = (creatures) => {
    return creatures.map(creature => {
        creature.pos = createVector(Math.random() * width, Math.random() * height);
        return creature;
    });
};
