# Scrabble Game Implementation

## Overview
This project implements a simplified Scrabble game where players can:
- Drag and drop tiles from a rack onto a Scrabble board.
- Score words based on the placement of tiles and bonus squares.
- Replenish their tile rack after each turn.
- Restart or shuffle the game as needed.

Below is an explanation of the core functions and their implementation.

---

## Core Features

### 1. **Board Initialization**
#### Function: **DOMContentLoaded Event Listener**
- **Purpose**: Sets up a 15x15 Scrabble board with special bonus squares.
- **Key Steps**:
  1. Loops through rows and columns to create a grid.
  2. Identifies special squares (e.g., double-word, triple-letter) based on predefined positions.
  3. Marks the center square with a star.
  4. Stores original text for bonus squares for future resets.

---

### 2. **Tile Bag Setup**
#### Data: **tileBag**
- **Purpose**: Represents the pool of letter tiles, including their distribution and point values.
- **Structure**: Array of objects where each object contains:
  - `letter`: The letter on the tile.
  - `value`: The point value of the tile.
  - `amount`: The number of such tiles in the bag.

#### Function: **createTileBag**
- **Purpose**: Generates a mutable pool of tiles based on the `tileBag`.
- **Key Steps**:
  1. Uses `flatMap` to replicate each tile by its `amount`.

---

### 3. **Rack Management**
#### Function: **generateTileRack**
- **Purpose**: Randomly selects up to 7 tiles from the tile bag to populate the player's rack.
- **Key Steps**:
  1. Flattens the tile bag into an array.
  2. Randomly selects tiles using a loop and updates the bag by splicing.

#### Function: **displayTileRack**
- **Purpose**: Displays tiles on the rack as draggable elements.
- **Key Steps**:
  1. Clears existing tiles from the rack.
  2. Creates draggable `<div>` elements for each tile.
  3. Sets `img` attributes to show the tile letter and value visually.

---

### 4. **Scoring System**
#### Function: **calculateTileScore**
- **Purpose**: Computes the score of a single tile based on its letter and any bonus on the square.
- **Key Steps**:
  1. Finds the tile's point value in the `tileBag`.
  2. Applies multipliers for double/triple letter bonus squares if applicable.

#### Function: **calculateWordScore**
- **Purpose**: Computes the score of all newly placed tiles on the board for a turn.
- **Key Steps**:
  1. Iterates through placed tiles to sum their scores.
  2. Applies word multipliers (double/triple word scores).
  3. Returns the final score for the turn.

---

### 5. **Gameplay Mechanics**
#### Function: **makeBoardDroppable**
- **Purpose**: Enables drag-and-drop functionality for placing tiles on the board.
- **Key Steps**:
  1. Makes board squares droppable.
  2. Validates the placement (e.g., adjacency, center square on the first turn).
  3. Tracks the row/column positions of placed tiles.

#### Function: **submit-turn Event Listener**
- **Purpose**: Processes the end of a turn by scoring placed tiles and replenishing the rack.
- **Key Steps**:
  1. Identifies newly placed tiles.
  2. Calculates and updates the turn score.
  3. Locks placed tiles on the board.
  4. Replenishes the player's rack with new tiles.

#### Function: **replenishRack**
- **Purpose**: Ensures the rack is replenished to 7 tiles after a turn.
- **Key Steps**:
  1. Calculates the number of tiles needed.
  2. Randomly selects tiles from the bag and adds them to the rack.

---

### 6. **Game Reset and Shuffle**
#### Function: **reset-game Event Listener**
- **Purpose**: Resets the game to its initial state.
- **Key Steps**:
  1. Clears the board of all placed tiles.
  2. Restores bonus square labels.
  3. Resets the rack and score.

#### Function: **shuffle-rack Event Listener**
- **Purpose**: Randomly rearranges the tiles in the rack.
- **Key Steps**:
  1. Implements the Fisher-Yates shuffle algorithm.
  2. Re-displays the shuffled tiles in the rack.

---

### 7. **Bonus Features**
- Bonus squares (e.g., double/triple word or letter) are implemented and properly accounted for during scoring.
- Drag-and-drop interactions are validated to ensure proper gameplay (e.g., adjacency rules).

---

## Notes
- The game dynamically adapts to a depleted tile bag.
- Extensive debugging messages are included for testing and validation.
- CSS and HTML files provide the visual layout for the game.

