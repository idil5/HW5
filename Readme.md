Github URL: https://idil5.github.io/HW5/   
Repository: https://github.com/idil5/HW5

# Scrabble Game README

This document provides a comprehensive yet straightforward overview of the Scrabble game implementation. The project consists of three main files: `index.html`, `styles.css`, and `scripts.js`. Each file contributes to the game's functionality, styling, and structure.

---

## Table of Contents
1. [HTML (`index.html`)](#html-indexhtml)
2. [CSS (`styles.css`)](#css-stylescss)
3. [JavaScript (`scripts.js`)](#javascript-scriptsjs)
4. [How It Works](#how-it-works)
5. [Reset and Shuffle Features](#reset-and-shuffle-features)

---

## HTML (`index.html`)
This file defines the structure of the Scrabble game interface. The major sections include:

### Key Elements:
- **Board Container** (`<div id="board">`):
  Represents the Scrabble board where tiles are placed.
- **Tile Rack** (`<div id="tiles">`):
  Displays the player's current set of tiles.
- **Swap Box** (`<div id="swap-box">`):
  Allows players to exchange tiles.
- **Score Display** (`<span id="score">`):
  Shows the total score.
- **Buttons**:
  - `Reset Game`: Resets the entire game state.
  - `Shuffle Rack`: Randomizes the tile rack.

---

## CSS (`styles.css`)
This file is responsible for the visual styling of the game interface, ensuring a user-friendly and appealing design.

### Key Features:
- **Board Styling**:
  - `.board-square`: Defines each Scrabble board square.
  - `.bonus-triple-word`, `.bonus-double-word`, etc.: Special styles for bonus squares.
- **Tile Rack and Tiles**:
  - `.tile`: Ensures tiles are draggable and styled consistently.
- **Buttons and Layout**:
  - Customizes the appearance of control buttons for reset and shuffle.

---

## JavaScript (`scripts.js`)
This file implements the game's functionality, including board generation, score calculation, tile replenishment, and drag-and-drop interactivity.

### Key Functions:

#### 1. **`initializeGame()`**
- Initializes the game by creating a tile bag, generating a tile rack, and displaying it.
- Ensures the board is prepared for interaction.

#### 2. **`createTileBag()`**
- Generates the initial set of tiles based on Scrabble letter distributions and values.

#### 3. **`generateTileRack()`**
- Randomly selects tiles from the tile bag to fill the player's rack (up to 7 tiles).

#### 4. **`displayTileRack()`**
- Dynamically displays tiles in the player's rack and enables drag-and-drop functionality.

#### 5. **`initializeBoard()`**
- Populates the board with squares, marking special bonus tiles like "Double Word" and "Triple Letter."

#### 6. **`calculateTileScore(letter, square)`**
- Calculates the score of a tile based on its value and any applicable square bonuses.

#### 7. **`calculateWordScore(placedTiles)`**
- Computes the total score for a word based on the tiles placed during a turn and any word multipliers.

#### 8. **`updateTotalScore()`**
- Updates the score displayed to the user.

#### 9. **`replenishRack()`**
- Replenishes the player's tile rack after each turn by randomly drawing from the tile bag.

#### 10. **`makeBoardDroppable()`**
- Enables the drag-and-drop functionality for placing tiles on the board.
- Ensures tiles are placed in valid positions.

#### 11. **`resetGame()`**
- Clears the board, resets the score, and reinitializes the game state.

#### 12. **`shuffleRack()`**
- Randomizes the order of tiles in the player's rack.

---

## How It Works

1. **Game Start**:
   - The board is displayed with bonus tiles highlighted.
   - A set of 7 tiles is generated for the player's rack.

2. **Gameplay**:
   - Players drag tiles from the rack to the board.
   - Scores are calculated dynamically based on the tiles' placement and bonus squares.
   - After each turn, the rack is replenished, and the game continues until all tiles are used or the player quits.

3. **Score Calculation**:
   - Each tile's score is based on its letter value.
   - Special squares apply multipliers for individual tiles or entire words.

---

## Reset and Shuffle Features

- **Reset Game**:
  Clears all tiles, resets the score, and starts a new game.

- **Shuffle Rack**:
  Randomizes the order of tiles in the player's rack without affecting the game state.

---

This project integrates drag-and-drop interactivity with dynamic game logic, creating an engaging digital Scrabble experience.

### CSS and HTML Integration

#### CSS Highlights:
- **Responsive Board:**
  The Scrabble board is styled using a grid layout for precise alignment of squares.
- **Bonus Square Styles:**
  Different colors and text labels for "Double Letter," "Triple Word," etc.
- **Tile Styling:**
  Ensures tiles are visually distinct, draggable, and interactive.

#### HTML Highlights:
- The structure supports dynamic elements like draggable tiles and droppable board squares.
- Bonus references visually explain special squares to players.

All features are implemented cohesively to deliver an accessible and visually pleasing game.

