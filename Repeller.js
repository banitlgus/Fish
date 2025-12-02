class Repeller {
    constructor(pos) {
        this.position = pos.copy();
        this.G = -1; // Negative G for repulsion
        this.mass = 50; // Stronger mass for repeller
        this.radius = 40; // Visual radius for the click effect
        this.alpha = 200;
    }

    repel(particle) {
        let force = p5.Vector.sub(this.position, particle.position);
        let distance = force.mag();
        distance = constrain(distance, 1, 100); // Limit distance for repulsion
        force.normalize();
        let strength = (this.G * this.mass * particle.mass) / (distance * distance);
        force.mult(strength);

        // Mark particle as fleeing if it's close to the repeller
        if (distance < this.radius * 2) {
            particle.fleeing = true;
            particle.fleeingTimer = 0; // Reset timer
        }

        return force;
    }

    fade() {
        this.alpha -= 5; // Fade out over time
    }

    isFaded() {
        return this.alpha <= 0;
    }

    display() {
        noStroke();
        fill(255, 0, 0, this.alpha); // Red fading circle for repulsion
        ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
    }
}
