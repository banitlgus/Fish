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
    particles.push(new Particle(width/2, height/2));
  }
  // for (let i = 0; i < 8; i++) {
  //   particles.push(new EFish(random(aquariumX + 20, aquariumX + aquariumWidth - 20),
  //     random(aquariumY + 20, aquariumY + aquariumHeight - 20)));
  // }
  // for (let i = 0; i < 7; i++) {
  //   particles.push(new IFish(width/2, height/2));
  // }


  // UI
  numberSlider = createSlider(0, 30, 5);
  numberSlider.position(20,20);

  EISlider = createSlider(0, 50, 3);
  EISlider.position(20,40);

  TFSlider = createSlider(0, 50, 3);
  TFSlider.position(20,60);
}

function draw() {
  background(220, 240, 255); // Light blue for water

  // Draw aquarium
  stroke(100, 150, 255);
  strokeWeight(5);
  noFill();
  // rect(aquariumX, aquariumY, aquariumWidth, aquariumHeight, 20); // Rounded corners

  // Update attractor position to mouse
  attractor.position.set(mouseX, mouseY);

  const fishCount = numberSlider.value();

  for (let i = 0; i < fishCount; i++) {
    let p = particles[i];

    // Apply attraction force from mouse (food)
    let attractionForce = attractor.attract(p);
    const EI = EISlider.value();
    p.applyForce(attractionForce,EI);

    // Apply repulsion forces from clicks (finger)
    for (let r of repellers) {
      let repulsionForce = r.repel(p);
      const TF = TFSlider.value();
      p.applyForce(repulsionForce,TF);
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


