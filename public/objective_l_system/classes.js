class Branch {
    constructor(initial, final, distanceFromBase, axiomLength, i) {
        this.initial = initial;
        this.final = final;
        this.distanceFromBase = distanceFromBase;
        this.isLast = false;
        this.axiomLength = axiomLength;
        this.i = i;
    }

    show() {
        colorMode(HSB);
        if (this.isLast) {
            stroke('green');
            line(this.initial.x, this.initial.y, this.final.x, this.final.y);
            stroke(this.i/this.axiomLength*200+55);
            noFill();
            point(this.final.x, this.final.y);
            // ellipse(this.final.x, this.final.y, 1, 1);
        } else {
            stroke(0, 59, 41);
            line(this.initial.x, this.initial.y, this.final.x, this.final.y);
        }
    }
}

class Tree {
    constructor(args) {
        this.axiom = args.axiom;
        this.currentLocation = args.currentLocation;
        this.branchLength = args.branchLength;
        this.angle = args.angle;
        this.axiomRules = args.axiomRules;
        this.n = args.n;
        this.currentAngle = args.currentAngle || 0;
        this.distanceFromBase = 0;
        this.branches = [];
        this.drawSettings = [];
        this.lastBranchShown = 2;
        this.generateAxiom();
    }

    newBranch(i) {
        let next = createVector(0, -this.branchLength);
        next.rotate(this.currentAngle);
        let nextEnd = p5.Vector.add(this.currentLocation, next);
        this.branches.push(
            new Branch(this.currentLocation, nextEnd,
                this.distanceFromBase, this.axiom.length, i
            ));
            this.currentLocation = nextEnd;
            this.distanceFromBase++;
        }

        pop() {
            let x = this.drawSettings.pop();
            this.currentLocation = x.location;
            this.currentAngle = x.angle;
            this.distanceFromBase = x.distanceFromBase;
            this.branches[this.branches.length-1].isLast = true;
        }

        push() {
            this.drawSettings.push({
                'location': createVector(this.currentLocation.x, this.currentLocation.y),
                'angle': this.currentAngle,
                'distanceFromBase': this.distanceFromBase,
            });
        }

        show() {
            if (this.branches[this.lastBranchShown]) {
                this.branches[this.lastBranchShown].show();
                this.branches[this.lastBranchShown-1].show();
                this.branches[this.lastBranchShown-2].show();
            }
            this.lastBranchShown+=2;
        }
        generateAxiom() {
            if (this.axiom.length>100000) throw new Error('Maximum axiom length exceeded');
            for (let i = 0; i < this.n; i++) {
                let nextGen = '';
                for (let i = 0; i < this.axiom.length; i++) {
                    let current = this.axiom.charAt(i);
                    let noMatch = true;
                    for (let i = 0; i < this.axiomRules.length; i++) {
                        if (current === this.axiomRules[i].thisGen) {
                            nextGen += this.axiomRules[i].nextGen;
                            noMatch = false;
                            break;
                        }
                    };
                    if (noMatch) {
                        nextGen += current;
                    };
                };
                this.axiom = nextGen;
            }
        };
        grow() {
            let interpreterRules = [
                {
                    'case': 'F',
                    'action': (i)=>{
                        this.newBranch(i);
                    },
                },
                {
                    'case': '+',
                    'action': ()=>{
                        this.currentAngle += this.angle;
                    },
                },
                {
                    'case': '-',
                    'action': ()=>{
                        this.currentAngle -= this.angle;
                    },
                },
                {
                    'case': ']',
                    'action': ()=>{
                        this.pop();
                    },
                },
                {
                    'case': '[',
                    'action': ()=>{
                        this.push();
                    },
                },
                {
                    'case': 'X',
                    'action': ()=>{
                    },
                },
            ];
            for (let i = 0; i < this.axiom.length; i++) {
                let current = this.axiom[i];
                for (let rule of interpreterRules) {
                    if (current === rule.case) {
                        rule.action(i);
                        break;
                    }
                }
            }
            console.dir(this);
            console.log(
                `Axiom length: ${this.axiom.length}
                Tree branches: ${this.branches.length}`
            );
        };
    }
