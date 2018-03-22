Array.prototype.log = function() {
    console.log(this);
    return this;
};

class Leaf {
    constructor() {
        this.pos = createVector(random(50, width - 50), random(50, height - 150));
        this.reached = false;
        // this.index = index;
    }
    show() {
        stroke(255);
        point(this.pos.x, this.pos.y);
    }
}

class Branch {
    constructor(args) {
        this.pos = args.pos;
        this.parent = args.parent;
        this.dir = args.dir;
        this.count = 0;
        this.orignalDir = this.dir.copy();
        this.next = args.next;
    }
    reset() {
        this.count = 0;
        this.dir = this.orignalDir.copy()
    }
    show() {
        if (this.parent) {
            stroke(255);
            line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);
        }
    }
}

class Tree {
    constructor() {
        this.leaves = Array(300).fill().map(el => new Leaf());
        this.root = new Branch({
            'pos': createVector(width / 2, height),
            'parent': null,
            'dir': createVector(0, -3),
            'next': null,
        });
        this.MAX_DIST = 50;
        this.MIN_DIST = 10;
        this.branches = [this.root];
    }
    show() {
        this.leaves.forEach(leaf => {
            leaf.show();
        });
        this.branches.forEach(branch => {
            branch.show();
        });
    };
}
