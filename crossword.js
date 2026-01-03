'use strict';

/**
 * Meant to be called on start to show key
 * @returns a promise that contains a 2D array with the puzzle key
 */
async function makeKey() {
    const res = await fetch('/answer-key-plus-labels.csv');
    const text = await res.text();
    return text.trim().split('\n').map(row => row.split(','));
}

/**
 * Render puzzle key into HTML 
 */
async function createPuzzle() {
    const key = await makeKey();
    console.log(key);
    const puzzleHolder = document.getElementById("puzzle-holder");
    for(let i = 0; i < key.length; i++) {
        const newRow = document.createElement("div");
        newRow.classList.add("row");
        for(let j = 0; j < key[0].length; j++) {
            const letter = key[i][j];

            // Create new cell
            const newCell = document.createElement("div");
            newCell.classList.add("cell");
            const newText = document.createElement("textarea");
        
            const letterArr = letter.split(".");
            newText.id = letterArr[0];
            console.log(letterArr);
            newText.placeholder = " " + letterArr[0]; // TESTING - REMOVE LATER
            newCell.appendChild(newText);

            if(letterArr.length > 1) {
                // Create and appened label
                const label = document.createElement("div");
                label.classList.add("label");
                label.textContent = letterArr[1];
                newCell.appendChild(label);
            }

            // Append all content to cell and row 
            newRow.appendChild(newCell);
        }
        // Add row to HMTL
        puzzleHolder.appendChild(newRow);
    }
}

createPuzzle(); // Called every time page starts 









