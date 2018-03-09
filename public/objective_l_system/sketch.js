/*
* First we create some trees to draw. The axioms for these trees are all from
* http://algorithmicbotany.org/papers/abop/abop-ch1.pdf
*
*/
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
let treeB = new Tree({
    'axiom': 'F',
    'branchLength': 8,
    'axiomRules': [{
        'thisGen': 'F',
        'nextGen': 'F[+F]F[-F][F]',
    }],
    'angle': -20*Math.PI/180,
    'n': 5,
});
let treeC = new Tree({
    'axiom': 'F',
    'branchLength': 6,
    'axiomRules': [{
        'thisGen': 'F',
        'nextGen': 'FF-[-F+F+F]+[+F-F-F]',
    }],
    'angle': -22.5*Math.PI/180,
    'n': 4,
    'currentAngle': -Math.PI/12,
});
let treeD = new Tree({
    'axiom': 'X',
    'branchLength': 2,
    'axiomRules': [{
        'thisGen': 'F',
        'nextGen': 'FF',
    },
    {
        'thisGen': 'X',
        'nextGen': 'F[+X]F[-X]+X',
    }],
    'angle': 20*Math.PI/180,
    'n': 7,
});
let treeE = new Tree({
    'axiom': 'X',
    'branchLength': 2,
    'axiomRules': [{
        'thisGen': 'F',
        'nextGen': 'FF',
    },
    {
        'thisGen': 'X',
        'nextGen': 'F[+X][-X]FX',
    }],
    'angle': 25.7*Math.PI/180,
    'n': 7,
});
let treeF = new Tree({
    'axiom': 'X',
    'branchLength': 5,
    'axiomRules': [{
        'thisGen': 'F',
        'nextGen': 'FF',
    },
    {
        'thisGen': 'X',
        'nextGen': '→F-[[X]+X]+F[+FX]-X',
    }],
    'angle': 22.5*Math.PI/180,
    'n': 5,
});

/*
* Put the trees into an array
*/
let trees = [treeB, treeA, treeC, treeD, treeE, treeF];
// let trees = [treeA];

setup = () => {
    let canvas = createCanvas(1200, 800);
    canvas.parent('sketch-holder');
    background(0);
    /*
    * The location to draw the treeBase
    */
    let treeBase = width/(trees.length+1);
    /*
    * Iterate through the array of trees and give them bases along the bottom of
    * the createCanvas
    */
    for (let tree of trees) {
        tree.currentLocation = createVector(treeBase, height);
        treeBase+=width/(trees.length+1);
        /*
        * using the axiom rules defined in the tree, generate the tree axioms
        */
        for (let i = 0; i < tree.n; i++) {
            tree = generate(tree);
        }
        /*
        * Run the interpreter on each tree
        */
        interpreter(tree);
    }
};

draw = () => {
    frameRate(60);
    for (let tree of trees) {
        tree.show();
    }
};


generate = (treeObj) =>{
    if (treeObj.axiom.length < 100000) {
        let nextGen = '';
        for (let i = 0; i < treeObj.axiom.length; i++) {
            let current = treeObj.axiom.charAt(i);
            let noMatch = true;
            for (let i = 0; i < treeObj.axiomRules.length; i++) {
                if (current === treeObj.axiomRules[i].thisGen) {
                    nextGen += treeObj.axiomRules[i].nextGen;
                    noMatch = false;
                    break;
                }
            };
            if (noMatch) {
                nextGen += current;
            };
        };
        treeObj.axiom = nextGen;
        return treeObj;
    }
};
let interpreterRules = [
    {
        'case': 'F',
        'action': (args, i)=>{
            args.newBranch(i);
        },
    },
    {
        'case': '+',
        'action': (args)=>{
            args.currentAngle += args.angle;
        },
    },
    {
        'case': '-',
        'action': (args)=>{
            args.currentAngle -= args.angle;
        },
    },
    {
        'case': ']',
        'action': (args)=>{
            args.pop();
        },
    },
    {
        'case': '[',
        'action': (args)=>{
            args.push();
        },
    },
    {
        'case': 'X',
        'action': (args)=>{
        },
    },
];

interpreter = (treeObj) =>{
    for (let i = 0; i < treeObj.axiom.length; i++) {
        let current = treeObj.axiom[i];
        for (let rule of interpreterRules) {
            if (current === rule.case) {
                rule.action(treeObj, i);
                break;
            }
        }
    }
    console.dir(treeObj);
    console.log(
        `Axiom length: ${treeObj.axiom.length}
        Tree branches: ${treeObj.branches.length}`
    );
};
