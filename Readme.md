# Scrabble Game 🧩

Welcome to the Scrabble Game! This project is a browser-based implementation of the classic word game, built with **HTML**, **CSS**, and **JavaScript**. The game allows players to place tiles on a 15x15 board, score points based on word bonuses, and manage their tile rack.

---

## Features

### Gameplay
- **15x15 Game Board**: Includes special squares like triple word, double word, triple letter, and double letter scores.
- **Draggable Tiles**: Drag and drop tiles onto the board to form words.
- **Score Calculation**: Automatically calculates and updates scores based on tile placements and bonuses.
- **Tile Rack Management**: Replenishes the rack with new tiles after each turn.
- **Dynamic Interactions**: Visual feedback for occupied and bonus tiles.

### Bonuses
- **Double Letter Bonus**: Multiplies the tile’s value by 2.
- **Triple Letter Bonus**: Multiplies the tile’s value by 3.
- **Double Word Bonus**: Multiplies the word’s total score by 2.
- **Triple Word Bonus**: Multiplies the word’s total score by 3.

---

## Files

### 1. **HTML (scrabble.html)**
Defines the structure of the game interface:
- A 15x15 grid for the board.
- A tile rack for player tiles.
- Buttons for submitting turns, resetting the game, and shuffling the tile rack.

### 2. **CSS (styles.css)**
Styles the game with:
- A clean and responsive layout.
- Visual differentiation for bonus squares (e.g., color-coding).
- Draggable tiles with a uniform size and design.

### 3. **JavaScript (scripts.js)**
Handles the game logic:
- **Board Initialization**: Generates the game board with special bonuses.
- **Tile Management**: Creates a tile bag, replenishes the rack, and manages interactions.
- **Score Calculation**: Computes scores based on tile placement and bonuses.
- **Game State**: Tracks placed and submitted tiles, updates scores, and resets the game.

---

## How to Play

1. **Set Up**
   - Open `scrabble.html` in a browser to launch the game.

2. **Place Tiles**
   - Drag tiles from your rack to the board.
   - Start by placing a tile on the center square (★).
   - Continue placing adjacent tiles to form words.

3. **Submit Your Turn**
   - Click the **Submit Turn** button after placing tiles.
   - The game calculates your turn's score and updates the total score.
   - The rack replenishes with new tiles.

4. **Shuffle Tiles**
   - Click the **Shuffle Rack** button to rearrange your rack tiles.

5. **Reset the Game**
   - Click the **Reset Game** button to restart the game and reset all scores.

---

## Scoring System

- Each tile has a base value.
- Bonuses are applied as follows:
  - **Double Letter**: Multiplies the tile’s value by 2.
  - **Triple Letter**: Multiplies the tile’s value by 3.
  - **Double Word**: Multiplies the word’s total score by 2.
  - **Triple Word**: Multiplies the word’s total score by 3.
- The score for each turn adds to the total score.

---

## Key Functions

### Board Initialization
```javascript
initializeBoard();
makeBoardDroppable();
```
Generates the board and sets up droppable functionality for tiles.

### Tile Rack
```javascript
replenishRack();
shuffleRack();
```
Replenishes and shuffles the player's tile rack dynamically.

### Score Calculation
```javascript
calculateTileScore(letter, square);
calculateWordScore(placedTiles);
```
Calculates scores for individual tiles and words based on bonuses.

### Game State Management
```javascript
updateTotalScore();
resetGame();
```
Manages scores and resets the game state when needed.

---

## Debugging Tips

- Use the browser console to inspect logs for tile placement and score calculation.
- Look for errors like missing tiles or invalid placements to troubleshoot issues.

