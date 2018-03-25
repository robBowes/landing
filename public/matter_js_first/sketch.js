const Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

let engine = Engine.create();
let blocks = [];

setup = () => {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    blocks.push(new Block({
        'x': 150,
        'y': 400,
        'width': 300,
        'height': 40,
        'options': {
            'isStatic': true,
            'angle': 0.2,
            'friction': 0.05,
        },
    }));
    blocks.push(new Block({
        'x': 450,
        'y': 500,
        'width': 300,
        'height': 40,
        'options': {
            'isStatic': true,
            'angle': -0.2,
            'friction': 0.05,
        },
    }));
    mousePressed = () => {
        blocks.push(randomBlock(mouseX, mouseY));
    };
    Engine.run(engine);
};

draw = () => {
    background(0);
    blocks.forEach(showBlock);
    blocks = blocks.map(block => {
        if (block.body.position.y > 600) Matter.Body.set(block.body, 'position', {
            'x': block.body.position.x,
            'y': 0,
        });
        return block;
    });
};

class Block {
    constructor(args) {
        this.height = args.height;
        this.width = args.width;
        this.body = Bodies.rectangle(args.x, args.y, args.width, args.height, args.options)
        World.add(engine.world, this.body);
        this.color = color(random(255), random(255), random(255));
    }
}
showBlock = (block) => {
    push();
    fill(block.color);
    translate(block.body.position.x, block.body.position.y);
    rectMode(CENTER);
    rotate(block.body.angle);
    rect(0, 0, block.width, block.height);
    pop();
};
randomBlock = (x, y) => {
    return new Block({
        'x': x,
        'y': y,
        'height': random(10, 20),
        'width': random(10, 20),
        'options': {
            'restitution': 0.5,
        },
    });
};
