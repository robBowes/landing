let leaves = Array(100).fill().map(() => {
    return {
        'x': Math.floor(Math.random() * 200 + 200),
        'y': Math.floor(Math.random() * 200 + 200),
    };
});
let root = {
    'x': 300,
    'y': 600,
};
setup = () => {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    background(0);
    console.assert(dis({
        'x': 0,
        'y': 0,
    }));
};
draw = () => {
    show();
    noLoop();
};

const show = () => {
    leaves.forEach(leaf => point(leaf.x, leaf.y));
};

const grow = () => {

};

const findAvgLeaf = (point, range) => {
    let avglf = avgPoint(leaves.filter((el) => el));
    return avglf;
};

const dist = (pt1, pt2) => {
    return Math.sqrt(Math.pow(pt1.x - pt2.x, 2) + Math.pow(pt1.y - pt2.y, 2));
};

const avgPoint = (array) => array.reduce((a, b) => {
    return {
        'x': (a.x + b.x) / 2,
        'y': (a.y + b.y) / 2,
    };
});
