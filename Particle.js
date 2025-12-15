class Particle {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(0.5, 2));
        this.acceleration = createVector(0, 0);
        this.mass = random(1, 3);
        this.r = sqrt(this.mass) * 8; // Size based on mass
        this.color = color(random(100, 255), random(150, 255), random(200, 255), 200); // Fishy colors
        this.originalColor = this.color;
        this.fleeing = false;
        this.fleeingTimer = 0;
    }

    applyForce(force,value) {
        let f = p5.Vector.mult(force, value/5);
        this.acceleration.add(f);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(10); // Max speed
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

    display() {
        push();
        translate(this.position.x, this.position.y);
        let angle = this.velocity.heading();
        rotate(angle);

        noStroke();
        fill(this.color);

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

    edges() {
        let bounce = -0.8; // How much to bounce off walls
        let margin = 10; // Margin from the actual aquarium edge

        // Left wall
        if (this.position.x - this.r < aquariumX + margin) {
            this.position.x = aquariumX + margin + this.r;
            this.velocity.x *= bounce;
        }
        // Right wall
        if (this.position.x + this.r > aquariumX + aquariumWidth - margin) {
            this.position.x = aquariumX + aquariumWidth - margin - this.r;
            this.velocity.x *= bounce;
        }
        // Top wall
        if (this.position.y - this.r < aquariumY + margin) {
            this.position.y = aquariumY + margin + this.r;
            this.velocity.y *= bounce;
        }
        // Bottom wall
        if (this.position.y + this.r > aquariumY + aquariumHeight - margin) {
            this.position.y = aquariumY + aquariumHeight - margin - this.r;
            this.velocity.y *= bounce;
        }
    }
}
