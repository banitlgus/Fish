class Fish2 extends Particle {
    constructor(x, y) {
        super(x, y);
    }

    applyForce(force) {
        let f = p5.Vector.mult(force, 1.5);
        this.acceleration.add(f);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(10); // Max speed
        this.position.add(this.velocity);
        this.acceleration.mult(0); // Reset acceleration

        // Simple friction/drag
        this.velocity.mult(0.99);

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