
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

let trees = [treeB, treeA, treeC, treeD, treeE, treeF];
// let trees = [treeA];

let interpreterRules = [];


setup = () => {
    let canvas = createCanvas(1200, 800);
    canvas.parent('sketch-holder');
    background(0);
    colorMode(HSB);
    let count = width/(trees.length+1);
    for (let tree of trees) {
        tree.currentLocation = createVector(count, height);
        count+=width/(trees.length+1);
        for (let i = 0; i < tree.n; i++) {
            tree = generate(tree);
        }
        interpreter(tree);
        console.dir(tree);
    }
};
let count = 2;
draw = () => {
    // background(0);
    // noLoop();
    frameRate(60);
    // for (let tree of trees) {
    //     for (let branch of tree.branches) {
    //         branch.show();
    //     }
    // }
    // trees[0].branches[count].show();
    // count++;
    for (let tree of trees) {
        if (tree.branches[count]) {
            tree.branches[count].show();
            tree.branches[count-1].show();
            tree.branches[count-2].show();
        }
    }
    count+=2;
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


interpreter = (treeObj) =>{
    let count = 0;
    for (let i = 0; i < treeObj.axiom.length; i++) {
        let current = treeObj.axiom[i];
        for (let rule of interpreterRules) {
            count++;
            if (current === rule.case) {
                rule.action(treeObj, i);
                break;
            }
        }
    }
    console.log(`count ${count}  string length: ${treeObj.axiom.length}`);
};


(()=>{
    interpreterRules.push({
        'case': 'F',
        'action': (args, i)=>{
            args.newBranch(i);
        },
    });
    interpreterRules.push({
        'case': '+',
        'action': (args)=>{
            args.currentAngle += args.angle;
        },
    });
    interpreterRules.push({
        'case': '-',
        'action': (args)=>{
            args.currentAngle -= args.angle;
        },
    });
    interpreterRules.push({
        'case': ']',
        'action': (args)=>{
            args.pop();
        },
    });
    interpreterRules.push({
        'case': '[',
        'action': (args)=>{
            args.push();
        },
    });
    interpreterRules.push({
        'case': 'X',
        'action': (args)=>{
        },
    });
})();
