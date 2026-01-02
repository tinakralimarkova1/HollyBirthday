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

const PLAYER_SPEED = 8;


//candles 
const TOTAL_CANDLES = 22;

let candleImg;
let candles = [];           // array of candle objects
let candlesCollected = 0;

let interactPressed = false; // set true when E is pressed


// animations
let hollyIdleFrames = [];

// bedroom furniture
let bedImg;
let lampImg;
let DeskImg;
let rugImg;
let BookshelfImg;
let mavImg;

//mav state
let mav = {
    screen: 0,
    x: () => width * 0.23,
    y: () => height * 0.6,
    moved: false,
    offsetX: 0 // how far mav slides
  };
  




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
    lampImg = loadImage("assets/Bedroom/lamp.png");
    DeskImg = loadImage("assets/Bedroom/Desk3.png");
    rugImg = loadImage("assets/Bedroom/Rug.png");
    BookshelfImg = loadImage("assets/Bedroom/Bookshelf.png");
    mavImg = loadImage("assets/Bedroom/mav.png");


    // candles
    candleImg = loadImage("assets/General/Candle.png");



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
    initCandles();


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
    noCursor();
    drawWorld(worldIndex);
    drawCandles(worldIndex);
  
    holly.update();
    holly.draw();

    tryCollectCandles(worldIndex);
  
    handleWorldTransitions();
    drawHUD();
    drawCandleHUD();  
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

    push();
    imageMode(CENTER);
    scale(1,1.7);
    translate(width * 0.5, height * 0.5);
    image(rugImg, 0, 0, width * 0.8, height * 0.5);
    pop();
  
    // window
    drawWindow(width /4.2, height /2.2, 460, 300);

    // bed
    push();
    imageMode(CENTER);
    
    translate(width * 0.19, height * 0.68);
    scale(-1, 1);
    image(bedImg, 0, 0, width * 0.4, height * 0.87);
    
    pop();

    // mav
    push();
    imageMode(CENTER);
    translate(
    mav.x() + mav.offsetX,
    mav.y()
    );
    image(mavImg, 0, 0, width * 0.2, height * 0.3);
    pop();

    //lamp
    push();
    imageMode(CENTER);
    scale(1,1.3);
    translate(width * 0.5, 70);
    image(lampImg, 0, 0, width * 0.2, height * 0.2);
    pop();

    //desk
    push();
    imageMode(CENTER);
    scale(1,1.7);
    translate(width * 0.8, height * 0.39);
    image(DeskImg, 0, 0, width * 0.3, height * 0.25);
    pop();

    //bookshelf
    push();
    imageMode(CENTER);
    scale(1,1);
    translate(width * 0.6, height * 0.39);
    image(BookshelfImg, 0, 0, width * 0.3, height * 0.25);
    pop();
  
    //mav interaction 
    if (!mav.moved && isPlayerNearPoint(mav.x(), mav.y(), 200)) {
        fill(230,20,20);
        textAlign(CENTER,BOTTOM);
        textSize(14);
        text("Press E", mav.x()+15, mav.y() - 100);
      }
      
   
  
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
  strokeWeight(7);
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
  

  
// candle functions
  function initCandles() {
    candles = [
      // bedroom 

      // candle behind Mav (locked)
    {
        id: 99,
        screen: 0,
        x: () => width * 0.23,
        y: () => height * 0.62,
        collected: false,
        unlocked: false
      }
    ];
  
    
  }

  
  function drawCandles(screenIdx) {
    if (!candleImg) return;
  
    for (const c of candles) {
      const unlocked = (c.unlocked === undefined) ? true : c.unlocked;
  
      if (c.collected || !unlocked) continue;
      if (c.screen !== screenIdx) continue;
  
      const cx = c.x();
      const cy = c.y();
  
      const w = 150;
      const h = 150;
  
      imageMode(CENTER);
      image(candleImg, cx, cy, w, h);
  
      if (isPlayerNearPoint(cx, cy, 150)) {
        noFill();
        stroke(255, 255, 255, 100);
        strokeWeight(3);
        circle(cx, cy, 70);
        noStroke();
  
        fill(255, 255, 255, 220);
        textAlign(CENTER, BOTTOM);
        textSize(14);
        text("Press C", cx, cy - 40);
      }
    }
  }
  
  
  function tryCollectCandles(screenIdx) {
    if (!interactPressed) return;
  
    for (const c of candles) {
      if (c.collected) continue;
      if (c.screen !== screenIdx) continue;
  
      const cx = c.x();
      const cy = c.y();
  
      if (isPlayerNearPoint(cx, cy, 150)) {
        c.collected = true;
        candlesCollected += 1;
  
       //celebrate?
        spawnConfetti(20);
  
        break; // collect only one per press
      }
    }
  
    interactPressed = false; // consume the press
  }
  
  function isPlayerNearPoint(px, py, radius) {
    // adjust holly's y anchor if needed
    const hx = holly.x ;
    const hy = holly.y;
    return dist(hx, hy, px, py) < radius;
  }

  function keyPressed() {
    // E key
    if (key === "e" || key === "E") {
      tryInteractWithMav();
    }
    if (key === "c" || key === "C") {
        interactPressed = true;
    }
  }

  function drawCandleHUD() {
    if (!candleImg) return;
  
    const margin = 20;       // distance from screen edge
    const iconW = 60;        // candle size
    const iconH = 40;
  
    const totalWidth =
      TOTAL_CANDLES * iconW + (TOTAL_CANDLES - 1)- 770 ;
  
    const xStart = width - totalWidth - margin;
    const yStart = margin;
  
    // background strip
    noStroke();
    fill(255, 255, 255, 70);
    rect(
      xStart - 12,
      yStart - 10,
      totalWidth + 24,
      iconH + 20,
      14
    );
  
    imageMode(CORNER);
  
    const collectedCount = candles.filter(c => c.collected).length;
  
    for (let i = 0; i < TOTAL_CANDLES; i++) {
      const x = xStart + i * (iconW - 35);
      const y = yStart;
  
      const alpha = i < collectedCount ? 225 : 60;
      tint(255, 255, 255, alpha);
  
      image(candleImg, x, y, iconW, iconH);
    }
  
    noTint();
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

  function tryInteractWithMav() {
    if (mav.moved) return;
    if (worldIndex !== mav.screen) return;
  
    const mx = mav.x();
    const my = mav.y();
  
    if (isPlayerNearPoint(mx, my, 200)) {
      mav.moved = true;
  
      // slide mav to the right
      mav.offsetX = 120;
  
      // unlock candle behind mav
      const hiddenCandle = candles.find(c => c.id === 99);
      if (hiddenCandle) {
        hiddenCandle.unlocked = true;
      }
  
      spawnConfetti(25);
    }
  }
  
  
  