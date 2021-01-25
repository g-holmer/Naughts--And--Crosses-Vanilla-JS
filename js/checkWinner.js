let scoreX = 0;
let scoreO = 0;
let win;
function addScore(player, pScore1, pScore2) {
  if (player === "X") {
    scoreX += 1;
    pScore1.textContent = scoreX;
    win = true;
  }
  if (player === "O") {
    scoreO += 1;
    pScore2.textContent = scoreO;
    win = true;
  }
}

function alertWinner(checkWin) {
  let checkWinInput = true;
  let winCondition = checkInput(checkWinInput);

  const x = `<span class=\"cross\"></span>,`;
  const o = `<span class=\"naught\"></span>,`;

  let playerXWin = x.repeat(winCondition);
  let playerOWin = o.repeat(winCondition);
  let player = "X";
  playerOWin = playerOWin.substring(0, playerOWin.length - 1);
  playerXWin = playerXWin.substring(0, playerXWin.length - 1);

  if (checkWin.join(",").includes(playerOWin)) {
    player = "O";
  }
  const pScore1 = document.querySelector(".p-1-wins");
  const pScore2 = document.querySelector(".p-2-wins");
  const winBox = document.querySelector("#winBox");

  if (
    checkWin.join(",").includes(playerXWin) ||
    checkWin.join(",").includes(playerOWin)
  ) {
    winBox.style.display = "flex";
    gameOn = false;
    addScore(player, pScore1, pScore2);
    const winBoxOutput = `<header class="winBox-header">
    </header><h2>${player} IS THE WINNER</h2>
    <button class='btn-startagain'>Play again</button>
    <form action="./php/inc/addScores.php" method="POST">
    <input type="hidden" value="${pScore1.textContent}" name="pScore1" />
    <input type="hidden" value="${pScore1.parentElement.firstChild.textContent}" name="pScore1Name" />
    <input type="hidden" value="${pScore2.textContent}" name="pScore2" />
    <input type="hidden" value="${pScore2.parentElement.firstChild.textContent}" name="pScore2Name" />
    <button name="addScores">Finish & save to highscores</button>
    </form>`;
    winBox.innerHTML = winBoxOutput;
    const btnStartAgain = document.querySelector(".btn-startagain");
    btnStartAgain.addEventListener("click", startGame);
    dragElement(document.getElementById("winBox"));
  }
}

function checkWinnerDiagonal(tile, boardTiles) {
  const multiplyTiles = boardTiles.length * boardTiles.length;
  let preDiagonalTilesRight = [];
  let diagonalTilesRight = [];
  let checkWinRight = [];

  let preDiagonalTilesLeft = [];
  let diagonalTilesLeft = [];
  let checkWinLeft = [];
  for (let i = 0; i < multiplyTiles; i++) {
    const tileIncrease = document.getElementById(parseInt(tile.id) + i);
    const tileDecrease = document.getElementById(parseInt(tile.id) - i);
    const rowLength = parseInt(boardTiles.length);
    const getTileAttribute = parseInt(tile.getAttribute("data-vert"));
    if (i % (rowLength + 1) === 0) {
      let vertId;

      if (tileIncrease !== null) {
        vertId = tileIncrease.getAttribute("data-vert");

        if (vertId >= getTileAttribute) {
          preDiagonalTilesRight.push(tileIncrease);
        }
      }
      if (tileDecrease !== null) {
        vertId = tileDecrease.getAttribute("data-vert");
      }
      if (vertId < getTileAttribute) {
        preDiagonalTilesRight.push(tileDecrease);
      }
    }
    if (i % (rowLength - 1) === 0) {
      let vertId;

      if (tileIncrease !== null) {
        vertId = tileIncrease.getAttribute("data-vert");

        if (vertId < getTileAttribute) {
          preDiagonalTilesLeft.push(tileIncrease);
        }
      }
      if (tileDecrease !== null) {
        vertId = tileDecrease.getAttribute("data-vert");
      }
      if (vertId > getTileAttribute) {
        preDiagonalTilesLeft.push(tileDecrease);
      }
    }
  }

  preDiagonalTilesLeft.push(document.getElementById(parseInt(tile.id)));

  for (let i = 0; i < preDiagonalTilesLeft.length; i++) {
    if (preDiagonalTilesLeft[i] !== null)
      diagonalTilesLeft.push(preDiagonalTilesLeft[i]);
  }
  for (let i = 0; i < preDiagonalTilesRight.length; i++) {
    if (preDiagonalTilesRight[i] !== null)
      diagonalTilesRight.push(preDiagonalTilesRight[i]);
  }

  diagonalTilesLeft.sort((a, b) => {
    return a.id - b.id;
  });
  diagonalTilesRight.sort((a, b) => {
    return a.id - b.id;
  });

  for (let i = 0; i < diagonalTilesLeft.length; i++) {
    checkWinLeft.push(diagonalTilesLeft[i].innerHTML);
  }
  for (let i = 0; i < diagonalTilesRight.length; i++) {
    checkWinRight.push(diagonalTilesRight[i].innerHTML);
  }

  alertWinner(checkWinLeft);
  alertWinner(checkWinRight);
}

function checkWinnerVertical(tile, boardTiles) {
  let indChild;
  boardTiles.forEach((parentItem, parentIndex) => {
    parentItem.forEach((childItem, childIndex) => {
      if (tile.id == childItem) indChild = childIndex;
    });
  });
  let checkWin = [];
  for (let i = 0; i < boardTiles.length; i++) {
    checkWin.push(
      document.querySelectorAll(`[data-vert='${indChild}']`)[i].innerHTML
    );
  }
  alertWinner(checkWin);
}

function checkWinnerHorizontal(tile, boardTiles) {
  let parentInd;
  boardTiles.forEach((parentItem, parentIndex) => {
    parentItem.forEach((childItem, childIndex) => {
      if (tile.id == childItem) parentInd = parentIndex;
    });
  });
  let checkWin = [];
  for (let i = 0; i < boardTiles[parentInd].length; i++) {
    checkWin.push(document.getElementById(boardTiles[parentInd][i]).innerHTML);
  }
  alertWinner(checkWin);
}
function checkWinner(tile, boardTiles) {
  checkWinnerHorizontal(tile, boardTiles);
  checkWinnerVertical(tile, boardTiles);
  checkWinnerDiagonal(tile, boardTiles);
}
