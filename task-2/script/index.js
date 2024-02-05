document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container");
  const squares = document.querySelectorAll(".square");
  let playerTurn = true;

  squares.forEach((square) => {
    square.addEventListener("click", () => {
      if (
        playerTurn &&
        square.style.backgroundColor !== "red" &&
        square.style.backgroundColor !== "green"
      ) {
        square.style.backgroundColor = "red";
        playerTurn = false;

        if (checkForGameEnd()) {
          setTimeout(() => {
            gameOver();
          }, 300);
          return;
        }

        setTimeout(() => {
          computerMove();
          playerTurn = true;
        }, 500);
      }
    });
  });

  function computerMove() {
    container.style.pointerEvents = "none";

    const availableSquares = Array.from(squares).filter(
      (square) =>
        square.style.backgroundColor !== "red" &&
        square.style.backgroundColor !== "green"
    );

    if (availableSquares.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableSquares.length);
      const computerSquare = availableSquares[randomIndex];
      computerSquare.style.backgroundColor = "green";

      if (checkForGameEnd()) {
        gameOver();
        return;
      }

      setTimeout(() => {
        container.style.pointerEvents = "auto";
      }, 500);
    }
  }

  function checkForGameEnd() {
    const filledSquares = Array.from(squares).filter(
      (square) =>
        square.style.backgroundColor === "red" ||
        square.style.backgroundColor === "green"
    );
    if (filledSquares.length === squares.length) {
      return true;
    }
    return false;
  }

  function gameOver() {
    alert("Game Over!");

    resetGame();
  }

  function resetGame() {
    squares.forEach((square) => {
      square.style.backgroundColor = "#ccc";
    });

    container.style.pointerEvents = "auto";

    playerTurn = true;
  }
});
