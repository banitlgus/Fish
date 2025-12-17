class Cat extends Particle {
  constructor(x, y) {
    super(x, y);
  }

  display() {
    push();
    translate(this.position.x, this.position.y);
    let angle = this.velocity.heading();
    rotate(angle);
    scale(0.7);

    // Body
    noStroke();
    fill(50); // Charcoal cat
    ellipse(0, 0, 30, 50); // Body

    // Head
    ellipse(0, -25, 30, 30); // Head

    // Ears
    fill(50);
    triangle(-12, -35, -5, -45, -2, -35); // Left Ear
    triangle(12, -35, 5, -45, 2, -35);   // Right Ear


    fill(255, 255, 200); // Normal eyes
    ellipse(-6, -28, 8, 6);
    ellipse(6, -28, 8, 6);
    fill(0);
    ellipse(-6, -28, 2, 5); // Slit pupils
    ellipse(6, -28, 2, 5);

    pop();
  }


}