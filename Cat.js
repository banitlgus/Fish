class Cat extends Particle {
  constructor(x, y) {
    super(x, y);
    this.tailAngle = 0;
    
    this.maxSpeed = 3;
    this.maxForce = 0.2;
  }

  chase(target) {
    if (!target) return;

    // 1) desired velocity = target 방향
    let desired = p5.Vector.sub(target.position, this.position);
    let d = desired.mag();

    // 너무 가까우면 속도 줄이기 (도착/버벅임 방지)
    let speed = this.maxSpeed;
    if (d < 80) speed = map(d, 0, 80, 0, this.maxSpeed);
    desired.setMag(speed);

    // 2) steering = desired - current velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);

    // applyForce는 value/5를 곱하니까 value=5면 그대로 들어감
    this.applyForce(steer, 5);
  }

  display(target) {
    push();
    translate(this.position.x, this.position.y);

    let angle = 0;
     if (target) angle = atan2(target.position.y - this.position.y, target.position.x - this.position.x);
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

       // Waggly tail
       beginShape();
       vertex(0, 20);
       bezierVertex(10, 30, -10 + tailWag, 50, 0 + tailWag, 60);
       endShape();
    



    pop();
  }
}
