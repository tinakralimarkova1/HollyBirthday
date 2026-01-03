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

//world mechanics

let worldIndex = 0;     // which screen
let returnWorldIndex = 0;

let holly;              // player object

let mode = "game";          // "landing" | "game" | "computer"

const COMPUTER_SCREEN_INDEX = 101; // unique id so it won't collide
const DESK_INTERACT_RADIUS = 180;  // tweak as needed

const BOOKSHELF_SCREEN_INDEX = 102;   // unique id
const BOOKSHELF_INTERACT_RADIUS = 180; // tweak




const PLAYER_SPEED = 100;



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

let excelImg;
let booksImg;

//mav state
let mav = {
    screen: 0,
    x: () => width * 0.23,
    y: () => height * 0.6,
    moved: false,
    offsetX: 0 // how far mav slides
  };

// desk state
let desk = {
    screen: 0,
    x: () => width * 0.8,
    y: () => height * 0.65
  };
  
// bookshelf state
let bookshelf = {
    screen: 0,
    x: () => width * 0.7,
    y: () => height * 0.69
  };
  

// Grill scene

let skylineImg; 
let plantImg;
let grillImg;
  


// --- rooftop plant interaction ---
const PLANT_INTERACT_RADIUS = 160;
const PLANT_SLIDE_DIST = 120;     // how far correct plant slides
const PLANT_SHAKE_FRAMES = 18;    // how long wrong plant shakes

let rooftopPlants = [];           // plant objects
const ROOFTOP_PLANT_CANDLE_ID = 200; // candle hidden behind plant


const GRILL_GAME_SCREEN_INDEX = 103;    // unique id
const GRILL_INTERACT_RADIUS = 180;

let grill = {
  screen: 1, // rooftop worldIndex in your current mapping
  x: () => width * 0.65,
  y: () => height * 0.70
};


//tina game scene
const TABLE_INTERACT_RADIUS = 200;

let table = {
  screen: 2, // tina scene worldIndex
  x: () => width * 0.75,
  y: () => height * 0.75
};


let tableImg;
let phoneOn = false;


// candles
// bedroom (3): mav, bookshelf, desk
// grill (5): plant, coby, matthew, athena, grill game 
// fortnite (?): tina, kristen, 
// pickleball (?): halle
// basement (?): finn
// total: 11








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

    excelImg = loadImage("assets/General/Excel.png");
    booksImg = loadImage("assets/Bedroom/books.png");

    // grill scene
    skylineImg = loadImage("assets/Grill/skyline2.png");
    plantImg = loadImage("assets/Grill/plant.png");
    grillImg = loadImage("assets/Grill/grill.png");


    //tina scene

    tableImg = loadImage("assets/TinaGame/table.png");






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
    initRooftopPlants();



  }

  
  function draw() {
    if (!isGameStarted()) {
      drawLanding();
      return;
    }
  
    if (mode === "computer") {
      drawComputerScreen();
      return;
    }
    if (mode === "bookshelf") {
        drawBookshelfScreen();
        return;
      }
    if (mode === "grillGame") {
        drawGrillGame();
        return;
      }
    
    
  
    drawGame();
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
    } 
    else if (idx === 1){
        drawRooftop();
    }
    else if (idx === 2){
        drawTinaGame();
    }
    
    else {
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
    const deskX = width * 0.8;
    const deskY = height * 0.65;

    image(DeskImg, deskX, deskY, width * 0.3, height * 0.25 * 1.7);
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
        fill(230,60,60);
        textAlign(CENTER,BOTTOM);
        textSize(14);
        text("Press E", mav.x()+15, mav.y() - 100);
      }

    if (isPlayerNearPoint(desk.x(), desk.y(), DESK_INTERACT_RADIUS)) {
        fill(230,60,60);
        textAlign(CENTER, BOTTOM);
        textSize(18);
        text("Press E", desk.x(), desk.y() - 200);
      }
    if (isPlayerNearPoint(bookshelf.x(), bookshelf.y(), BOOKSHELF_INTERACT_RADIUS)) {
        fill(230,60,60);
        textAlign(CENTER, BOTTOM);
        textSize(18);
        text("Press E", bookshelf.x() -160, bookshelf.y() - 370);
      }
      
      
   
  
    // Screen label (temporary)
    fill(255, 255, 255, 160);
    textAlign(CENTER, TOP);
    textSize(18);
    text("Holly's Bedroom", width / 2, 16);
  }

  function drawComputerScreen() {
    background(142, 149, 244);
  
    if (excelImg) {
        imageMode(CENTER);
        const w = width * 0.9;
        const h = height * 0.9;
        image(excelImg, width / 2, height / 2, w, h);
    }else {
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(32);
      text("Excel Wizard", width / 2, height / 2);
    }
  
    // label
    
    textSize(12);
    fill(255, 255, 255, 160);
    text("Press Q to return", 20, 20);
  
    drawCandles(COMPUTER_SCREEN_INDEX);
    tryCollectCandles(COMPUTER_SCREEN_INDEX);
  }

  function drawBookshelfScreen() {
    background(142, 149, 244);
  
    // Placeholder UI (swap for your real bookshelf UI later)
    imageMode(CENTER);
    const w = width * 0.9;
    const h = height * 0.9;
    image(booksImg, width / 2, height / 2, w, h);
  
    // label
    textSize(12);
    fill(255, 255, 255, 160);
    text("Press Q to return", 20, 20);
  
    drawCandles(BOOKSHELF_SCREEN_INDEX);
    tryCollectCandles(BOOKSHELF_SCREEN_INDEX);
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

function drawRooftop() {
    // candles: plant, coby, matthew, athena, 


    // --- SKY GRADIENT (bluer, cleaner) ---
    for (let y = 0; y < height; y++) {
        const t = map(y, 0, height, 0, 1);
    
        const r = lerp(90, 140, t);
        const g = lerp(140, 190, t);
        const b = lerp(210, 255, t);
    
        stroke(r, g, b);
        line(0, y, width, y);
    }
    noStroke();

    // --- SKYLINE ---
    push();
    imageMode(CENTER);
    image(skylineImg, width / 2, height *0.6, width , height *1.5);
    pop();

    

  
  
  
   
  
    // --- ROOFTOP FLOOR ---
    let floorColor = 140
    fill(floorColor,floorColor, floorColor);
    rect(0, height * 0.75, width, height * 0.25);
  
    // --- ROOFTOP Panel ---
    fill(255, 255, 255, 90);
    rect(0, height * 0.55, width, 200);
  
    // --- plants 
    drawRooftopPlants();


    // grill

    push();
    imageMode(CENTER);
    image(grillImg, width*0.65, height * 0.7, width *0.25, height * 0.45);
    pop();

    //clouds
    drawCloud(width * 0.2, height * 0.2);
    drawCloud(width * 0.5, height * 0.15);
    drawCloud(width * 0.75, height * 0.25);


    if (mode === "game" && isPlayerNearPoint(grill.x(), grill.y(), GRILL_INTERACT_RADIUS)) {
        fill(230, 60, 60);
        textAlign(CENTER, BOTTOM);
        textSize(18);
        text("Press E", grill.x(), grill.y() - 160);
      }
      

    
    // --- LABEL ---
    fill(255, 255, 255, 160);
    textAlign(CENTER, TOP);
    textSize(18);
    text("Rooftop", width / 2, 16);
  }

  function drawCloud(x, y ) {
    push();
    translate(x, y);
    
    noStroke();
    fill(255, 255, 255, 200);
  
    // main body
    ellipse(0, 0, 120, 60);
    ellipse(-40, 0, 70, 50);
    ellipse(40, 0, 70, 50);
  
    // top bumps
    ellipse(-20, -25, 60, 50);
    ellipse(20, -25, 70, 55);
  
    pop();
  }
  
  function drawRooftopPlants() {
    if (!plantImg) return;
  
    for (const p of rooftopPlants) {
      if (p.screen !== worldIndex) continue;
  
      // shake effect when wrong plant
      const shakeX = (p.shakeTimer > 0) ? sin(frameCount * 0.9) * 8 : 0;
  
      push();
      imageMode(CENTER);
      image(
        plantImg,
        p.x() + p.offsetX + shakeX,
        p.y(),
        width * 0.18,
        height * 0.30
      );
      pop();
  
      // prompt when near
      if (mode === "game" && isPlayerNearPoint(p.x() + p.offsetX, p.y(), PLANT_INTERACT_RADIUS)) {
        fill(230, 60, 60);
        textAlign(CENTER, BOTTOM);
        textSize(16);
        text("Press E", p.x() + p.offsetX, p.y() - 120);
      }
  
      // tick down shake timer
      if (p.shakeTimer > 0) p.shakeTimer--;
    }
  }

  function drawGrillGame() {
    background(142, 149, 244);
  
    fill(255, 255, 255, 220);
    textAlign(CENTER, CENTER);
    textSize(36);
    text("Grill Mini Game", width / 2, height / 2 - 20);
  
    textSize(16);
    text("Press Q to return", width / 2, height / 2 + 30);
  
    // you can draw the grill image here too if you want:
    // imageMode(CENTER);
    // image(grillImg, width/2, height*0.65, width*0.25, height*0.45);
  }
  
  
  function drawTinaGame() {
    background(142, 149, 244);

    // Floor
    noStroke();
    fill(255, 255, 255, 90);
    rect(0, height * 0.75, width, height * 0.25);
  
    imageMode(CENTER);
    image(tableImg, width *0.75, height*0.75, width * 0.4, height * 0.4);

    push();
    if (phoneOn === true) {
      drawPhone();
    }
    pop();

    if (isPlayerNearPoint(table.x(), table.y(), TABLE_INTERACT_RADIUS)) {
        fill(230,60,60);
        textAlign(CENTER, BOTTOM);
        textSize(18);
        text("Press E", bookshelf.x() -160, bookshelf.y() - 370);


      }
      

    


  }


  function drawPhone(){

    // big phone rectangle
    fill(14, 85, 199);
    rect(width *0.08, height*0.06, width * 0.3, height * 0.9, 30);

    // small phone rectangle
    fill(211, 239, 245);
    rect(width *0.1, height*0.09, width * 0.26, height * 0.84, 30);

    // little label
    fill(255, 255, 255, 180);
    textAlign(LEFT, TOP);
    textSize(12);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(28);
    text("Phone Screen (placeholder)", width / 2, height / 2);
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
      },
    {
        id: 101,
        screen: COMPUTER_SCREEN_INDEX,
        x: () => width * 0.5,
        y: () => height * 0.7,
        collected: false,
        unlocked: true
      },
      {
        id: 101,
        screen: BOOKSHELF_SCREEN_INDEX,
        x: () => width * 0.31,
        y: () => height * 0.55,
        collected: false,
        unlocked: true,
        scale:2.2
      },
      {
        id: ROOFTOP_PLANT_CANDLE_ID,
        screen: 1, // rooftop worldIndex
        x: () => width * 0.27,          // behind the correct plant (match plant id 2)
        y: () => height * 0.75,
        collected: false,
        unlocked: false,
        scale: 1
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
  
      const baseSize = 150;
      const scale = c.scale ?? 1;   // default = 1
      const w = baseSize * scale;
      const h = baseSize * scale;

      imageMode(CENTER);
      image(candleImg, cx, cy, w, h);
  
      if (isPlayerNearPoint(cx, cy, 150)) {
        
  
        fill(230, 20, 20, 200);
        textAlign(CENTER, BOTTOM);
        textSize(14);
        text("Press C", cx, cy - 60);
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
  
      if (isPlayerNearPoint(cx, cy, 150) && c.unlocked === true) {
        c.collected = true;
        candlesCollected += 1;
  
       //celebrate?
        spawnConfetti(20);
  
        break; // collect only one per press
      }
      if (mode === "computer") {
        // collect computer screen candle
        
        c.collected = true;
        candlesCollected += 1;
        break;
      }
      if (mode === "bookshelf") {
        // collect bookshelf screen candle
        
        c.collected = true;
        candlesCollected += 1;
        break;
      }
    }
  
    interactPressed = false; // consume the press
  }
  
  function isPlayerNearPoint(px, py, radius) {
   
    const hx = holly.x ;
    const hy = holly.y;
    return dist(hx, hy, px, py) < radius;
  }

  function keyPressed() {
    if (key === "e" || key === "E") {
      tryInteract(); 
    }
    if (key === "c" || key === "C") {
      interactPressed = true; 
    }
  
    // leave extra screen
    if ((key === "q" || key === "Q") && (mode === "computer" || mode === "bookshelf" || mode === "grillGame")) {
        mode = "game";
        worldIndex = returnWorldIndex;
      }
      
  }

  function tryInteract() {
    if (mode !== "game") return;
  
    if (tryInteractWithDesk()) return;
    if (tryInteractWithBookshelf()) return;
    if (tryInteractWithMav()) return;
    if (tryInteractWithRooftopPlants()) return;
    if (tryInteractWithGrill()) return;        
    if (tryInteractWithTable()) return;


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
    if (mav.moved) return false;
    if (worldIndex !== mav.screen) return false;
  
    const mx = mav.x();
    const my = mav.y();
  
    if (isPlayerNearPoint(mx, my, 200)) {
      mav.moved = true;
      mav.offsetX = 120;
  
      const hiddenCandle = candles.find(c => c.id === 99);
      if (hiddenCandle) hiddenCandle.unlocked = true;
  
      spawnConfetti(25);
      return true;
    }
  
    return false;
  }
  

  function tryInteractWithDesk() {
    if (worldIndex !== desk.screen) return false;
  
    const dx = desk.x();
    const dy = desk.y();
  
    if (isPlayerNearPoint(dx, dy, DESK_INTERACT_RADIUS)) {
      returnWorldIndex = worldIndex;
      mode = "computer";
      worldIndex = COMPUTER_SCREEN_INDEX; // optional, but useful if you want candles tied to screen
      spawnConfetti(15);
      return true;
    }
  
    return false;
  }

  function tryInteractWithBookshelf() {
    if (worldIndex !== bookshelf.screen) return false;
  
    const bx = bookshelf.x();
    const by = bookshelf.y();
  
    if (isPlayerNearPoint(bx, by, BOOKSHELF_INTERACT_RADIUS)) {
      returnWorldIndex = worldIndex;
      mode = "bookshelf";
      worldIndex = BOOKSHELF_SCREEN_INDEX; // optional but consistent
      spawnConfetti(10);
      return true;
    }
  
    return false;
  }
  
  function initRooftopPlants() {
    // worldIndex 0 is rooftop in your code
    rooftopPlants = [
      { id: 0, screen: 1, x: () => width * 0.07, y: () => height * 0.65, offsetX: 0, moved: false, shakeTimer: 0 },
      { id: 1, screen: 1, x: () => width * 0.25, y: () => height * 0.65, offsetX: 0, moved: false, shakeTimer: 0 },
      { id: 2, screen: 1, x: () => width * 0.75, y: () => height * 0.65, offsetX: 0, moved: false, shakeTimer: 0 },
      { id: 3, screen: 1, x: () => width * 0.93, y: () => height * 0.65, offsetX: 0, moved: false, shakeTimer: 0 }
    ];
  
    
    for (const p of rooftopPlants) p.isCorrect = (p.id === 1);
  }
  
  function tryInteractWithRooftopPlants() {
    // only on rooftop (worldIndex 0 in your current mapping)
    if (worldIndex !== 1) return false;
  
    for (const p of rooftopPlants) {
      const px = p.x() + p.offsetX;
      const py = p.y();
  
      if (isPlayerNearPoint(px, py, PLANT_INTERACT_RADIUS)) {
        // already moved? just do a tiny shake feedback
        if (p.moved) {
          p.shakeTimer = PLANT_SHAKE_FRAMES;
          return true;
        }
  
        if (p.isCorrect) {
          // slide
          p.moved = true;
          p.offsetX = PLANT_SLIDE_DIST;
  
          // unlock candle
          const hidden = candles.find(c => c.id === ROOFTOP_PLANT_CANDLE_ID);
          if (hidden) hidden.unlocked = true;
  
          spawnConfetti(20);
        } else {
          // wrong plant shakes
          p.shakeTimer = PLANT_SHAKE_FRAMES;
        }
  
        return true;
      }
    }
  
    return false;
  }

  function tryInteractWithGrill() {
    // grill is on rooftop (worldIndex 0 in your current mapping)
    if (worldIndex !== grill.screen) return false;
  
    if (isPlayerNearPoint(grill.x(), grill.y(), GRILL_INTERACT_RADIUS)) {
      returnWorldIndex = worldIndex;
      mode = "grillGame";
      worldIndex = GRILL_GAME_SCREEN_INDEX; // optional but consistent
      spawnConfetti(12);
      return true;
    }
  
    return false;
  }
  
  
  function tryInteractWithTable(){
    if (worldIndex !== table.screen) return false;
  
    if (isPlayerNearPoint(table.x(), table.y(), TABLE_INTERACT_RADIUS)) {

        phoneOn = true;
    }
  
    return false;
  }
  
  
  
  