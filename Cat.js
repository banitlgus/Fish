class Cat extends Particle {
  constructor(x, y) {
    super(x, y);
  }

  display() {
    push();
    translate(this.position.x, this.position.y);

    let angle = atan2(mouseY - this.position.y, mouseX - this.position.x);
    rotate(angle + HALF_PI);
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



    // Tail (Animated)
    noFill();
    stroke(50);
    strokeWeight(6);
    this.tailAngle += 0.2;
    let tailWag = sin(this.tailAngle) * 10;
       // Puffed tail straight back
       line(0, 20, 0, 60);
       // Waggly tail
       beginShape();
       vertex(0, 20);
       bezierVertex(10, 30, -10 + tailWag, 50, 0 + tailWag, 60);
       endShape();
    



    pop();
  }
}
