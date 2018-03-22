let = growNodes = () => {
    tree.nodes.map(node => {
        if (node.dir.y > -0.2) return null;
        node.prevPos = node.pos.copy();
        node.pos = p5.Vector.add(node.dir, node.pos);
        node.dir.add(findDir(findCloseLeaves(node.pos), node.pos).setMag(0.2)).setMag(3);
        tree.branches.push(new Branch({
            'initial': node.prevPos,
            'final': node.pos,
        }));
        return node;
    });
};

let = show = () => {
    tree.show();
    leaves.filter(leaf => !leaf.reached).forEach(leaf => leaf.show());
};

let checkIfBranchIsNearLeaf = (tree) => {
    tree.branches.forEach(branch => {
        leaves.filter(leaf => !leaf.reached && p5.Vector.dist(branch.initial, leaf.pos) < MAX_DIST && p5.Vector.dist(branch.initial, leaf.pos) > MIN_DIST).forEach(leaf => {
            leaf.reached = true;
            if (p5.Vector.dist(branch.initial, leaf.pos) < MAX_DIST) {
                leaf.reached = true;
                if (tree.nodes.length > 30) tree.nodes.splice(Math.floor(random(tree.nodes.length - 5)), 5)
                let newDirection = p5.Vector.sub(leaf.pos, branch.initial);
                // console.log(newDirection);
                // newDirection.setMag(3);
                // newDirection.add(p5.Vector.sub(branch.initial, branch.final));
                newDirection.setMag(3);
                if (random(1) > 0.5) {
                    tree.nodes.push(new Node({
                        'pos': branch.initial.copy(),
                        'dir': newDirection,
                        'prevPos': branch.initial,
                    }));
                }
            }
        });
    });
};

let findAvgLeaf = () => {
    return leaves.filter(leaf => !leaf.reached).map(leaf => leaf.pos).reduce((leaf1, leaf2) => {
        return p5.Vector.add(leaf1, leaf2).div(2);
    });
};
let findCloseLeaves = (vector) => {
    let close = leaves.filter(leaf => !leaf.reached && p5.Vector.dist(leaf.pos, vector) < 100).map(leaf => leaf.pos)
    if (close.length > 0) close = close.reduce((leaf1, leaf2) => {
        return p5.Vector.add(leaf1, leaf2).div(2);
    })
    else close = createVector(width / 2, 0)
    return close;
};

let findDir = (vector1, vector2) => {
    return p5.Vector.sub(vector1, vector2).normalize();
};
let findDirAvgLeaf = (vector) => {
    return findDir(vector, findAvgLeaf());
};
