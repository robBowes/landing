
let thisGen = 'X';
let len = 160;
const ANGLE = 25*Math.PI/180;
let rules = [];
// rules.push({
//     'thisGen': 'F',
//     'nextGen': 'FF+[+F-F-F]-[-F+F+F]'
// });
rules.push({
    'thisGen': 'F',
    'nextGen': 'FF',
});
rules.push({
    'thisGen': 'X',
    'nextGen': 'F-[[X]+X]+F[+FX]-X',
});

generate = () =>{
    len*=0.65;
    if (len > 5) {
        let nextGen = '';
        for (let i = 0; i < thisGen.length; i++) {
            let current = thisGen.charAt(i);
            let noMatch = true;
            for (let i = 0; i < rules.length; i++) {
                if (current === rules[i].thisGen) {
                    nextGen += rules[i].nextGen;
                    noMatch = false;
                    break;
                }
            };
            if (noMatch) {
                nextGen += current;
            };
        };
        thisGen = nextGen;
    }
};

turtle = () =>{
    let count = 0;
    stroke(255);
    for (let i = 0; i < thisGen.length; i++) {
        count++;
        let current = thisGen[i];
        switch (current) {
            case 'F':
                line(0, 0, 0, -len);
                translate(0, -len);
                break;
            case '+':
                rotate(ANGLE);
                break;
            case '-':
                rotate(-ANGLE);
                break;
            case '[':
                push();
                break;
            case ']':
                pop();
                break;
            default:
        }
    }
    console.log(`count ${count}  string length: ${thisGen.length}`);
};

setup = () => {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    background(0);
};

draw = () => {
    noLoop();
    translate(width/3, height);
    for (let i = 0; i < 12; i++) {
        generate();
    }
    console.log(thisGen);
    turtle();
};
