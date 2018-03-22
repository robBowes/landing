class Leaf {
    constructor() {
        this.pos = createVector(random(200, width - 200), random(200, height - 50));

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
        this.leaves = Array(500).fill().map(el => new Leaf());
        this.root = new Branch({
            'pos': createVector(width / 2, height),
            'parent': null,
            'dir': createVector(0, -1),
        });
        // console.log(this.findLeafinMaxDistance(this.root));
        this.branches = this.growFromRoot(this.findLeafinMaxDistance(this.root), this.root, []);
        let lonelyLeaves = Array.from(this.leaves);
        let allBranches = Array.from(this.branches);
        let count = 0;
        console.log(this.growFromLeaves(lonelyLeaves, allBranches, count));
        this.branches.forEach(el => el.show());
    }
    show() {
        this.leaves.forEach(leaf => leaf.show());
    }
    growFromRoot(leaf, root, array) {
        if (leaf) {
            return array;
        } else {
            let nextPos = p5.Vector.add(root.pos, root.dir);
            let nextBranch = new Branch({
                'pos': nextPos,
                'parent': root,
                'dir': root.dir.copy(),
            });
            array.push(nextBranch);
            return this.growFromRoot(this.findLeafinMaxDistance(nextBranch), nextBranch, array);
        }
    }
    growFromLeaves(lonelyLeaves, allBranches, count) {
        count++;
        if (count > 100) return false;
        if (lonelyLeaves.length < 490) return true;
        let leavesNearBranches = [];
        this.branches.forEach(branch => {
            // lonelyLeaves.filter(leaf => this.betweenMaxMin(leaf, branch)).forEach(el => leavesNearBranches.push(el))
            lonelyLeaves.filter(leaf => this.betweenMaxMin(leaf, branch)).forEach(leaf => {
                let newDirection = p5.Vector.sub(leaf.pos, branch.pos);
                // newDirection.normalize();
                branch.dir.add(newDirection);
                branch.count++;
                leavesNearBranches.push(leaf);
            });
            // console.log(lonelyLeaves.filter(leaf => this.betweenMaxMin(leaf, branch)));
        });
        leavesNearBranches.forEach(leaf => {
            lonelyLeaves = lonelyLeaves.filter(el => el.pos != leaf.pos)
        });
        this.branches.forEach(branch => {
            if (branch.count > 0) {
                branch.dir.div(branch.count);
                this.branches.push(new Branch({
                    'dir': branch.dir,
                    'parent': branch,
                    'pos': p5.Vector.add(branch.pos, branch.dir),
                }));
                branch.count = 0;
                branch.dir = createVector(0, -1);
            }
        })
        // if (branch.length > 15) return false;
        // console.log(lonelyLeaves);
        // leavesNearBranches.sort()
        return this.growFromLeaves(lonelyLeaves, count)
    }
    inMaxDistance(obj1, obj2) {
        return p5.Vector.dist(obj1.pos, obj2.pos) < MAX_DIST ? true : false;
    }
    outMinDistance(obj1, obj2) {
        return p5.Vector.dist(obj1.pos, obj2.pos) > MIN_DIST ? true : false;
    }
    closest(obj1, obj2) {
        return
    }
    find(array, element1, func) {
        return () => array.find(el => func(el, element1));
    }
    findLeafinMaxDistance(element1) {
        return this.findInMaxDistance(this.leaves, element1)();
    }
    findInMaxDistance(array, element1) {
        return this.find(array, element1, this.inMaxDistance);
    }
    betweenMaxMin(obj1, obj2) {
        return this.inMaxDistance(obj1, obj2) && this.inMaxDistance(obj1, obj2);
    }
}
