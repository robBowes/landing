let tree;
let leaves;
const MAX_DIST = 50;
const MIN_DIST = 10;

setup = () => {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    background(0);
    // translate(width / 2, height);
    leaves = Array(200).fill().map(el => new Leaf());
    tree = new Tree();
    Object.freeze(tree);
    console.dir(tree);
};

draw = () => {
    frameRate(30);
    background(0);
    growNodes(tree.nodes);
    checkIfBranchIsNearLeaf(tree);
    // if (tree.nodes.length > 10) tree.nodes.pop();
    show();
    // console.log(findDir(findAvgLeaf(), tree.nodes[0].pos));
    if (tree.branches.length > 2000) noLoop();
};
