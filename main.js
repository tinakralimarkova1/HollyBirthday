let gameStarted = false;

window.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");
  const startButton = document.getElementById("startButton");

  startButton.addEventListener("click", () => {
    overlay.style.display = "none";
    gameStarted = true;
  
    // clear landing confetti 
    confetti = [];
  });
  
});

//function p5 checks
function isGameStarted() {
  return gameStarted;
}
