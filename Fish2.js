class IFish extends Particle {
    constructor(x, y) {
        super(x, y);
    }

    applyForce(force) {
        let f = p5.Vector.div(force, 5);
        this.acceleration.add(f);
    }

    display() {
        push();
        translate(this.position.x, this.position.y);
        let angle = this.velocity.heading();
        rotate(angle);

        noStroke();
        fill(0);

        // Draw fish body (oval)
        ellipse(-this.r / 2, 0, this.r * 1.5, this.r);

        // Draw tail fin (triangle)
        let tailWidth = this.r * 0.8;
        let tailLength = this.r * 0.8;
        triangle(-this.r * 1.5, 0,
            -this.r * 1.5 - tailLength, -tailWidth / 2,
            -this.r * 1.5 - tailLength, tailWidth / 2);

        // Draw eye
        fill(0);
        ellipse(this.r * 0.4, -this.r * 0.25, this.r * 0.2, this.r * 0.2);

        pop();
    }


}