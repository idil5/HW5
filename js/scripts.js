document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const boardSize = 15;

    // Define bonus squares and their labels
    const bonusSquares = {
        "bonus-triple-word": {
            positions: [[0, 0], [0, 7], [0, 14], [7, 0], [7, 14], [14, 0], [14, 7], [14, 14]],
            label: "TRIPLE WORD SCORE"
        },
        "bonus-double-word": {
            positions: [
                [1, 1], [2, 2], [3, 3], [4, 4], [10, 10], [11, 11], [12, 12], [13, 13],
                [1, 13], [2, 12], [3, 11], [4, 10], [10, 4], [11, 3], [12, 2], [13, 1]
            ],
            label: "DOUBLE WORD SCORE"
        },
        "bonus-triple-letter": {
            positions: [[1, 5], [1, 9], [5, 1], [5, 5], [5, 9], [5, 13], [9, 1], [9, 5], [9, 9], [9, 13], [13, 5], [13, 9]],
            label: "TRIPLE LETTER SCORE"
        },
        "bonus-double-letter": {
            positions: [[0, 3], [0, 11], [2, 6], [2, 8], [3, 0], [3, 7], [3, 14], [6, 2], [6, 6], [6, 8], [6, 12], [7, 3], [7, 11], [8, 2], [8, 6], [8, 8], [8, 12], [11, 0], [11, 7], [11, 14], [12, 6], [12, 8], [14, 3], [14, 11]],
            label: "DOUBLE LETTER SCORE"
        }
    };

    // Generate the board grid
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const square = document.createElement("div");
            square.classList.add("board-square");

            // Assign row and col attributes
            square.setAttribute("data-row", row);
            square.setAttribute("data-col", col);

            // Check for bonus squares
            let isBonus = false;
            for (const [bonusClass, { positions, label }] of Object.entries(bonusSquares)) {
                if (positions.some(([x, y]) => x === row && y === col)) {
                    square.classList.add(bonusClass);
                    square.textContent = label;
                    square.setAttribute("data-original-text", label); // Store original bonus text
                    isBonus = true;
                    break;
                }
            }

            // Add center star for the middle square
            if (!isBonus && row === 7 && col === 7) {
                square.classList.add("bonus-center");
                square.textContent = "★";
                square.setAttribute("data-original-text", "★"); // Store original text
            }

            // Append square to the board
            board.appendChild(square);
        }
    }
});


//Tile data (from pieces.json)
const tileBag = [
    { letter: 'A', value: 1, amount: 9 },
    { letter: 'B', value: 3, amount: 2 },
    { letter: 'C', value: 3, amount: 2 },
    { letter: 'D', value: 2, amount: 4 },
    { letter: 'E', value: 1, amount: 12 },
    { letter: 'F', value: 4, amount: 2 },
    { letter: 'G', value: 2, amount: 3 },
    { letter: 'H', value: 4, amount: 2 },
    { letter: 'I', value: 1, amount: 9 },
    { letter: 'J', value: 8, amount: 1 },
    { letter: 'K', value: 5, amount: 1 },
    { letter: 'L', value: 1, amount: 4 },
    { letter: 'M', value: 3, amount: 2 },
    { letter: 'N', value: 1, amount: 6 },
    { letter: 'O', value: 1, amount: 8 },
    { letter: 'P', value: 3, amount: 2 },
    { letter: 'Q', value: 10, amount: 1 },
    { letter: 'R', value: 1, amount: 6 },
    { letter: 'S', value: 1, amount: 4 },
    { letter: 'T', value: 1, amount: 6 },
    { letter: 'U', value: 1, amount: 4 },
    { letter: 'V', value: 4, amount: 2 },
    { letter: 'W', value: 4, amount: 2 },
    { letter: 'X', value: 8, amount: 1 },
    { letter: 'Y', value: 4, amount: 2 },
    { letter: 'Z', value: 10, amount: 1 }
];

function calculateTileScore(letter, square) {
    const normalizedLetter = letter.toUpperCase(); // Normalize to uppercase
    const tileData = tileBag.find(tile => tile.letter === normalizedLetter); // Use original tileBag

    console.log(`Calculating score for letter: ${normalizedLetter}`); // Debug
    console.log("Current tileBag state:", tileBag); // Debug

    if (!tileData) {
        console.error(`Error: Tile data not found for letter: ${normalizedLetter}`); // Debug
        return 0; // Return 0 if tile not found
    }

    let score = tileData.value;
    const bonus = square.classList;
    if (bonus.contains("bonus-double-letter")) {
        score *= 2;
        console.log("Applying double letter bonus"); // Debug
    } else if (bonus.contains("bonus-triple-letter")) {
        score *= 3;
        console.log("Applying triple letter bonus"); // Debug
    }

    console.log(`Tile Score for ${normalizedLetter}: ${score}`); // Debug
    return score;
}


// Function to update the score
function updateScore(newScore) {
    document.getElementById('score').textContent = newScore;
}


// Step 2: Generate a random tile rack
function generateTileRack(tileBag) {
    const rack = [];
    const fullTileBag = tileBag.flatMap(piece =>
        Array(piece.amount).fill({ letter: piece.letter, value: piece.value })
    );

    for (let i = 0; i < 7; i++) {
        const randomIndex = Math.floor(Math.random() * fullTileBag.length);
        rack.push(fullTileBag.splice(randomIndex, 1)[0]); // Remove from the bag
    }
    return rack;
}

function displayTileRack(tiles) {
    const tileRackDiv = document.getElementById('tiles');
    tileRackDiv.innerHTML = ''; // Clear any existing tiles

    tiles.forEach(tile => {
        const tileDiv = document.createElement('div');
        tileDiv.className = 'tile';

        // Use the image for the tile
        const tileImg = document.createElement('img');
        tileImg.src = `images/Scrabble_Tile_${tile.letter}.jpg`;
        tileImg.alt = `${tile.letter} (${tile.value})`;
        tileImg.style.width = '50px';
        tileImg.style.height = '50px';

        // Append the image to the tile
        tileDiv.appendChild(tileImg);

        // Make the tile draggable
        $(tileDiv).draggable({
            revert: 'invalid', // Snap back to rack if not dropped on valid space
            containment: 'body', // Restrict dragging within the page
            stack: '.tile' // Ensure dragged tile is on top
        });

        tileRackDiv.appendChild(tileDiv);
    });
}



// Initialize the game
function initializeGame() {
    const fullTileBag = createTileBag(); // Create the full tile bag
    const tileRack = generateTileRack(fullTileBag); // Create a tile rack
    displayTileRack(tileRack); // Display the tiles on the page
}

initializeGame(); // Start the game

$(document).ready(function () {
    initializeBoard();
    makeBoardDroppable();
});

function initializeBoard() {
    $(".board-square").each(function () {
        const $square = $(this);

        // Save the current text in each square
        const originalText = $square.text();
        $square.data("originalText", originalText); // Store the original bonus text
    });
}

let firstMove = true; // To track the first move
const centerSquare = { row: 7, col: 7 }; // The star's position
const placedTiles = []; // Array to store positions of placed tiles

function makeBoardDroppable() {
    $(".board-square").droppable({
        accept: ".tile",
        drop: function (event, ui) {
            const $square = $(this);
            const droppedTile = ui.draggable;

            // Get square position from data attributes
            const squareRow = parseInt($square.data("row"), 10);
            const squareCol = parseInt($square.data("col"), 10);

            // Check if move is valid
            if (isValidMove(squareRow, squareCol)) {
                // Place the tile on the board
                $square.text('');
                $square.append(droppedTile);
                droppedTile.css({ top: 0, left: 0 });
                $square.addClass("occupied");

                // Track the placed tile's position
                placedTiles.push({ row: squareRow, col: squareCol });
                firstMove = false; // First move is done
            } else {
                // Invalid move: return tile to its original position
                $(droppedTile).draggable("option", "revert", true);
            }
        }
    });
}

// Validation function
function isValidMove(row, col) {
    if (firstMove) {
        // First move must be on the center star
        return row === centerSquare.row && col === centerSquare.col;
    }

    // Check if tile is adjacent to an existing placed tile
    const isAdjacent = placedTiles.some(tile =>
        (tile.row === row && Math.abs(tile.col - col) === 1) || // Left/Right
        (tile.col === col && Math.abs(tile.row - row) === 1)    // Above/Below
    );

    return isAdjacent; // Valid if adjacent
}



// Create a full tile bag based on the above distribution
function createTileBag() {
    return tileBag.flatMap(tile =>
        Array(tile.amount).fill({ letter: tile.letter, value: tile.value })
    );
}




function makeSwapBoxDroppable() {
    $("#swap-box").droppable({
        accept: ".tile", // Accept only tiles
        drop: function (event, ui) {
            const swappedTile = ui.draggable; // The tile being dropped

            // Remove the tile from the rack
            swappedTile.remove();

            // Generate a new random tile to replace it
            const fullTileBag = createTileBag(); // Recreate the full tile bag
            const randomIndex = Math.floor(Math.random() * fullTileBag.length);
            const newTileData = fullTileBag[randomIndex];

            // Create a new tile
            const newTileDiv = document.createElement("div");
            newTileDiv.className = "tile";

            const newTileImg = document.createElement("img");
            newTileImg.src = `images/Scrabble_Tile_${newTileData.letter}.jpg`;
            newTileImg.alt = `${newTileData.letter} (${newTileData.value})`;
            newTileImg.style.width = '50px';
            newTileImg.style.height = '50px';

            newTileDiv.appendChild(newTileImg);

            // Make the new tile draggable
            $(newTileDiv).draggable({
                revert: "invalid",
                containment: "body",
                stack: ".tile"
            });

            // Add the new tile to the rack
            $("#tiles").append(newTileDiv);
        }
    });
}

// Call the function to make the swap box droppable
document.addEventListener("DOMContentLoaded", () => {
    makeSwapBoxDroppable();
});



document.addEventListener("DOMContentLoaded", () => {
    initializeBoard(); // Store original bonus text
    makeBoardDroppable(); // Set up droppable functionality
});


let submittedTiles = []; // To track tiles that have already been scored


document.getElementById("submit-turn").addEventListener("click", () => {
    const newlyPlacedTiles = []; // Track newly placed tiles for this turn

    // Collect all newly placed tiles
    $(".board-square").each(function () {
        const $square = $(this);
        const tile = $square.find(".tile img"); // Find the tile image
        if (tile.length > 0 && !submittedTiles.includes(tile[0])) {
            const letter = tile.attr("alt")[0]; // Get the letter from the tile
            newlyPlacedTiles.push({ letter, square: this }); // Store the letter and its square
            submittedTiles.push(tile[0]); // Add tile to submitted tiles
        }
    });

    // Debugging: Log the state of newly placed tiles
    console.log("Newly placed tiles:", newlyPlacedTiles);

    if (newlyPlacedTiles.length === 0) {
        alert("No new tiles placed! Please place tiles on the board to submit your turn.");
        return;
    }

    // Calculate the score for the newly placed tiles
    const turnScore = calculateWordScore(newlyPlacedTiles);
    console.log(`Turn Score: ${turnScore}`); // Debug: Log the score for the current turn

    totalScore += turnScore; // Add this turn's score to the total score
    console.log(`Updated Total Score after turn: ${totalScore}`); // Debug: Log the updated total score

    // Update the score display
    updateTotalScore();

    // Lock newly placed tiles visually and prevent dragging
    newlyPlacedTiles.forEach(({ square }) => {
        const $square = $(square);
        $square.addClass("locked"); // Add locked class
        $square.find(".tile").draggable("disable"); // Disable dragging for locked tiles
        console.log(`Tile locked at position [${$square.data("row")}, ${$square.data("col")}]`);
    });

    // Add newly placed tiles to `submittedTiles`
    newlyPlacedTiles.forEach(({ square }) => {
        const tile = $(square).find(".tile img")[0];
        submittedTiles.push(tile); // Track this tile as submitted
    });

    console.log("All submitted tiles after this turn:", submittedTiles); // Debug: Log all submitted tiles

    // Replenish the rack with new tiles
    replenishRack();

    alert(`Turn submitted! You scored ${turnScore} points. Total score: ${totalScore}`);
});

function calculateWordScore(placedTiles) {
    let wordScore = 0;
    let wordMultiplier = 1;

    placedTiles.forEach(({ letter, square }) => {
        let tileScore = calculateTileScore(letter, square);
        console.log(`Letter: ${letter}, Tile Score: ${tileScore}`); // Debug: Log each tile's score

        // Check for word bonuses
        const bonus = square.classList;
        if (bonus.contains("bonus-double-word")) {
            wordMultiplier *= 2;
            console.log("Applying double word bonus"); // Debug: Log word bonus application
        } else if (bonus.contains("bonus-triple-word")) {
            wordMultiplier *= 3;
            console.log("Applying triple word bonus"); // Debug: Log word bonus application
        }

        wordScore += tileScore;
    });

    console.log(`Word Score (pre-multiplier): ${wordScore}, Multiplier: ${wordMultiplier}`); // Debug: Log word score before multiplier
    const finalScore = wordScore * wordMultiplier;
    console.log(`Final Word Score: ${finalScore}`); // Debug: Log final word score
    return finalScore; // Final word score
}

let totalScore = 0; // Global total score

function updateTotalScore() {
    document.getElementById("score").textContent = totalScore;
    console.log(`Updated Total Score: ${totalScore}`); // Debug log
}

$(".board-square").droppable({
    accept: ".tile",
    drop: function (event, ui) {
        const $square = $(this);
        const droppedTile = ui.draggable;
        const letter = droppedTile.find("img").attr("alt")[0]; // Extract letter from image alt

        // Prevent placing tile on an occupied square
        if ($square.hasClass("occupied")) {
            $(droppedTile).draggable("option", "revert", true);
            return;
        }

        // Clear the square text and add the tile
        $square.text("");
        $square.append(droppedTile);
        droppedTile.css({ top: 0, left: 0 });
        $square.addClass("occupied");

        // Calculate and add the tile score
        const tileScore = calculateTileScore(letter, this);
        totalScore += tileScore;

        updateTotalScore(); // Update the displayed score
    }
});

// Initialize a mutable copy of tileBag for the game
let gameTileBag = tileBag.flatMap(tile =>
    Array(tile.amount).fill({ letter: tile.letter, value: tile.value })
);

function replenishRack() {
    const tileRackDiv = $("#tiles"); // The tile rack container

    // Ensure the rack only replenishes missing tiles up to 7
    const currentRackTiles = tileRackDiv.children().length; // Check the current rack size
    const tilesNeeded = 7 - currentRackTiles; // Number of tiles needed to fill the rack

    // Debugging: Check the current state of the rack and tiles needed
    console.log(`Current tiles in rack: ${currentRackTiles}, Tiles needed: ${tilesNeeded}`);
    console.log("GameTileBag before replenishing:", gameTileBag);

    // Check if there are tiles left in the bag
    if (gameTileBag.length === 0) {
        alert("No more tiles left in the bag!");
        console.log("Game tile bag is empty! No tiles can be added.");
        return;
    }

    // Generate new tiles up to the number needed
    for (let i = 0; i < tilesNeeded; i++) {
        if (gameTileBag.length === 0) {
            alert("No more tiles left in the bag!");
            console.log("Game tile bag is empty during replenishing.");
            break;
        }

        // Select a random tile from the game tile bag
        const randomIndex = Math.floor(Math.random() * gameTileBag.length);
        const newTileData = gameTileBag.splice(randomIndex, 1)[0]; // Remove tile from bag

        console.log(`Generated tile: ${newTileData.letter} (${newTileData.value})`);

        // Create a new tile element
        const newTileDiv = $("<div>").addClass("tile");
        const newTileImg = $("<img>")
            .attr("src", `images/Scrabble_Tile_${newTileData.letter}.jpg`)
            .attr("alt", `${newTileData.letter} (${newTileData.value})`)
            .css({ width: "50px", height: "50px" });

        // Append the image to the tile div
        newTileDiv.append(newTileImg);

        // Make the new tile draggable
        newTileDiv.draggable({
            revert: "invalid", // Snap back if not dropped on a valid space
            containment: "body", // Restrict dragging within the body
            stack: ".tile" // Makes sures dragged tile is on top
        });

        // Add the new tile to the tile rack
        tileRackDiv.append(newTileDiv);
    }

    // Debugging: Check the final state of the rack after replenishing
    console.log("Rack replenished. Current tiles in rack:", tileRackDiv.children().length);
    console.log("GameTileBag after replenishing:", gameTileBag);
}






// Reset Game
document.getElementById('reset-game').addEventListener('click', () => {
    // Remove all tiles from the board
    const tiles = document.querySelectorAll('.board-square .tile');
    tiles.forEach(tile => tile.remove()); // Remove tile elements only

    // Remove 'occupied' class from squares but keep their original text
    const boardSquares = document.querySelectorAll('.board-square');
    boardSquares.forEach(square => {
        square.classList.remove('occupied');

        // Restore the original text if it was a bonus square or the center
        const originalText = square.getAttribute('data-original-text');
        if (originalText) {
            square.textContent = originalText;
        }
    });

    // Reset the game state
    initializeGame(); // Reinitialize the tile rack
    updateScore(0); // Reset the score to 0
});

// Shuffle the Tile Rack
document.getElementById('shuffle-rack').addEventListener('click', () => {
    const tilesDiv = document.getElementById('tiles');
    const tiles = Array.from(tilesDiv.children); // Get all tile elements in the rack

    // Shuffle the tiles array using FisherYates Shuffle algorithm
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }

    // Clear the rack and append tiles back in shuffled order
    tilesDiv.innerHTML = '';
    tiles.forEach(tile => tilesDiv.appendChild(tile));
});


