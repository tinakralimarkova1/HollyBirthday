'use strict';

/**
 * Called on start up to import csv data 
 * @returns a promise that contains a 2D array with the puzzle key
 */
async function importKey() {
    const res = await fetch('/answer-key-plus-labels.csv');
    const text = await res.text();
    return text.trim().split('\n').map(row => row.split(','));
}

/**
 * Render puzzle key into HTML 
 */
async function createPuzzle() {
    const key = await importKey();
    const puzzleHolder = document.getElementById("puzzle-holder");
    for(let i = 0; i < key.length; i++) {
        const newRow = document.createElement("div");
        newRow.classList.add("row");
        for(let j = 0; j < key[0].length-1; j++) {
            // Create new cell
            const newCell = document.createElement("div");
            newCell.classList.add("cell");
            const newText = document.createElement("textarea");
            newText.maxLength = "2";
        
            const letterArr = key[i][j].split(".");
            const letter = letterArr[0];
            newText.name = letter;
            newText.placeholder = ""; /*+ letterArr[0]; // TESTING - REMOVE LATER*/
            newCell.appendChild(newText);
        
            // Black out and disable if no letter is here
            if(letter == '') {
                newText.classList.add("blackout");
                newText.disabled = true;
            } 

            // Add a label if needed 
            if(letterArr.length > 1) {
                // Create and appened label
                const label = document.createElement("div");
                label.classList.add("label");
                label.textContent = letterArr[1];
                newCell.appendChild(label);
            }

            // Append all content to cell and row 
            newRow.appendChild(newCell);
            
            requestAnimationFrame(() => {
                newTet.value = " ";
                newText.focus();
                newText.setSelectionRange(0, 0);
            });
        }
        // Add row to HMTL
        puzzleHolder.appendChild(newRow);
    }
}


/**
 * Meant to be called on start to show key
 * @returns a promise that contains a 1D array with the hints
 */
async function importHints() {
    const res = await fetch('/hints.csv');
    const text = await res.text();
    return text.trim().split('\n'); 
}

/**
 * Render hints into HTML 
 */
async function createHints() {
    const hints = await importHints();
    for(let i = 0; i < hints.length; i++) {
        const hintArr = hints[i].split(".");
        const direction = hintArr[0];
        const num = hintArr[1];
        const hint = hintArr[2];
        
        // Fill text content
        const hintText = document.createElement("p");
        hintText.textContent = num + ". " + hint;
        
        // Append to rendered HTML
        console.log(direction);
        const container = document.getElementById(direction);
        container.appendChild(hintText);
    }
}

function checkAnswers() {
    const puzzleHolder = document.getElementById("puzzle-holder");

    Array.from(puzzleHolder.children).forEach(row => {
        Array.from(row.children).forEach(cell => {
            
            const textarea = cell.querySelector("textarea");
            const userValue = textarea.value.trim().toLowerCase();
            const correctValue = textarea.name.toLowerCase();
            textarea.classList.remove("correct", "incorrect"); // Reset

            if(textarea.name != '') {
                 if (userValue === correctValue) {
                    textarea.classList.add("correct");
                } else {
                    textarea.classList.add("incorrect");
                }
            }
        });
    });
}

function removeClasses() {
    const puzzleHolder = document.getElementById("puzzle-holder");

    Array.from(puzzleHolder.children).forEach(row => {
        Array.from(row.children).forEach(cell => {
            const textarea = cell.querySelector("textarea");    
            textarea.classList.remove("correct", "incorrect"); // Reset
        });
    });
}

createPuzzle(); // Called every time page loads 
createHints(); // Called every time page loads







