let things;
let world;
let attractor;

setup = () => {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    things = Array(1).fill().map(e => new Thing({
        'pos': createVector(random(width), random(height)),
    }));
    attractor = new Attractor();
    world = [
        attractor,
        ...things,
    ];
};

draw = () => {
    frameRate(2);
    background(0);
    drawWorld(world);
    world = updateWorld(world);
};

class Thing {
    constructor(args) {
        this.vel = createVector(0, -2);
        this.acc = createVector(0, 0);
        // this.dir = 0;
        this.desire = 0;
        this.pos = args.pos;
        this.maxSpeed = 2;
        this.maxAcc = 1;
        this.type = 'thing';
    }
}

class Attractor extends Thing {
    constructor() {
        super({
            'pos': createVector(width / 2, height / 2),
        });
        this.vel = createVector(0, 0);
        this.perim = 100;
        this.type = 'hole';
    }
};

drawThing = (thing) => {
    push();
    stroke('white');
    translate(thing.pos.x, thing.pos.y);
    // let dir = thing.vel.copy().heading()
    // rotate(dir);
    triangle(0, 0, 10, -10, -10, -10);
    // rotate(-thing.vel.heading() + PI);
    pop();
};

drawAttractor = (obj) => {
    stroke(255);
    noFill();
    ellipse(obj.pos.x, obj.pos.y, 4);
};

drawWorld = (world) => world.forEach(el => {
    if (el instanceof Attractor) drawAttractor(el);
    else if (el instanceof Thing) drawThing(el);
});

updateWorld = (world) => {
    return world.map(el => {
        if (el.type == 'thing') el.acc = desire(el, world[0]);
        move(el);
        return el;
    });
};

move = (obj) => {
    obj.pos = p5.Vector.add(obj.pos, obj.vel);
    obj.vel = p5.Vector.sub(obj.acc, obj.vel);
    // if (obj.vel.mag() > obj.maxSpeed) obj.vel.setMag(obj.maxSpeed);
    return obj;
};

desire = (obj, attractor) => {
    let dir = p5.Vector.sub(attractor.pos, obj.pos);
    console.log(dir);
    if (dir.mag() < attractor.perim) {
        //console.log(map(dir.mag(), 0, 400, 0, obj.maxSpeed));
        dir = dir.setMag(map(dir.mag(), 0, 50, 0, obj.maxSpeed));
    } else {
        dir.setMag(obj.maxSpeed);
    }
    return dir;
};
