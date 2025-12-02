let particles = [];
let attractor;
let repellers = [];
let aquariumWidth = 700;
let aquariumHeight = 500;
let aquariumX, aquariumY;

function setup() {
  createCanvas(800, 600);
  aquariumX = (width - aquariumWidth) / 2;
  aquariumY = (height - aquariumHeight) / 2;

  attractor = new Attractor(createVector(mouseX, mouseY));

  // Initialize a few fish particles
  for (let i = 0; i < 30; i++) {
    particles.push(new Particle(random(aquariumX + 20, aquariumX + aquariumWidth - 20),
                                random(aquariumY + 20, aquariumY + aquariumHeight - 20)));
  }
}

function draw() {
  background(220, 240, 255); // Light blue for water

  // Draw aquarium
  stroke(100, 150, 255);
  strokeWeight(5);
  noFill();
  rect(aquariumX, aquariumY, aquariumWidth, aquariumHeight, 20); // Rounded corners

  // Update attractor position to mouse
  attractor.position.set(mouseX, mouseY);

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];

    // Apply attraction force from mouse (food)
    let attractionForce = attractor.attract(p);
    p.applyForce(attractionForce);

    // Apply repulsion forces from clicks (finger)
    for (let r of repellers) {
      let repulsionForce = r.repel(p);
      p.applyForce(repulsionForce);
    }

    p.update();
    p.edges(); // Keep particles within aquarium
    p.display();
  }

  // Draw repellers temporarily
  for (let i = repellers.length - 1; i >= 0; i--) {
    repellers[i].display();
    repellers[i].fade();
    if (repellers[i].isFaded()) {
      repellers.splice(i, 1);
    }
  }

  // Draw a subtle 'food' indicator at the mouse position
  fill(255, 200, 0, 150);
  noStroke();
  ellipse(mouseX, mouseY, 15, 15);
  fill(255, 220, 0, 100);
  ellipse(mouseX, mouseY, 25, 25);
}

function mousePressed() {
  // Add a repeller when mouse is clicked
  if (mouseX > aquariumX && mouseX < aquariumX + aquariumWidth &&
      mouseY > aquariumY && mouseY < aquariumY + aquariumHeight) {
    repellers.push(new Repeller(createVector(mouseX, mouseY)));
  }
}

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

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
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
