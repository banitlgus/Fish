class Attractor {
    constructor(pos) {
        this.position = pos.copy();
        this.G = 0.5; // Gravitational constant for attraction
        this.mass = 20; // Mass of the attractor (makes it stronger)
    }

    attract(particle) {
        let force = p5.Vector.sub(this.position, particle.position);
        let distance = force.mag();
        distance = constrain(distance, 5, 50); // Limit distance for more consistent force
        force.normalize();
        let strength = (this.G * this.mass * particle.mass) / (distance * distance);
        force.mult(strength);
        return force;
    }
}
