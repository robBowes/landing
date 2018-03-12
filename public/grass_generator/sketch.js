console.log();
let treeA = new Tree({
    'axiom': 'F',
    'branchLength': 2,
    'axiomRules': [{
        'thisGen': 'F',
        'nextGen': 'F[+F]F[-F]F',
    }],
    'angle': -25.7*Math.PI/180,
    'n': 5,
});

setup = () => {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    $('.generate').on('click', ()=>generate());
    $('.clear').on('click', ()=>redraw());
    $('.grow').on('click', ()=>grow());
    noLoop();
};

draw = () => {
    background(0);
};
clear = () => {
    ;
};

generate = () =>{
    console.log('new tree');
    let tree = new Tree({
        'axiom': 'F',
        'branchLength': 4,
        'axiomRules': [{
            'thisGen': 'F',
            'nextGen': 'FF-[-F+F+F]+[+F-F-F]',
        }],
        'angle': -document.getElementById('branch_angle').value*Math.PI/180,
        'n': 4,
        'currentLocation': createVector(parseInt(document.getElementById('base').value), 600),
        'currentAngle': document.getElementById('angle').value*Math.PI/180,
    });
    tree.grow();
    tree.showAll();
};
let count = 0;
grow = () =>{
    let tree = new Tree({
        'axiom': 'F',
        'branchLength': 2,
        'axiomRules': [{
            'thisGen': 'F',
            'nextGen': 'F[+F]F[-F]F',
        }],
        'angle': -document.getElementById('branch_angle').value*Math.PI/180,
        'n': count,
        'currentLocation': createVector(parseInt(document.getElementById('base').value), 600),
        'currentAngle': document.getElementById('angle').value*Math.PI/180,
    });
    count++;
    console.log(count);
    tree.grow();
    tree.showAll();
};
