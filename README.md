
# Birthday Adventure Game (HTML, CSS, Javascript, p5.js)

An interactive, story-driven birthday game built with **p5.js**, designed as a playful digital gift. The experience combines exploration, mini-games, collectibles, animations, and narrative moments into a single cohesive world.

This project focuses on **game logic, interaction design, and creative coding**, rather than traditional UI or web app structure.

---

## Features

* **Multi-scene world system**

  * Bedroom, rooftop, pickleball court, phone interface, and mini-game scenes
  * Scene transitions handled through a centralized `worldIndex` system

* **Exploration-based gameplay**

  * Player movement with collision-aware interaction zones
  * Context-based prompts (e.g. “Press E”, “Press F”) depending on proximity and state

* **Collectible system**

  * Candles placed across different scenes
  * Persistent collection tracking
  * Visual HUD displaying collected candles

* **Mini-games**

  * “Find Friends” map-based search game
  * Timed dialogue progression that reacts to player inactivity
  * Phone-triggered transitions between game states
  * Crossword 

* **Animated feedback**

  * Confetti particle system for celebratory moments
  * Idle and movement animations for the player
  * Visual highlights when interacting with objects

* **Narrative design**

  * Lighthearted birthday storyline told through environmental cues
  * Timed text prompts to guide pacing without forcing the player

---

## Built With

* **p5.js** – Rendering, animation, input handling
* **JavaScript (ES6)** – Game logic and state management
* **HTML** - Crossword 
* **Custom assets** – Hand-drawn graphics, sprites, and UI elements

---

## Technical Highlights

* Modular scene rendering functions (`drawBedroom`, `drawPickleball`, `drawFindFriends`, etc.)
* Global game state management using:

  * `worldIndex` for scene control
  * `mode` for interaction context (`game`, `computer`, `landing`)
* Reusable interaction logic based on distance thresholds
* Object-based collectible tracking with persistent flags
* Particle system implementation for confetti effects
* Separation of **rendering**, **interaction**, and **state updates** for maintainability

---

## Controls

| Key               | Action                            |
| ----------------- | --------------------------------- |
| Arrow Keys / WASD | Move character                    |
| E                 | Interact with nearby objects      |
| F                 | Open phone / trigger story events |
| C                 | Collect candle (when prompted)    |

---

## Purpose

This project was created as a **personal birthday gift**, blending storytelling, humor, and interactive design. It also serves as a creative coding exercise exploring:

* Game state management
* Interactive storytelling
* Player feedback and pacing
* Building playful experiences with code

