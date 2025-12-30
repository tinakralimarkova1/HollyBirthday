// confetti
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

// animations
let hollyIdleFrames = [];

// bedroom furniture
let bedImg;






function spawnConfetti(count = 20) {
  for (let i = 0; i < count; i++) {
    confetti.push(new Confetti(random(width), -10));
  }
}

function preload() {
    // holly animations
    hollyBreatheFrames = loadFrameSequence("assets/Holly/Breathe/Breathe-0", 5);
    hollyWalkFrames = loadFrameSequence("assets/Holly/Walk/Walk-0", 6);

    // bedroom furniture
    bedImg = loadImage("assets/Bedroom/Bed.png");
  }
  
  function loadFrameSequence(prefix, count) {
    const frames = [];
    for (let i = 1; i < count; i++) {
      frames.push(loadImage(`${prefix}${i}.png`));
    }
    return frames;
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
    if (idx === 0) {
      drawBedroom();
    } else {
      drawGenericWorld(idx);
    }
  }

  function drawGenericWorld(idx) {
    const base = [142, 149, 244];
    const shift = ((idx % 4) + 4) % 4;
  
    background(
      base[0] - shift * 6,
      base[1] - shift * 3,
      base[2] + shift * 4
    );
  
    // Ground
    noStroke();
    fill(255, 255, 255, 90);
    rect(0, height * 0.75, width, height * 0.25);
  
    fill(255, 255, 255, 160);
    textAlign(CENTER, TOP);
    textSize(18);
    text(`Screen ${idx}`, width / 2, 16);
  }

  
  function drawBedroom() {
    // Background wall
    background(142, 149, 244); // periwinkle
  
    // Floor
    noStroke();
    fill(255, 255, 255, 90);
    rect(0, height * 0.75, width, height * 0.25);
  
    // --- WINDOW ---
    drawWindow(width * 0.7, height * 0.25, 160, 140);

    //Bed 
    const aspect = bedImg.height / bedImg.width;
  const targetHeight = 520 * aspect;

  imageMode(CENTER);
  image(bedImg, width * 0.18, height * 0.68, 420, targetHeight);
  
   
  
    // Screen label (temporary)
    fill(255, 255, 255, 160);
    textAlign(CENTER, TOP);
    textSize(18);
    text("Holly's Bedroom", width / 2, 16);
  }
  

  function drawWindow(x, y, w, h) {
  push();
  translate(x, y);

  // frame
  fill(255, 255, 255, 200);
  rect(-w / 2, -h / 2, w, h, 12);

  // sky
  fill(180, 200, 255);
  rect(-w / 2 + 8, -h / 2 + 8, w - 16, h - 16, 8);

  // cross bars
  stroke(255);
  strokeWeight(3);
  line(0, -h / 2 + 8, 0, h / 2 - 8);
  line(-w / 2 + 8, 0, w / 2 - 8, 0);

  pop();
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
        this.animTime = 0;
        this.animFPS = 5;
        this.facing = 1;      // 1 = right, -1 = left
        this.isWalking = false;

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
    
        // keep on ground, fix later? 
        this.y = height * 0.68;

        this.isWalking = dx !== 0;
        if (dx < 0) this.facing = -1;
        if (dx > 0) this.facing = 1;

        this.animTime += deltaTime / 1000;

    }
  

    // holly animations 
    draw() {
        const frames = this.isWalking ? hollyWalkFrames : hollyBreatheFrames;
        const frameIndex =
          Math.floor(this.animTime * this.animFPS) % frames.length;
        const img = frames[frameIndex];
        
        push();
        translate(this.x, this.y);
        
        // left
        if (this.facing === -1) scale(-1, 1);
        
        imageMode(CENTER);
        
        // scale 
        const targetH = 670;
        const targetW = targetH * (img.width / img.height);
        
        image(img, 0, 0, targetW, targetH);
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
  
  