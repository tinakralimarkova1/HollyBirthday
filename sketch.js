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

// --- FaceTime mini game ---
let ftActive = false;
let ftState = "playing"; // "playing" | "lose" | "win"
let ftPopup = null;      // {x,y,w,h, pickup:{...}, hang:{...}, expiresAt}
let ftNextSpawnAt = 0;

let ftScore = 0;
let ftMisses = 0;

const FT_TARGET = 5;

// random timing ranges (ms)
const FT_VISIBLE_MIN = 500;
const FT_VISIBLE_MAX = 1300;

const FT_GAP_MIN = 350;
const FT_GAP_MAX = 1200;

// end screen button rect (computed each frame)
let ftEndBtn = null;


// fortnite scene

let fortniteBGImg;
let chestImg;
let chugSplashImg;
let holoImg;



const FORTNITE_SCREEN_INDEX = 3;

const CHEST_INTERACT_RADIUS = 250;
const CHEST_HOLD_MS = 3000;

let chest = {
  screen: FORTNITE_SCREEN_INDEX,
  x: () => width * 0.45,          // CENTERED
  y: () => height * 0.82,        // adjust if your floor is different
  opened: false,

  // hold-to-open
  holdMs: 0,
  holding: false
};

let chugSplash = {
  screen: FORTNITE_SCREEN_INDEX,
  x: () => width * 0.65,
  y: () => height * 0.85,
  visible: false
};

let holo = {
  screen: FORTNITE_SCREEN_INDEX,
  x: () => width * 0.75,
  y: () => height * 0.85,
  visible: false
};

// optional: candle that pops out of chest (use your existing candle system)
const FORTNITE_CANDLE_ID = 300; // pick any unique id

// fortnite mechanics 
// ===== Fortnite loot pickup + shooter =====
let hasHolo = false;
let hasChug = false;

const LOOT_PICKUP_RADIUS = 280;

// shooter game
let enemyImgs = [];
let gunImg;

// --- holly shield/health ---
let hollyShield = 100;
let hollyHealth = 100;

const HOLLY_MAX_SHIELD = 100;
const HOLLY_MAX_HEALTH = 100;

const BULLET_DMG = 1;         // holly bullets damage (4 hits per enemy)
const ENEMY_BULLET_DMG = 14;  // enemy bullet damage to holly


// enemy bullets
let enemyBullets = [];
let nextEnemyShotAt = 0;

let shooterActive = false;
let shooterState = "playing"; // "playing" | "win"
let shooterEndBtn = null;

let bullets = [];
let enemies = [];
let nextEnemySpawnAt = 0;

const ENEMY_HP = 20;
const ENEMY_SPEED_MIN = 3.2;
const ENEMY_SPEED_MAX = 5.2;

const BULLET_SPEED = 14;
const BULLET_RADIUS = 6;

// win condition
const ENEMY_LIMIT = 4;
let enemiesSpawned = 0;
let enemiesKilled = 0;

const ENEMY_SHOOT_GAP_MIN = 700;
const ENEMY_SHOOT_GAP_MAX = 1200;

const ENEMY_BULLET_SPEED = 9;
const ENEMY_BULLET_RADIUS = 6;

// two reward candles after shooter
const FORTNITE_REWARD_CANDLE_1 = 301;
const FORTNITE_REWARD_CANDLE_2 = 302;

let victoryImg;
let showVictory = false;
let victoryUntil = 0;
const VICTORY_SHOW_MS = 2500;


//// --- end of fortnite mechanics ---


// pickleball scene
let pickleballBGImg;
const PICKLEBALL_SCREEN_INDEX = 4; // next screen after Fortnite (3)

// --- Pickleball waiting sequence ---
let pickleballEnteredAt = null;     // millis() when we entered screen
let pickleballMsgIndex = 0;         // which line we’re showing
let pickleballCanCheckPhone = false;

const PICKLEBALL_WAIT_STEP_MS = 1000; // 10 seconds 

// Find Friends map image
let findMapImg;

// Halle movement
const HALLE_MOVE_EVERY_MS = 900;   // speed of Halle moving (tweak)
let nextHalleMoveAt = 0;


// --- Find Friends (Find Halle) mini game ---
const FF_GRID = 7;

let ff = {
  active: false,
  px: 3, py: 3,      // player cell
  hx: 0, hy: 0,      // halle cell
  found: false,

  // what cell the player is currently viewing (same as px/py, but keeps it explicit)
  viewX: 3,
  viewY: 3,

  mapRect: null,
  btns: null
};

let logoImg;

const HALLE_CANDLE_ID = 401; // pick any unused id

// === People images ===
let cobyImg, athenaImg, matthewImg, tinaImg, halleImg, kristenImg;

// === Rooftop friend interaction ===
const FRIEND_INTERACT_RADIUS = 150;

let rooftopFriends = []; // will init in initRooftopFriends()

// === Birthday wish screen ===
const WISH_SCREEN_INDEX = 104;
let wish = {
  who: null,      // "coby" | "athena" | "matthew"
  candleId: null, // candle tied to that wish
};

// candle ids (pick unique)
const COBY_CANDLE_ID = 210;
const ATHENA_CANDLE_ID = 211;
const MATTHEW_CANDLE_ID = 212;

// === Grill patty mini game ===
const GRILL_PATTY_CANDLE_ID = 213;

let patties = [];
let pattyCorrectIndex = 0;
let pattyPickedIndex = null;
let grillCandlePos = { x: 0, y: 0 };
let grillCandleRevealed = false;








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

    // fortnite scene
    fortniteBGImg = loadImage("assets/Fortnite/fortniteBG.png.jpg");
    chestImg = loadImage("assets/Fortnite/Chest1.png.webp");
    chugSplashImg = loadImage("assets/Fortnite/chugSplash.png");
    holoImg = loadImage("assets/Fortnite/holo.png");
    gunImg = loadImage("assets/Fortnite/holo.png");
    victoryImg = loadImage("assets/Fortnite/victory.png");


    enemyImgs = [
        loadImage("assets/Fortnite/enemy1.png"),
        loadImage("assets/Fortnite/enemy1.png"),
        loadImage("assets/Fortnite/enemy1.png"),
        loadImage("assets/Fortnite/enemy1.png")
      ];


//

    // pickleball scene
    pickleballBGImg = loadImage("assets/Pickleball/pickleballBG.png.tiff");
    findMapImg = loadImage("assets/Pickleball/map1.png"); // <- your path

    logoImg = loadImage("assets/Pickleball/logo2.webp");

        // people
    cobyImg = loadImage("assets/People/Coby.png");
    matthewImg = loadImage("assets/People/Matthew.png");
    athenaImg = loadImage("assets/People/Athena.png");
    tinaImg = loadImage("assets/People/Tina.png");
    halleImg = loadImage("assets/People/Halle.png");
    kristenImg = loadImage("assets/People/Kristen.png");





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
    initRooftopFriends();
    initGrillPattiesGame();




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
    if (mode === "findFriends") {
        drawFindFriends();
        return;
      }
      if (mode === "wish") {
        drawWishScreen();
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

    if (worldIndex === FORTNITE_SCREEN_INDEX && shooterActive) {
    drawHollyGun();           // ✅ gun on top of Holly
    }

    drawVictory();

    if (worldIndex === FORTNITE_SCREEN_INDEX) {
    updateFortniteChestHold();
    updateShooterGame();
}

  
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
    else if (idx === 3){
        drawFortniteScene();
    }
    else if (idx === 4){
        drawPickleball();
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

  function drawWishScreen() {
    background(142, 149, 244);
  
    // card
    const cardW = width * 0.78;
    const cardH = height * 0.70;
    const cx = width / 2 - cardW / 2;
    const cy = height / 2 - cardH / 2;
  
    noStroke();
    fill(255, 255, 255, 80);
    rect(cx, cy, cardW, cardH, 20);
  
    // pick friend data
    const f = rooftopFriends.find(x => x.key === wish.who);
    const title = f ? `${f.name}'s Birthday Wish` : "Birthday Wish";
  
    fill(255, 255, 255, 230);
    textAlign(CENTER, TOP);
    textSize(28);
    text(title, width / 2, cy + 24);
  
    // friend image
    // friend image (keep aspect ratio)
    if (f && f.img()) {
    const img = f.img();
  
    // set a max box the image is allowed to occupy
    const maxH = cardH * 0.42;     // tweak (how tall on the card)
    const maxW = cardW * 0.28;     // tweak (how wide on the card)
  
    const ar = img.width / img.height; // 1668/2388 ~ 0.698
  
    // start by fitting height, then clamp to maxW if needed
    let drawH = maxH;
    let drawW = drawH * ar;
  
    if (drawW > maxW) {
      drawW = maxW;
      drawH = drawW / ar;
    }
  
    imageMode(CENTER);
    image(img, width / 2, cy + cardH * 0.42, drawW, drawH);
  }
  
  
    // wish text
    fill(30, 30, 30, 210);
    textAlign(CENTER, TOP);
    textSize(18);
    const msg = f ? f.wishText : "Happy birthday!!!";
    text(msg, width / 2, cy + cardH * 0.62);
  
    // candle
    const candle = candles.find(c => c.id === wish.candleId);
    const already = !!candle?.collected;
  
    if (candleImg && !already) {
      const candleX = width / 2;
      const candleY = cy + cardH * 0.86;
  
      imageMode(CENTER);
      image(candleImg, candleX, candleY, 70, 70);
  
      fill(230, 60, 60);
      textAlign(CENTER, TOP);
      textSize(14);
      text("Press C to collect", candleX, candleY + 40);
    } else {
      fill(255, 255, 255, 200);
      textAlign(CENTER, TOP);
      textSize(14);
      text("Candle collected ✅", width / 2, cy + cardH * 0.86);
    }
  
    fill(255, 255, 255, 170);
    textAlign(LEFT, TOP);
    textSize(12);
    text("Press Q to return", 20, 20);
  }
  


  function drawPickleball() {
    background(142, 149, 244);
  
    // background image
    if (pickleballBGImg) {
      imageMode(CENTER);
      image(pickleballBGImg, width / 2, height / 2, width, height);
    } else {
      // fallback
      fill(255, 255, 255, 160);
      textAlign(CENTER, CENTER);
      textSize(24);
      text("Pickleball Court (missing image)", width / 2, height / 2);
    }
    drawPickleballWaitingText();

  
    // optional ground overlay (only if you want it consistent with other scenes)
    // noStroke();
    // fill(255, 255, 255, 60);
    // rect(0, height * 0.75, width, height * 0.25);
  
    // label
    fill(255, 255, 255, 160);
    textAlign(CENTER, TOP);
    textSize(18);
    text("Pickleball", width / 2, 16);
  }

  function onEnterPickleball() {
    pickleballEnteredAt = millis();
    pickleballMsgIndex = 0;
    pickleballCanCheckPhone = false;
  }

  function drawPickleballWaitingText() {
    // if we just got here, initialize
    if (pickleballEnteredAt === null) onEnterPickleball();
  
    const elapsed = millis() - pickleballEnteredAt;
  
    // 0–10s: waiting on Halle
    // 10–20s: still waiting
    // 20–30s: still waiting...
    // 30s+: maybe check phone (press f)
    if (elapsed < 1 * PICKLEBALL_WAIT_STEP_MS) {
      pickleballMsgIndex = 0;
    } else if (elapsed < 2 * PICKLEBALL_WAIT_STEP_MS) {
      pickleballMsgIndex = 1;
    } else if (elapsed < 3 * PICKLEBALL_WAIT_STEP_MS) {
      pickleballMsgIndex = 2;
    } else {
      pickleballMsgIndex = 3;
      pickleballCanCheckPhone = true;
    }
  
    let msg = "";
    if (pickleballMsgIndex === 0) msg = "waiting on Halle";
    if (pickleballMsgIndex === 1) msg = "still waiting";
    if (pickleballMsgIndex === 2) msg = "still waiting...";
    if (pickleballMsgIndex === 3) msg = "maybe you should check ur phone (press F)";
  
    // draw as a nice centered bubble
    const pad = 18;
    textSize(26);
    textAlign(CENTER, CENTER);
  
    const tw = textWidth(msg);
    const boxW = min(width * 0.86, tw + pad * 2);
    const boxH = 70;
    const boxX = width / 2 - boxW / 2;
    const boxY = height * 0.18;
  
    noStroke();
    fill(0, 0, 0, 120);
    rect(boxX, boxY, boxW, boxH, 18);
  
    fill(255, 255, 255, 240);
    text(msg, width / 2, boxY + boxH / 2);
  }
  
function startFindFriendsGame() {
    ff.active = true;
    ff.found = false;
  
    // spawn player in middle
    ff.px = Math.floor(FF_GRID / 2);
    ff.py = Math.floor(FF_GRID / 2);
    ff.viewX = ff.px;
    ff.viewY = ff.py;
  
    // spawn halle somewhere else
    do {
      ff.hx = Math.floor(random(FF_GRID));
      ff.hy = Math.floor(random(FF_GRID));
    } while (ff.hx === ff.viewX && ff.hy === ff.viewY);
  
    nextHalleMoveAt = millis() + HALLE_MOVE_EVERY_MS;
  }
  
  
  function findFriends() {
    // launch next mini game
    returnWorldIndex = worldIndex; // so Q returns to pickleball
    mode = "findFriends";
    startFindFriendsGame();
    spawnConfetti(10);
  }
  
  function drawFindFriends() {
    background(142, 149, 244);
  
    // move Halle around while you search
    updateHalleMovement();
  
    // map window rect
    const mapSize = Math.min(width, height) * 0.62;
    const mx = width / 2 - mapSize / 2;
    const my = height / 2 - mapSize / 2;
  
    ff.mapRect = { x: mx, y: my, w: mapSize, h: mapSize };
  
    // card bg
    noStroke();
    fill(255, 255, 255, 70);
    rect(mx - 18, my - 90, mapSize + 36, mapSize + 170, 18);

    //logo
    if (logoImg) {
        const cardLeft = mx - 18;
        const cardTop  = my - 90;
      
        const pad = 18;      // distance from card edge
        const s = 60;        // logo size
      
        imageMode(CORNER);
        image(logoImg, cardLeft + pad, cardTop + pad, s, s);
      }
  
    // title
    fill(255, 255, 255, 230);
    textAlign(CENTER, TOP);
    textSize(28);
    text("Find Halle", width / 2, my - 70);
  
    textSize(14);
    fill(255, 255, 255, 190);
    text("You only see ONE area at a time. Move with arrows.", width / 2, my - 22);
  
    // draw the current cell slice from a single big map image
    drawFindFriendsMapSlice(mx, my, mapSize);
  
    
  
    const halleHere = (ff.viewX === ff.hx && ff.viewY === ff.hy);
    if (halleHere && !ff.found) {
        ff.found = true;
        spawnConfetti(20);
      }

    const halleCandle = candles.find(c => c.id === HALLE_CANDLE_ID);
    const halleCandleCollected = !!halleCandle?.collected;
    
    if (ff.found || halleHere) {
      const cx = mx + mapSize * 0.72;
      const cy = my + mapSize * 0.62;
    
      // HALLE circle
      noFill();
      stroke(255, 111, 97, 240);
      strokeWeight(6);
      circle(cx, cy, mapSize * 0.12);
    
      noStroke();
      fill(255, 111, 97, 240);
      textAlign(CENTER, BOTTOM);
      textSize(18);
      text("HALLE", cx, cy - mapSize * 0.08);
    
      // candle on Halle (if not collected)
      if (candleImg && !halleCandleCollected) {
        imageMode(CENTER);
        image(candleImg, cx, cy + mapSize * 0.02, 70, 70);
    
        fill(255, 30, 30);
        textAlign(CENTER, TOP);
        textSize(14);
        text("Press C to collect", cx, cy + mapSize * 0.10);
      }
    }
    
  
    // buttons
    ff.btns = makeFindFriendsButtons(mx, my, mapSize);
    drawFindFriendsButton(ff.btns.up, "↑");
    drawFindFriendsButton(ff.btns.down, "↓");
    drawFindFriendsButton(ff.btns.left, "←");
    drawFindFriendsButton(ff.btns.right, "→");
  
    // status
    fill(255, 255, 255, 230);
    textAlign(CENTER, TOP);
    textSize(16);
  
    if (!ff.found) {
      text("She’s moving… good luck.", width / 2, my + mapSize + 20);
      text("Press Q to return", width / 2, my + mapSize + 44);
    } else {
      text("YOU FOUND HALLE ", width / 2, my + mapSize + 20);
      text("Press Q to go back", width / 2, my + mapSize + 44);
    }
  }
  
  
  function drawFindFriendsButton(r, label) {
    // hover
    const hover = mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h;
  
    noStroke();
    fill(0, 0, 0, hover ? 170 : 130);
    rect(r.x, r.y, r.w, r.h, 16);
  
    stroke(255, 255, 255, 110);
    strokeWeight(2);
    noFill();
    rect(r.x, r.y, r.w, r.h, 16);
  
    noStroke();
    fill(255, 255, 255, 230);
    textAlign(CENTER, CENTER);
    textSize(r.w * 0.45);
    text(label, r.x + r.w / 2, r.y + r.h / 2);
  }
  
  function makeFindFriendsButtons(mx, my, mapSize) {
    const s = Math.max(54, Math.min(90, mapSize * 0.12));
    const gap = 34;            // was 16
    const extra = 10;          // NEW: pushes even further out
    const updown = 45;
  
    return {
      up:    { x: mx + mapSize / 2 - s / 2, y: my - s - gap - extra - updown , w: s, h: s },
      down:  { x: mx + mapSize / 2 - s / 2, y: my + mapSize + gap + extra + updown, w: s, h: s },
      left:  { x: mx - s - gap - extra,     y: my + mapSize / 2 - s / 2, w: s, h: s },
      right: { x: mx + mapSize + gap + extra, y: my + mapSize / 2 - s / 2, w: s, h: s }
    };
  }
  
  
  function ffMove(dx, dy) {
    if (mode !== "findFriends") return;
  
    ff.viewX = constrain(ff.viewX + dx, 0, FF_GRID - 1);
    ff.viewY = constrain(ff.viewY + dy, 0, FF_GRID - 1);
  
    // tiny feedback
    spawnConfetti(2);
  
    // if halle is currently in this cell, you can “find” her
    if (ff.viewX === ff.hx && ff.viewY === ff.hy) {
      ff.found = true;
      spawnConfetti(35);
    }
  }
  

  function updateHalleMovement() {
    if (mode !== "findFriends") return;
    if (ff.found) return;
  
    // ✅ If she's currently in the cell you're viewing, do NOT move her
    if (ff.viewX === ff.hx && ff.viewY === ff.hy) return;
  
    const now = millis();
    if (now < nextHalleMoveAt) return;
  
    moveHalleOneStep();
    nextHalleMoveAt = now + HALLE_MOVE_EVERY_MS;
  }
  
  function moveHalleOneStep() {
    // 4-neighbor random step (stay in bounds)
    const dirs = [
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 },
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 }
    ];
  
    // optional: bias away from player's current view so it's harder
    // (comment out if you want pure random)
    dirs.sort(() => random() - 0.5);
  
    // try a few random directions
    for (let tries = 0; tries < 10; tries++) {
      const d = random(dirs);
      const nx = ff.hx + d.dx;
      const ny = ff.hy + d.dy;
  
      if (nx < 0 || nx >= FF_GRID || ny < 0 || ny >= FF_GRID) continue;
  
      ff.hx = nx;
      ff.hy = ny;
      return;
    }
  }

  function drawFindFriendsMapSlice(mx, my, size) {
    // fallback if no image
    if (!findMapImg) {
      noStroke();
      fill(30, 40, 60, 120);
      rect(mx, my, size, size, 18);
      fill(255, 255, 255, 180);
      textAlign(CENTER, CENTER);
      textSize(18);
      text("Missing map.png", mx + size / 2, my + size / 2);
      return;
    }
  
    // each cell in the SOURCE image
    const srcCellW = findMapImg.width / FF_GRID;
    const srcCellH = findMapImg.height / FF_GRID;
  
    const sx = ff.viewX * srcCellW;
    const sy = ff.viewY * srcCellH;
  
    // draw that slice into the destination square
    imageMode(CORNER);
    image(findMapImg, mx, my, size, size, sx, sy, srcCellW, srcCellH);
  
    // optional rounding mask look (simple overlay frame)
    noFill();
    stroke(255, 255, 255, 120);
    strokeWeight(3);
    rect(mx, my, size, size, 18);
    noStroke();
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
        fill(255);
        textAlign(CENTER,BOTTOM);
        textSize(14);
        text("Press E", mav.x()-100, mav.y() - 100);
      }

    if (isPlayerNearPoint(desk.x(), desk.y(), DESK_INTERACT_RADIUS)) {
        fill(255);
        textAlign(CENTER, BOTTOM);
        textSize(18);
        text("Press E", desk.x(), desk.y() - 220);
      }
    if (isPlayerNearPoint(bookshelf.x(), bookshelf.y(), BOOKSHELF_INTERACT_RADIUS)) {
        fill(255);
        textAlign(CENTER, BOTTOM);
        textSize(18);
        text("Press E", bookshelf.x() -160, bookshelf.y() - 470);
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

    drawRooftopFriends();

    //clouds
    drawCloud(width * 0.2, height * 0.2);
    drawCloud(width * 0.5, height * 0.15);
    drawCloud(width * 0.75, height * 0.25);


    if (mode === "game" && isPlayerNearPoint(grill.x(), grill.y(), GRILL_INTERACT_RADIUS)) {
        fill(255);
        textAlign(CENTER, BOTTOM);
        textSize(18);
        text("Press E", grill.x(), grill.y() - 300);
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
      if (
        mode === "game" &&
        !p.disabled &&                       // ✅ hide prompt once used
        isPlayerNearPoint(p.x() + p.offsetX, p.y(), PLANT_INTERACT_RADIUS)
      ) {
        fill(255);
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
  
    // title
    fill(255, 255, 255, 230);
    textAlign(CENTER, TOP);
    textSize(28);
    text("Grill Mini Game", width / 2, 22);
  
    textSize(14);
    fill(255, 255, 255, 180);
    text("Click a patty to lift it.", width / 2, 60);
    text("Press Q to return", width / 2, 82);
  
    // grill surface
    const gx = width * 0.5;
    const gy = height * 0.62;
    const gw = width * 0.72;
    const gh = height * 0.32;
  
    noStroke();
    fill(255, 255, 255, 70);
    rect(gx - gw / 2, gy - gh / 2, gw, gh, 22);
  
    // patties layout
    const py = gy + gh * 0.12;
    const xs = [gx - gw * 0.22, gx, gx + gw * 0.22];
  
    for (let i = 0; i < 3; i++) {
      const x = xs[i];
      const w = 190;
      const h = 90;
  
      // animate lift
      const lift = patties[i].lift;
      const targetLift = patties[i].picked ? 70 : 0;
      patties[i].lift = lerp(patties[i].lift, targetLift, 0.12);
        
      // patty shadow
      fill(0, 0, 0, 80);
      ellipse(x, py + 16, w * 0.88, h * 0.7);
  
      // patty
      fill(90, 55, 40, 240);
      ellipse(x, py - patties[i].lift, w, h);
  
      // grill lines on patty
      stroke(50, 30, 20, 110);
      strokeWeight(6);
      for (let k = -3; k <= 3; k++) {
        line(x - 70, (py - patties[i].lift) + k * 10, x + 70, (py - patties[i].lift) + k * 10);
      }
      noStroke();
  
      // prompt on hover (optional)
      const hover = dist(mouseX, mouseY, x, py - patties[i].lift) < 110;
      if (hover) {
        fill(255, 255, 255, 200);
        textAlign(CENTER, TOP);
        textSize(14);
        text("click", x, (py - patties[i].lift) + 60);
      }
    }
  
    // show candle only after correct patty revealed (we unlock it)
    drawCandles(GRILL_GAME_SCREEN_INDEX);
    tryCollectCandles(GRILL_GAME_SCREEN_INDEX);
  }
  

  function initRooftopFriends() {
    rooftopFriends = [
      {
        key: "coby",
        name: "Coby",
        img: () => cobyImg,
        screen: 1,
        x: () => width * 0.55,
        y: () => height * 0.68, // ✅ same level as Holly
        candleId: COBY_CANDLE_ID,
        wishText: "Happy birthday!!\nYou are literally sunshine.\nProud of you always.",
      },
      {
        key: "athena",
        name: "Athena",
        img: () => athenaImg,
        screen: 1,
        x: () => width * 0.45,
        y: () => height * 0.68, // ✅
        candleId: ATHENA_CANDLE_ID,
        wishText: "HAPPY BDAY!!\nYou make everything feel possible.\nLove you tons.",
      },
      {
        key: "matthew",
        name: "Matthew",
        img: () => matthewImg,
        screen: 1,
        x: () => width * 0.85,
        y: () => height * 0.68, // ✅
        candleId: MATTHEW_CANDLE_ID,
        wishText: "Happy birthday!!!\nThank you for being you.\nGo be iconic today.",
      },
    ];
  }
  
  
  function initGrillPattiesGame() {
    patties = [
      { lift: 0, picked: false },
      { lift: 0, picked: false },
      { lift: 0, picked: false },
    ];
  
    pattyCorrectIndex = Math.floor(random(3));
    grillCandleRevealed = false;
  
    const gc = candles.find(c => c.id === GRILL_PATTY_CANDLE_ID);
    if (gc) gc.unlocked = false;
  }
  

  function drawRooftopFriends() {
    if (worldIndex !== 1) return;
  
    for (const f of rooftopFriends) {
      if (f.screen !== worldIndex) continue;
  
      const fx = f.x();
      const fy = f.y();
  
      const img = f.img();
      if (img) {
        // ✅ draw them Holly-sized
        const targetH = 670; // same as Holly
        const targetW = targetH * (img.width / img.height);
  
        push();
        imageMode(CENTER);
        image(img, fx, fy, targetW, targetH);
        pop();
      }
  
      if (mode === "game" && isPlayerNearPoint(fx, fy, FRIEND_INTERACT_RADIUS)) {
        fill(255);
        textAlign(CENTER, BOTTOM);
        textSize(16);
        text("Press E", fx, fy - 300); // ✅ higher because they’re bigger now
      }
    }
  }
  

  function handleGrillPattyClick() {
    const gx = width * 0.5;
    const gy = height * 0.62;
    const gw = width * 0.72;
    const gh = height * 0.32;
  
    const py = gy + gh * 0.12;
    const xs = [gx - gw * 0.22, gx, gx + gw * 0.22];
  
    for (let i = 0; i < 3; i++) {
      const x = xs[i];
      const d = dist(mouseX, mouseY, x, py);
  
      if (d < 120) {
        // ✅ toggle this patty up/down
        patties[i].picked = !patties[i].picked;
        spawnConfetti(4);
  
        // ✅ if correct patty is lifted for the first time, reveal candle
        if (i === pattyCorrectIndex && patties[i].picked && !grillCandleRevealed) {
          grillCandlePos.x = x;
          grillCandlePos.y = py + 30;
          grillCandleRevealed = true;
  
          const gc = candles.find(c => c.id === GRILL_PATTY_CANDLE_ID);
          if (gc) gc.unlocked = true;
  
          spawnConfetti(14);
        }
  
        return;
      }
    }
  }
  
  
  
  
  
  
  function drawTinaGame() {
    background(142, 149, 244);
  
    noStroke();
    fill(255, 255, 255, 90);
    rect(0, height * 0.75, width, height * 0.25);
  
    imageMode(CENTER);
    image(tableImg, width * 0.75, height * 0.75, width * 0.4, height * 0.4);
  
    if (phoneOn === true) {
      drawPhone();
      updateFaceTimeGame();
      drawFaceTimeGameUI();
    }
  
    if (mode === "game" && !phoneOn && isPlayerNearPoint(table.x(), table.y(), TABLE_INTERACT_RADIUS)) {
      fill(255);
      textAlign(CENTER, BOTTOM);
      textSize(18);
      text("Press E", table.x(), table.y() - 220);
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
    text("Quick! Answer Tina's face time or she will go insane!!", width* 0.7, height * 0.3);
  }


  function getPhoneScreenRect() {
    const x = width * 0.1;
    const y = height * 0.09;
    const w = width * 0.26;
    const h = height * 0.84;
    return { x, y, w, h };
  }
  
  
  function startFaceTimeGame() {
    ftScore = 0;
    ftMisses = 0;
    ftActive = true;
    ftState = "playing";
    ftPopup = null;
    ftEndBtn = null;
    ftNextSpawnAt = millis() + random(250, 650);
  }
  
  function resetFaceTimeGameHard() {
    // sends you back to “tap table again”
    ftActive = false;
    ftState = "playing";
    ftPopup = null;
    ftEndBtn = null;
    ftScore = 0;
    ftMisses = 0;
    ftNextSpawnAt = 0;
    phoneOn = false;
  }
  
  
  function winFaceTimeGame() {
    // you can unlock a candle here later
    ftActive = false;
    ftPopup = null;
    spawnConfetti(40);
  }
  
  
  function spawnFaceTimePopup() {
    const scr = getPhoneScreenRect();
  
    // SMALLER popup (harder to click)
    const w = scr.w * 0.55;
    const h = scr.h * 0.12;
  
    const pad = 16;
    const x = random(scr.x + pad, scr.x + scr.w - w - pad);
    const y = random(scr.y + pad + 48, scr.y + scr.h - h - pad);
  
    // SMALLER buttons
    const btnW = w * 0.26;
    const btnH = h * 0.42;
    const btnY = y + h - btnH - 10;
  
    const hangX = x + 10;
    const pickupX = x + w - btnW - 10;
  
    const visibleMs = random(FT_VISIBLE_MIN, FT_VISIBLE_MAX);
  
    ftPopup = {
      x, y, w, h,
      hang:   { x: hangX,   y: btnY, w: btnW, h: btnH },
      pickup: { x: pickupX, y: btnY, w: btnW, h: btnH },
      expiresAt: millis() + visibleMs
    };
  }
  
  
  function updateFaceTimeGame() {
    if (!ftActive) return;
    if (ftState !== "playing") return;
  
    if (ftScore >= FT_TARGET) {
      ftState = "win";
      ftPopup = null;
      return;
    }
  
    const now = millis();
  
    if (ftPopup && now > ftPopup.expiresAt) {
      ftPopup = null;
      ftMisses += 1;
      ftNextSpawnAt = now + random(FT_GAP_MIN, FT_GAP_MAX);
    }
  
    if (!ftPopup && now > ftNextSpawnAt) {
      spawnFaceTimePopup();
    }
  }
  
  
  function drawFaceTimeGameUI() {
    if (!ftActive) return;
  
    const scr = getPhoneScreenRect();
  
    // HUD
    fill(30, 30, 30, 220);
    textAlign(LEFT, TOP);
    textSize(14);
    text(`Pickups: ${ftScore}/${FT_TARGET}   Misses: ${ftMisses}`, scr.x + 10, scr.y + 10);
  
    // END SCREEN (lose / win)
    if (ftState === "lose") {
      // dim screen
      noStroke();
      fill(0, 0, 0, 160);
      rect(scr.x, scr.y, scr.w, scr.h, 22);
  
      // card
      const cardW = scr.w * 0.86;
      const cardH = scr.h * 0.28;
      const cardX = scr.x + (scr.w - cardW) / 2;
      const cardY = scr.y + (scr.h - cardH) / 2;
  
      fill(255, 255, 255, 235);
      rect(cardX, cardY, cardW, cardH, 18);
  
      // message
      fill(20);
      textAlign(CENTER, CENTER);
      textSize(18);
  
      if (ftState === "lose") {
        text("You just received a message from Tina: ", cardX + cardW / 2, cardY + cardH * 0.35);

        fill(100)
        text("\"so you want me to kms?\"", cardX + cardW / 2, cardY + cardH * 0.45);
        textSize(13);
        fill(120)
        text("Game over. Try again.", cardX + cardW / 2, cardY + cardH * 0.60);
      }


  
      // restart button
      const btnW = cardW * 0.42;
      const btnH = cardH * 0.22;
      const btnX = cardX + (cardW - btnW) / 2;
      const btnY = cardY + cardH * 0.68;
  
      ftEndBtn = { x: btnX, y: btnY, w: btnW, h: btnH };
  
      fill(58, 63, 159);
      rect(btnX, btnY, btnW, btnH, 14);
  
      fill(255);
      textSize(14);
      text("Restart", btnX + btnW / 2, btnY + btnH / 2);
  
      return; // don't draw popup
    }
    else if (ftState === "win") {
        //tina message + candle 
    }
  
    ftEndBtn = null;
  
    // draw popup
    if (!ftPopup) return;
  
    // popup body
    fill(0, 0, 0, 220);
    rect(ftPopup.x, ftPopup.y, ftPopup.w, ftPopup.h, 16);
  
    // title
    fill(255);
    textAlign(LEFT, TOP);
    textSize(14);
    text("FaceTime", ftPopup.x + 10, ftPopup.y + 8);
  
    // subtitle
    fill(230);
    textSize(11);
    text("Incoming call…", ftPopup.x + 10, ftPopup.y + 26);
  
    // hang (red)
    fill(230, 60, 60);
    rect(ftPopup.hang.x, ftPopup.hang.y, ftPopup.hang.w, ftPopup.hang.h, 10);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(11);
    text("Hang", ftPopup.hang.x + ftPopup.hang.w / 2, ftPopup.hang.y + ftPopup.hang.h / 2);
  
    // pickup (green)
    fill(40, 200, 120);
    rect(ftPopup.pickup.x, ftPopup.pickup.y, ftPopup.pickup.w, ftPopup.pickup.h, 10);
    fill(255);
    text("Pick", ftPopup.pickup.x + ftPopup.pickup.w / 2, ftPopup.pickup.y + ftPopup.pickup.h / 2);
  }
  
  

  function drawFortniteScene() {
    background(142, 149, 244);
  
    // background
    if (fortniteBGImg) {
      imageMode(CENTER);
      image(fortniteBGImg, width / 2, height / 2, width, height);
    }
  
    // floor
    noStroke();
    fill(224, 209, 168);
    rect(0, height * 0.9, width, height * 0.1);
  
    // chest (no hover)
    if (chestImg) {
      imageMode(CENTER);
      const cw = width * 0.20;
      const chh = cw * (chestImg.height / chestImg.width);
      image(chestImg, chest.x(), chest.y(), cw, chh);
    }
  
    // loot appears after open
    if (chest.opened) {
      if (chugSplashImg && chugSplash.visible && !hasChug) {
        imageMode(CENTER);
        const sw = width * 0.10;
        const sh = sw * (chugSplashImg.height / chugSplashImg.width);
        image(chugSplashImg, chugSplash.x(), chugSplash.y(), sw, sh);
      }
  
      if (holoImg && holo.visible && !hasHolo) {
        imageMode(CENTER);
        const hw = width * 0.14;
        const hh = hw * (holoImg.height / holoImg.width);
        image(holoImg, holo.x(), holo.y(), hw, hh);
      }
    }
  
    // chest hold prompt + bar
    if (mode === "game" && !chest.opened && isPlayerNearPoint(chest.x(), chest.y(), CHEST_INTERACT_RADIUS)) {
      fill(230, 60, 60);
      textAlign(CENTER, BOTTOM);
      textSize(18);
      text("Hold E to open", chest.x(), chest.y() - 120);
      drawChestProgressBar();
    }
  
    // loot pickup prompts
    drawFortniteLootPrompts();
  
    // inventory UI
    drawFortniteInventory();
  
    // shooter overlay (if active)
    if (shooterActive) {
      drawShooterOverlay();
    }
  
    // label
    fill(255, 255, 255, 160);
    textAlign(CENTER, TOP);
    textSize(18);
    text("Fortnite", width / 2, 16);
  }

  function drawFortniteLootPrompts() {
    if (!chest.opened) return;
  
    // prompt near chug splash
    if (chugSplash.visible && !hasChug && isPlayerNearPoint(chugSplash.x(), chugSplash.y(), LOOT_PICKUP_RADIUS)) {
      fill(230, 60, 60);
      textAlign(CENTER, BOTTOM);
      textSize(16);
      text("Press E to pick up Chug Splash", chugSplash.x(), chugSplash.y() - 60);
    }
  
    // prompt near holo
    if (holo.visible && !hasHolo && isPlayerNearPoint(holo.x(), holo.y(), LOOT_PICKUP_RADIUS)) {
      fill(230, 60, 60);
      textAlign(CENTER, BOTTOM);
      textSize(16);
      text("Press E to pick up Holo", holo.x(), holo.y() - 60);
    }
  
    // once you have chug, show how to use it
    if (hasChug && !shooterActive) {
      fill(255, 255, 255, 200);
      textAlign(LEFT, TOP);
      textSize(14);
      text("Press F to use Chug Splash", 16, 48);
    }
  }
  
  function drawFortniteInventory() {
    // tiny text inventory in top-left
    fill(0, 0, 0, 120);
    noStroke();
    rect(12, 72, 210, 58, 12);
  
    fill(255, 255, 255, 230);
    textAlign(LEFT, TOP);
    textSize(14);
    text(`Holo: ${hasHolo ? "YES" : "NO"}`, 22, 82);
    text(`Chug: ${hasChug ? "YES" : "NO"}`, 22, 102);
  }
  
  function tryPickupFortniteLoot() {
    if (worldIndex !== FORTNITE_SCREEN_INDEX) return false;
    if (!chest.opened) return false;
  
    // pick up chug
    if (chugSplash.visible && !hasChug && isPlayerNearPoint(chugSplash.x(), chugSplash.y(), LOOT_PICKUP_RADIUS)) {
      hasChug = true;
      chugSplash.visible = false;
      spawnConfetti(12);
      return true;
    }
  
    // pick up holo
    if (holo.visible && !hasHolo && isPlayerNearPoint(holo.x(), holo.y(), LOOT_PICKUP_RADIUS)) {
      hasHolo = true;
      holo.visible = false;
      spawnConfetti(12);
      return true;
    }
  
    return false;
  }
  
  function tryUseChugStartShooter() {
    if (worldIndex !== FORTNITE_SCREEN_INDEX) return false;
    if (!hasChug) return false;
    if (shooterActive) return false;
  
    // start shooter
    hasChug = false; // consume it
    startShooterGame();
    spawnConfetti(18);
    return true;
  }
  
  

  function updateFortniteChestHold() {
    if (worldIndex !== FORTNITE_SCREEN_INDEX) return;
    if (mode !== "game") return;
    if (chest.opened) return;
  
    const near = isPlayerNearPoint(chest.x(), chest.y(), CHEST_INTERACT_RADIUS);
  
    // must be near AND holding E
    if (near && keyIsDown(69)) { // 69 = 'E'
      chest.holding = true;
      chest.holdMs += deltaTime;
  
      if (chest.holdMs >= CHEST_HOLD_MS) {
        openFortniteChest();
      }
    } else {
      // not holding / walked away -> decay or reset
      chest.holding = false;
      chest.holdMs = max(0, chest.holdMs - deltaTime * 1.5); // smooth fallback
    }
  }

  
  function openFortniteChest() {
    chest.opened = true;
    chest.holdMs = CHEST_HOLD_MS;
    spawnConfetti(25);
  
    // show loot
    chugSplash.visible = true;
    holo.visible = true;
  
    // unlock the candle that pops out
    const c = candles.find(c => c.id === FORTNITE_CANDLE_ID);
    if (c) c.unlocked = true;
  }
  
  
  function startShooterGame() {
    shooterActive = true;
    shooterState = "playing";
    shooterEndBtn = null; // not used anymore
  
    bullets = [];
    enemies = [];
    enemyBullets = [];
  
    enemiesSpawned = 0;
    enemiesKilled = 0;
  
    // reset holly stats for the shooter
    hollyShield = HOLLY_MAX_SHIELD;
    hollyHealth = HOLLY_MAX_HEALTH;
  
    nextEnemySpawnAt = millis() + 600;
    nextEnemyShotAt = millis() + random(ENEMY_SHOOT_GAP_MIN, ENEMY_SHOOT_GAP_MAX);
  }

  function spawnEnemy() {
    const h = 300;
    const w = 200;
  
    enemies.push({
      x: -50,
      y: height * 0.75,
      w,
      h,
      hp: ENEMY_HP,
      speed: random(ENEMY_SPEED_MIN, ENEMY_SPEED_MAX),
      skinIndex: enemiesSpawned % 4
    });
  }
  
  
  function updateShooterGame() {
    if (!shooterActive) return;
    if (worldIndex !== FORTNITE_SCREEN_INDEX) return;
    if (shooterState !== "playing") return;
  
    const now = millis();
  
    // spawn enemies
    if (enemiesSpawned < ENEMY_LIMIT && now >= nextEnemySpawnAt) {
      spawnEnemy();
      enemiesSpawned++;
      nextEnemySpawnAt = now + random(900, 1400);
    }
  
    // holly bullets / enemies movement
    updateBullets();
    updateEnemies();
    handleBulletEnemyCollisions();
  
    // enemies shooting + bullets hitting holly
    updateEnemyShooting();
    updateEnemyBullets();
  
    // WIN: unlock 2 reward candles, stop shooter (no end screen)
    if (enemiesSpawned >= ENEMY_LIMIT && enemiesKilled >= ENEMY_LIMIT) {
      shooterState = "win";
      shooterActive = false;
  
      const c1 = candles.find(c => c.id === FORTNITE_REWARD_CANDLE_1);
      const c2 = candles.find(c => c.id === FORTNITE_REWARD_CANDLE_2);
      if (c1) c1.unlocked = true;
      if (c2) c2.unlocked = true;

      showVictory = true;
      victoryUntil = millis() + VICTORY_SHOW_MS;

  
      spawnConfetti(35);
    }
  }

  function drawVictory() {
    if (!showVictory) return;
  
    if (millis() > victoryUntil) {
      showVictory = false;
      return;
    }
  
    if (!victoryImg) return;
  
    push();
    imageMode(CENTER);
  
    // subtle dark overlay behind it
    noStroke();
    fill(0, 0, 0, 120);
    rect(0, 0, width, height);
  
    const w = width * 0.7;
    const h = w * (victoryImg.height / victoryImg.width);
    image(victoryImg, width / 2, height / 2, w, h);
    pop();
  }
  
  
  

  
  function shootBullet() {
    // bullets shoot in facing direction
    bullets.push({
      x: holly.x,
      y: holly.y - 20,
      r: BULLET_RADIUS,
      vx: holly.facing * BULLET_SPEED
    });
  }
  
  function updateBullets() {
    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].x += bullets[i].vx;
  
      // remove offscreen
      if (bullets[i].x < -50 || bullets[i].x > width + 50) {
        bullets.splice(i, 1);
      }
    }
  }
  
  function updateEnemies() {
    for (let i = enemies.length - 1; i >= 0; i--) {
      const e = enemies[i];
      e.x += e.speed; // move from left -> right
  
      // if you want "lose" later, this is where you'd detect reaching Holly
      // for now: just keep them on screen
      if (e.x > width + 80) {
        enemies.splice(i, 1);
      }
    }
  }
  
  function handleBulletEnemyCollisions() {
    for (let bi = bullets.length - 1; bi >= 0; bi--) {
      const b = bullets[bi];
  
      for (let ei = enemies.length - 1; ei >= 0; ei--) {
        const e = enemies[ei];
  
        const hit =
          b.x >= e.x - e.w / 2 &&
          b.x <= e.x + e.w / 2 &&
          b.y >= e.y - e.h / 2 &&
          b.y <= e.y + e.h / 2;
  
        if (hit) {
          bullets.splice(bi, 1);
  
          e.hp -= BULLET_DMG;
          spawnConfetti(3);
  
          if (e.hp <= 0) {
            enemies.splice(ei, 1);
            enemiesKilled += 1;
            spawnConfetti(10);
          }
          return;
        }
      }
    }
  }

  function spawnEnemyBullet(fromEnemy) {
    // shoot towards holly
    const dx = holly.x - fromEnemy.x;
    const dy = (holly.y - 20) - fromEnemy.y;
    const mag = Math.max(0.001, Math.sqrt(dx * dx + dy * dy));
  
    enemyBullets.push({
      x: fromEnemy.x,
      y: fromEnemy.y - 10,
      vx: (dx / mag) * ENEMY_BULLET_SPEED,
      vy: (dy / mag) * ENEMY_BULLET_SPEED,
      r: ENEMY_BULLET_RADIUS
    });
  }
  
  function updateEnemyShooting() {
    const now = millis();
    if (enemies.length === 0) return;
  
    if (now >= nextEnemyShotAt) {
      // pick a random alive enemy to shoot
      const shooter = random(enemies);
      spawnEnemyBullet(shooter);
  
      nextEnemyShotAt = now + random(ENEMY_SHOOT_GAP_MIN, ENEMY_SHOOT_GAP_MAX);
    }
  }
  
  function updateEnemyBullets() {
    for (let i = enemyBullets.length - 1; i >= 0; i--) {
      const b = enemyBullets[i];
      b.x += b.vx;
      b.y += b.vy;
  
      // offscreen
      if (b.x < -80 || b.x > width + 80 || b.y < -80 || b.y > height + 80) {
        enemyBullets.splice(i, 1);
        continue;
      }
  
      // hit holly (use a generous radius)
      const hx = holly.x;
      const hy = holly.y - 30;
      if (dist(hx, hy, b.x, b.y) < 55) {
        enemyBullets.splice(i, 1);
        applyDamageToHolly(ENEMY_BULLET_DMG);
      }
    }
  }

  function drawHollyGun() {
    if (!gunImg) return;
  
    // tweak offsets until it looks like she's holding it
    const gx = holly.x + (holly.facing === 1 ? 55 : -55);
    const gy = holly.y - 70;
  
    push();
    translate(gx, gy);
  
    // ✅ flip gun so it matches holly direction
    // If your gun art points LEFT by default, use this:
    scale(holly.facing, 1);
  
    imageMode(CENTER);
    image(gunImg, 0, 0, 210, 170);
    pop();
  }
  
  
  function drawHollyBars() {
    const w = 360;
    const h = 14;
    const gap = 10;
  
    const x = width / 2 - w / 2;   // ✅ centered
    const y = 16;                  // ✅ top
  
    // ---- SHIELD ----
    noStroke();
    fill(0, 0, 0, 120);
    rect(x, y, w, h, 10);
  
    const sPct = constrain(hollyShield / HOLLY_MAX_SHIELD, 0, 1);
    fill(80, 170, 255, 220);
    rect(x, y, w * sPct, h, 10);
  
    // ---- HEALTH ----
    const y2 = y + h + gap;
  
    noStroke();
    fill(0, 0, 0, 120);
    rect(x, y2, w, h, 10);
  
    const hPct = constrain(hollyHealth / HOLLY_MAX_HEALTH, 0, 1);
    fill(60, 220, 120, 220);
    rect(x, y2, w * hPct, h, 10);
  
    // labels (optional)
    fill(255, 255, 255, 230);
    textAlign(CENTER, BOTTOM);
    textSize(12);
    text(`Shield ${Math.ceil(hollyShield)} / ${HOLLY_MAX_SHIELD}`, width/2, y - 2);
    text(`Health ${Math.ceil(hollyHealth)} / ${HOLLY_MAX_HEALTH}`, width/2, y2 - 2);
  }
  
  
  
  function applyDamageToHolly(dmg) {
    let remaining = dmg;
  
    // shield first
    if (hollyShield > 0) {
      const take = Math.min(hollyShield, remaining);
      hollyShield -= take;
      remaining -= take;
    }
  
    // then health
    if (remaining > 0) {
      hollyHealth -= remaining;
    }
  
    // ✅ DO NOT allow enemies to kill her before she kills them
    // Keep her at minimum 1 HP while the fight is ongoing.
    if (enemiesKilled < ENEMY_LIMIT) {
      hollyHealth = Math.max(1, hollyHealth);
    }
  }
  
  
  
  function drawShooterOverlay() {
    // tint overlay a bit
    noStroke();
    fill(0, 0, 0, 70);
    rect(0, 0, width, height);
  
    // instructions + progress
    fill(255, 255, 255, 230);
    textAlign(LEFT, TOP);
    textSize(16);
    text("Shooter: SPACE to shoot", 16, 16);
    text(`Enemies: ${enemiesKilled}/${ENEMY_LIMIT}`, 16, 36);
  
    // draw holly health/shield HUD
    drawHollyBars();
  
    // draw holly gun (just an overlay image at holly x/y)
    drawHollyGun();
  
    // holly bullets
    noStroke();
    fill(255);
    for (const b of bullets) circle(b.x, b.y, b.r * 2);
  
    // enemy bullets
    fill(255, 224, 102);
    for (const b of enemyBullets) circle(b.x, b.y, b.r * 2);
  
    // enemies
    for (const e of enemies) drawEnemy(e);
  }
  
  
  function drawEnemy(e) {
    // draw skin if available
    const img = enemyImgs?.[e.skinIndex];
    if (img) {
      imageMode(CENTER);
      image(img, e.x, e.y, e.w, e.h);
    } else {
      // fallback rectangle
      fill(255, 111, 97, 230);
      rectMode(CENTER);
      rect(e.x, e.y, e.w, e.h, 12);
    }
  
    // hp bar above
    const barW = e.w;
    const barH = 10;
    const x = e.x - barW / 2;
    const y = e.y - e.h / 2 - 18;
  
    noStroke();
    fill(0, 0, 0, 120);
    rectMode(CORNER);
    rect(x, y, barW, barH, 6);
  
    const pct = constrain(e.hp / ENEMY_HP, 0, 1);
    fill(40, 200, 120, 220);
    rect(x, y, barW * pct, barH, 6);
  
    noFill();
    stroke(255, 255, 255, 150);
    strokeWeight(2);
    rect(x, y, barW, barH, 6);
    noStroke();
  
    rectMode(CORNER);
  }
  
  
  function drawShooterWinScreen() {
    // dim overlay
    noStroke();
    fill(0, 0, 0, 160);
    rect(0, 0, width, height);
  
    // card
    const cardW = width * 0.42;
    const cardH = height * 0.22;
    const cardX = (width - cardW) / 2;
    const cardY = (height - cardH) / 2;
  
    fill(255, 255, 255, 240);
    rect(cardX, cardY, cardW, cardH, 18);
  
    fill(20);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("YOU WIN 🏆", cardX + cardW / 2, cardY + cardH * 0.35);
  
    textSize(13);
    fill(90);
    text("No more enemies are spawning.", cardX + cardW / 2, cardY + cardH * 0.52);
  
    // restart button
    const btnW = cardW * 0.40;
    const btnH = cardH * 0.22;
    const btnX = cardX + (cardW - btnW) / 2;
    const btnY = cardY + cardH * 0.66;
  
    shooterEndBtn = { x: btnX, y: btnY, w: btnW, h: btnH };
  
    fill(58, 63, 159);
    rect(btnX, btnY, btnW, btnH, 14);
  
    fill(255);
    textSize(14);
    text("Restart", btnX + btnW / 2, btnY + btnH / 2);
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

  function drawChestProgressBar() {
    const pct = constrain(chest.holdMs / CHEST_HOLD_MS, 0, 1);
  
    const w = 220;
    const h = 16;
    const x = chest.x() - w / 2;
    const y = chest.y() - 100;
  
    // bg
    noStroke();
    fill(255, 255, 255, 90);
    rect(x, y, w, h, 10);
  
    // fill
    fill(40, 200, 120, 220);
    rect(x, y, w * pct, h, 10);
  
    // tiny outline
    noFill();
    stroke(255, 255, 255, 140);
    strokeWeight(2);
    rect(x, y, w, h, 10);
    noStroke();
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
        id: 102,
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
      },
      {
        id: FORTNITE_CANDLE_ID,
        screen: FORTNITE_SCREEN_INDEX,
        x: () => width * 0.55,
        y: () => height * 0.87,
        collected: false,
        unlocked: false,
        scale: 1.0
      },
      {
        id: FORTNITE_REWARD_CANDLE_1,
        screen: FORTNITE_SCREEN_INDEX,
        x: () => width * 0.12,      // left side
        y: () => height * 0.87,
        collected: false,
        unlocked: false,
        scale: 1.0
      },
      {
        id: FORTNITE_REWARD_CANDLE_2,
        screen: FORTNITE_SCREEN_INDEX,
        x: () => width * 0.22,      // left side
        y: () => height * 0.87,
        collected: false,
        unlocked: false,
        scale: 1.0
      },
      {
        id: HALLE_CANDLE_ID,
        screen: -999,              // special: only collected in findFriends
        x: () => 0,
        y: () => 0,
        collected: false,
        unlocked: true,
        scale: 1.0
      },
      {
        id: GRILL_PATTY_CANDLE_ID,
        screen: GRILL_GAME_SCREEN_INDEX,
        x: () => grillCandlePos.x,
        y: () => grillCandlePos.y,
        collected: false,
        unlocked: false,
        scale: 1.0
      },
            // === Friend wish candles (must exist for wish screen to collect) ===
            {
                id: COBY_CANDLE_ID,
                screen: WISH_SCREEN_INDEX,   // candle is collected on the wish screen
                x: () => width / 2,
                y: () => height * 0.80,
                collected: false,
                unlocked: true,
                scale: 1.0
              },
              {
                id: ATHENA_CANDLE_ID,
                screen: WISH_SCREEN_INDEX,
                x: () => width / 2,
                y: () => height * 0.80,
                collected: false,
                unlocked: true,
                scale: 1.0
              },
              {
                id: MATTHEW_CANDLE_ID,
                screen: WISH_SCREEN_INDEX,
                x: () => width / 2,
                y: () => height * 0.80,
                collected: false,
                unlocked: true,
                scale: 1.0
              },
        
      
      
      
      
      
      
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
  
      if (isPlayerNearPoint(cx, cy, 200) && c.unlocked === true) {
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
    
    if (mode === "findFriends") {

    
        if (key === "c" || key === "C") {
            const halleHere = (ff.viewX === ff.hx && ff.viewY === ff.hy);
            const halleCandle = candles.find(c => c.id === HALLE_CANDLE_ID);
      
            if (halleHere && halleCandle && !halleCandle.collected) {
              halleCandle.collected = true;
              candlesCollected += 1;
              spawnConfetti(30);
              ff.found = true;
            }
            return; // ✅ do not set interactPressed
          }
      
    }

    if (mode === "wish") {
        if (key === "c" || key === "C") {
          const candle = candles.find(c => c.id === wish.candleId);
          if (candle && !candle.collected) {
            candle.collected = true;
            candlesCollected += 1;
            spawnConfetti(25);
          }
          return;
        }
      }
      

    if (key === "e" || key === "E") {
      tryInteract();
    }
  
    if (key === "c" || key === "C") {
      interactPressed = true;
    }
  
    // Use chug to start shooter
    if (key === "f" || key === "F") {
        if (worldIndex === PICKLEBALL_SCREEN_INDEX && mode === "game" && pickleballCanCheckPhone) {
            findFriends();
            return;
          }
      tryUseChugStartShooter();
    }
  
    // Shoot (only during shooter)
    if (key === " " && shooterActive && shooterState === "playing" && worldIndex === FORTNITE_SCREEN_INDEX) {
      shootBullet();
    }
  
    // leave extra screen
    if ((key === "q" || key === "Q") && (mode === "computer" || mode === "bookshelf" || mode === "grillGame" || mode === "findFriends" || mode === "wish")) {
      mode = "game";
      worldIndex = returnWorldIndex;
    }
  }
  

  function mousePressed() {

    // --- FindFriends arrow clicks ---
  if (mode === "findFriends" && ff.btns && !ff.found) {
    const inside = (r) =>
      mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h;

    if (inside(ff.btns.left))  { ffMove(-1, 0); return; }
    if (inside(ff.btns.right)) { ffMove(1, 0); return; }
    if (inside(ff.btns.up))    { ffMove(0, -1); return; }
    if (inside(ff.btns.down))  { ffMove(0, 1); return; }
  }
  if (mode === "grillGame") {
    handleGrillPattyClick();
    return;
  }


    if (!phoneOn || !ftActive) return;
  
    const inside = (r) =>
      mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h;
  
    // If on end screen, only restart button works
    if (ftState === "lose" || ftState === "win") {
      if (ftEndBtn && inside(ftEndBtn)) {
        // restart should make you “start over” from the table again
        resetFaceTimeGameHard();
      }
      return;
    }
  
    if (!ftPopup) return;
  
    // clicked hang up => instant lose screen
    if (inside(ftPopup.hang)) {
      ftState = "lose";
      ftPopup = null;
      return;
    }
  
    // clicked pickup => progress
    if (inside(ftPopup.pickup)) {
      ftScore += 1;
      spawnConfetti(10);
  
      ftPopup = null;
      ftNextSpawnAt = millis() + random(FT_GAP_MIN, FT_GAP_MAX);
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
    if (tryPickupFortniteLoot()) return;
    if (tryInteractWithFriend()) return; // ✅ ADD THIS



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
    rooftopPlants = [
      { id: 0, screen: 1, x: () => width * 0.07, y: () => height * 0.65, offsetX: 0, moved: false, shakeTimer: 0, disabled: false },
      { id: 1, screen: 1, x: () => width * 0.25, y: () => height * 0.65, offsetX: 0, moved: false, shakeTimer: 0, disabled: false },
      { id: 2, screen: 1, x: () => width * 0.75, y: () => height * 0.65, offsetX: 0, moved: false, shakeTimer: 0, disabled: false },
      { id: 3, screen: 1, x: () => width * 0.93, y: () => height * 0.65, offsetX: 0, moved: false, shakeTimer: 0, disabled: false }
    ];
  
    for (const p of rooftopPlants) p.isCorrect = (p.id === 1);
  }
  
  function tryInteractWithRooftopPlants() {
    if (worldIndex !== 1) return false;
  
    for (const p of rooftopPlants) {
      if (p.disabled) continue; // ✅ hard lock
  
      const px = p.x() + p.offsetX;
      const py = p.y();
  
      if (isPlayerNearPoint(px, py, PLANT_INTERACT_RADIUS)) {
  
        // 🔒 disable plant forever after first press
        p.disabled = true;
  
        if (p.isCorrect) {
          p.moved = true;
          p.offsetX = PLANT_SLIDE_DIST;
  
          const hidden = candles.find(c => c.id === ROOFTOP_PLANT_CANDLE_ID);
          if (hidden) hidden.unlocked = true;
  
          spawnConfetti(20);
        } else {
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
      initGrillPattiesGame(); // reset patties + re-hide candle each time you open

      return true;
    }
  
    return false;
  }
  
  
  function tryInteractWithTable() {
    if (worldIndex !== table.screen) return false;
  
    if (isPlayerNearPoint(table.x(), table.y(), TABLE_INTERACT_RADIUS)) {
      phoneOn = true;
      startFaceTimeGame();
      return true;
    }
    return false;
  }
  
  function tryInteractWithFriend() {
    if (mode !== "game") return false;
    if (worldIndex !== 1) return false;
  
    for (const f of rooftopFriends) {
      const fx = f.x();
      const fy = f.y();
  
      if (isPlayerNearPoint(fx, fy, FRIEND_INTERACT_RADIUS)) {
        returnWorldIndex = worldIndex;
        mode = "wish";
        worldIndex = WISH_SCREEN_INDEX;
  
        wish.who = f.key;
        wish.candleId = f.candleId;
  
        spawnConfetti(10);
        return true;
      }
    }
    return false;
  }
  
  