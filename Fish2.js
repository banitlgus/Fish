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
    let angle = this.velocity.heading();
    rotate(angle);
    
    noStroke();
    fill(this.color);

    // Tail (Wiggling)
    let wiggle = sin(frameCount * 0.2 + this.tailOffset) * 10;
    stroke(this.color);
    strokeWeight(6);
    noFill();
    beginShape();
    vertex(0, 10);
    bezierVertex(0, 30, wiggle, 40, wiggle, 50);
    endShape();
    
    // Body
    noStroke();
    fill(this.color);
    ellipse(0, 0, this.r * 1.5, this.r * 2);
    
    // Ears
    triangle(-this.r * 0.5, -this.r * 0.8, -this.r * 0.8, -this.r * 1.4, -this.r * 0.2, -this.r * 0.9);
    triangle(this.r * 0.5, -this.r * 0.8, this.r * 0.8, -this.r * 1.4, this.r * 0.2, -this.r * 0.9);

    // // Eyes
    // fill(255); // Whites
    // ellipse(-this.r * 0.3, -this.r * 0.4, 8, 8);
    // ellipse(this.r * 0.3, -this.r * 0.4, 8, 8);
    // fill(0); // Pupils
    // ellipse(-this.r * 0.3, -this.r * 0.4, 3, 3);
    // ellipse(this.r * 0.3, -this.r * 0.4, 3, 3);
    
    // Whiskers
    stroke(200);
    strokeWeight(1);
    line(-5, 5, -25, 0);
    line(-5, 8, -25, 10);
    line(5, 5, 25, 0);
    line(5, 8, 25, 10);

    pop();
  }


}