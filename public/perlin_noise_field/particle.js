class Particle {
    constructor(pos, vel, acc) {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed = 4;
        this.color = [random(255), 255, 255]
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
    applyForce(force) {
        this.acc.add(force);
    }
    show() {
        // stroke(this.color[0], this.color[1], this.color[2], 5);
        stroke(this.color[0], 255, 255, 25);
        strokeWeight(2);
        point(this.pos.x, this.pos.y);
    }
    edges() {
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.y < 0) this.pos.y = height;
        if (this.pos.y > height) this.pos.y = 0;
    }
    follow(flowField) {
        let x = Math.floor(this.pos.x / scale);
        let y = Math.floor(this.pos.y / scale);
        let index = x + y * cols;
        let force = flowField[index];
        if (force) {
            this.applyForce(force);
        }
    }
}
