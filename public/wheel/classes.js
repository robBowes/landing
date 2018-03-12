class Wheel {
    constructor(args) {
        this.center = args.center;
        this.diameter = args.diameter;
        this.tireSize = args.tireSize;
        this.numberOfSpokes = 10;
        this.rotation = 0;
    }
    show() {
        fill(0);
        ellipse(this.center.x, this.center.y, this.diameter);
        fill(255);
        ellipse(this.center.x, this.center.y, this.diameter - this.tireSize);
        fill(0);
        ellipse(this.center.x, this.center.y, this.diameter / 4);
        stroke(0);
        strokeWeight(5);
        for (let i = 0; i < this.numberOfSpokes; i++) {
            let angle = i * 2 * Math.PI / this.numberOfSpokes + this.rotation;
            line(this.center.x, this.center.y, this.center.x + sin(angle) * (this.diameter / 2 - 1), this.center.y + cos(angle) * (this.diameter / 2 - 1));
        }
    }
    rotate(speed) {
        this.rotation += speed / (this.diameter / 2);
    }
}

class Surface {
    constructor(args) {
        this.height = args.height;
        this.width = width;
        this.xoff = 0;
        this.points = 20;
    }
    show() {
        stroke(0);
        line(0, this.height, width, this.height);
        for (let i = 0; i <= this.points; i++) {
            point(((i * width) / this.points) + this.xoff, this.height - 2);
        }
    }
    move(speed) {
        this.xoff += speed;
        if (this.xoff > width / this.points) this.xoff = 0;
    }
}
