/**
* Creates a branch for a fractal tree.
*/
class Branch {
    constructor(initial, final) {
        this.initial = initial;
        this.final = final;
        this.finished = false;
        this.color = color(random(100,150), random(60,80), random(15,30));
    }
    /**
    * Displays the branch on the canvas.
    */
    show () {
        stroke(255);
        line(this.initial.x, this.initial.y, this.final.x, this.final.y)
    }
    /**
    * Makes a new branch at the end of the current branch in the direction angle
    */
    fork(angle) {
        let dir = p5.Vector.sub(this.final, this.initial);
        dir.rotate(angle);
        dir.div(1.3);
        let newFinal = p5.Vector.add(this.final, dir);
        let newBranch = new Branch(this.final, newFinal)
        return newBranch;
    }
}
