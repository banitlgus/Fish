class EFish extends Particle {
    constructor(x,y) {
        super(x,y);
        this.color = color(random(0, 255), random(0, 255), random(0, 255), 250);
    }

    applyForce(force) {
        let f = p5.Vector.mult(force, 5);
        this.acceleration.add(f);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(4); // Max speed
        this.position.add(this.velocity);
        this.acceleration.mult(0); // Reset acceleration

        // Simple friction/drag
        this.velocity.mult(0.98);

        // Color change when fleeing
        if (this.fleeing) {
            this.color = color(255, 100, 100, 200); // Reddish when scared
            this.fleeingTimer++;
            if (this.fleeingTimer > 60) { // Reset after 1 second
                this.fleeing = false;
                this.color = this.originalColor;
                this.fleeingTimer = 0;
            }
        } else {
            this.color = this.originalColor;
        }
    }


}