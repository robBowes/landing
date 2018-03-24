Array.prototype.log = function() {
    console.log(this);
    return this;
};

class Leaf {
    constructor() {
        this.pos = createVector(random(100, width - 100), random(50, height - 150));
        this.reached = false;
    }
    show() {
        stroke(255);
        ellipse(this.pos.x, this.pos.y, 1, 1);
    }
}

class Branch {
    constructor(args) {
        this.initial = args.initial;
        this.final = args.final;
        this.count = 0;
    }
    show() {
        stroke(139, 69, 19);
        strokeWeight(ceil(this.count / 20));
        line(this.initial.x, this.initial.y, this.final.x, this.final.y);
        this.count++;
    }
}

class Node {
    constructor(args) {
        this.dir = args.dir;
        this.pos = args.pos;
        this.prevPos = args.prevPos;
    }
    show() {
        noStroke()
        fill('green');
        ellipse(this.pos.x, this.pos.y, 3, 3);
    }
}

class Tree {
    constructor() {
        // this.leaves = Array(300).fill().map(el => new Leaf());
        this.root = new Node({
            'pos': createVector(width / 2, height),
            'dir': createVector(0, -4),
            'prevPos': createVector(width / 2, height),
        });
        this.MAX_DIST = 50;
        this.MIN_DIST = 10;
        this.nodes = [this.root];
        this.branches = [];
    }
    show() {
        this.branches.forEach(branch => {
            branch.show();
        });
        this.nodes.forEach(node => node.show());
    };
}
