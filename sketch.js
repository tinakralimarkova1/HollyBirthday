
const CONFETTI_COLORS = [
    [142, 149, 244],  // periwinkle
    [255, 111, 97],   // coral
    [255, 224, 102],  // yellow
    [58, 63, 159],    // blueberry
    [255, 255, 255]  // white
  ];

let confetti = [];
const CONFETTI_RATE = 3;

let worldIndex = 0;     // which screen
let holly;              // player object

const PLAYER_SPEED = 4;


function spawnConfetti(count = 20) {
  for (let i = 0; i < count; i++) {
    confetti.push(new Confetti(random(width), -10));
  }
}



function setup() {
    createCanvas(windowWidth, windowHeight);
    spawnConfetti(40);
    holly = new Player(width / 2, height * 0.68);

  }

  
  function draw() {
    if (!isGameStarted()) {
      drawLanding();
    } else {
      drawGame();
    }
  }
  
  
  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

  function drawLanding() {
    background(142, 149, 244); // periwinkle
  
    // continuous confetti
    if (frameCount % 10 === 0) {
      spawnConfetti(CONFETTI_RATE);
    }
  
    for (let i = confetti.length - 1; i >= 0; i--) {
      confetti[i].update();
      confetti[i].draw();
      if (confetti[i].offscreen()) {
        confetti.splice(i, 1);
      }
    }
  }

  function drawGame() {
    drawWorld(worldIndex);
  
    holly.update();
    holly.draw();
  
    handleWorldTransitions();
    drawHUD();
  }

  function drawWorld(idx) {
    // Slight variation per "screen" so it feels like progression
    const base = [142, 149, 244]; // periwinkle base
    const shift = ((idx % 4) + 4) % 4; // 0..3 even for negatives
  
    background(base[0] - shift * 6, base[1] - shift * 3, base[2] + shift * 4);
  
    // Ground
    noStroke();
    fill(255, 255, 255, 90);
    rect(0, height * 0.75, width, height * 0.25);
  
    // temp items
    fill(255, 111, 97, 180); // coral
    rect(width * (0.12 + shift * 0.07), height * 0.58, 80, 140, 18);
  
    fill(255, 224, 102, 180); // yellow
    circle(width * (0.78 - shift * 0.03), height * 0.58, 90);
  
    // Screen label 
    fill(255, 255, 255, 160);
    textAlign(CENTER, TOP);
    textSize(18);
    text(`Screen ${idx}`, width / 2, 16);
  }
  
  function handleWorldTransitions() {
    // Walk off right edge => next screen
    if (holly.x > width + holly.w / 2) {
      worldIndex += 1;
      holly.x = -holly.w / 2;
    }
  
    // Walk off left edge => previous screen
    if (holly.x < -holly.w / 2) {
      worldIndex -= 1;
      holly.x = width + holly.w / 2;
    }
  }
  
  function drawHUD() {
    fill(255, 255, 255, 170);
    textAlign(LEFT, TOP);
    textSize(16);
    text("Move: ← → or A / D", 16, 16);
    // later: text(`Candles: ${candlesCollected}/22`, 16, 38);
  }
    


  class Player {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.w = 50;
      this.h = 70;
    }
  
    update() {
      let dx = 0;
      let dy = 0;
  
      // arrow keys or A/D
      if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) dx -= 1;
      if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) dx += 1;
  
      //arrow keys or W/S
      if (keyIsDown(UP_ARROW) || keyIsDown(87)) dy -= 1;
      if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) dy += 1;

      this.x += dx * PLAYER_SPEED;
  
      // keep on ground, fix later 
      this.y = height * 0.68;
    }
  

    // temp holly
    draw() {
      push();
      translate(this.x, this.y);
  
      // body
      noStroke();
      fill(255, 255, 255, 220);
      rectMode(CENTER);
      rect(0, 20, 34, 44, 16);
  
      // head
      fill(255, 245, 230);
      circle(0, -10, 42);
  
      // hair
      fill(58, 63, 159, 220);
      arc(0, -14, 46, 46, PI, TWO_PI);
  
      pop();
    }
  }
  

  

  class Confetti {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = random(6, 12);
      this.color = random(CONFETTI_COLORS);
      this.speedY = random(1, 3);
      this.speedX = random(-1, 1);
      this.rotation = random(TWO_PI);
      this.rotationSpeed = random(-0.05, 0.05);
    }
  
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.rotation += this.rotationSpeed;
    }
  
    draw() {
      push();
      translate(this.x, this.y);
      rotate(this.rotation);
      noStroke();
      fill(...this.color);
      rect(0, 0, this.size, this.size * 0.6, 2);
      pop();
    }
  
    offscreen() {
      return this.y > height + 20;
    }
  }
  
  