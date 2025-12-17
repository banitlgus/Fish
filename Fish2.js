class Cat extends Particle {
    constructor(x, y) {
        super(x, y);
    }

    applyForce(force) {
        let f = p5.Vector.div(force, 5);
        this.acceleration.add(f);
    }

    // display() {
    //     push();
    //     translate(this.position.x, this.position.y);
    //     let angle = this.velocity.heading();
    //     rotate(angle);

    //     noStroke();
    //     fill(0);

    //     // Draw fish body (oval)
    //     ellipse(-this.r / 2, 0, this.r * 1.5, this.r);

    //     // Draw tail fin (triangle)
    //     let tailWidth = this.r * 0.8;
    //     let tailLength = this.r * 0.8;
    //     triangle(-this.r * 1.5, 0,
    //         -this.r * 1.5 - tailLength, -tailWidth / 2,
    //         -this.r * 1.5 - tailLength, tailWidth / 2);

    //     // Draw eye
    //     fill(0);
    //     ellipse(this.r * 0.4, -this.r * 0.25, this.r * 0.2, this.r * 0.2);

    //     pop();
    // }

  display() {
    push();
    translate(this.position.x, this.position.y);
    
    // Rotate towards velocity if moving, else stay put
    if (this.vel.mag() > 0.1) {
      rotate(this.vel.heading() + PI / 2);
    }
    
    // Determine visuals based on state
    if (this.state === 'fleeing') {
      // Scared cat: elongated, ears back
      scale(0.9, 1.2);
    } else if (this.state === 'eating') {
      // Eating: crouched
      scale(1.1, 0.9);
    }

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

    // Eyes
    if (this.state === 'fleeing') {
      fill(255); // Wide eyes
      ellipse(-6, -28, 10, 10);
      ellipse(6, -28, 10, 10);
      fill(0);
      ellipse(-6, -28, 2, 2);
      ellipse(6, -28, 2, 2);
    } else if (this.state === 'eating') {
      stroke(255);
      strokeWeight(2);
      line(-10, -28, -2, -28); // Closed happy eyes
      line(2, -28, 10, -28);
    } else {
      fill(255, 255, 200); // Normal eyes
      ellipse(-6, -28, 8, 6);
      ellipse(6, -28, 8, 6);
      fill(0);
      ellipse(-6, -28, 2, 5); // Slit pupils
      ellipse(6, -28, 2, 5);
    }


}
}