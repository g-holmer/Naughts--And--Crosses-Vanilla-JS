let gameOn = false;
function drawBoard(boardTiles) {
  const boardGame = document.querySelector(".board");
  let g = -1;

  for (let i = 0; i < boardTiles.length; i++) {
    for (let j = 0; j < boardTiles.length; j++) {
      g += 1;
      let tile = `<div data-rows="${i}" data-vert="${j}" id="${g}" class="tile"></div>`;

      boardGame.innerHTML += tile;
    }
  }
}

function swapInterface(boardTiles) {
  let startedSession = true;

  const startSection = document.querySelector(".start-game");
  const boardGame = document.querySelector(".board");
  boardGame.innerHTML = '<div id="winBox"></div>';

  const nav = document.querySelector(".navigation__list");
  let mediaWidth = window.matchMedia("(min-width: 700px)");
  if (startedSession === false) {
    startSection.style.display = "none";
    boardGame.style.display = "none";
  } else {
    startSection.style.display = "none";
    boardGame.style.display = "grid";
    if (mediaWidth.matches) {
      boardGame.style.gridTemplateColumns = `repeat(${boardTiles.length}, minmax(50px, 1fr))`;
    } else {
      boardGame.style.gridTemplateColumns = `repeat(${boardTiles.length}, minmax(30px, 1fr))`;
      if (boardTiles.length <= 6) {
        boardGame.style.gridAutoRows = `minmax(50px, 1fr)`;
      }
    }
    nav.style.display = "none";
    startedSession = true;
  }
}

function checkInput(checkWin) {
  let errorMsg = document.querySelector(".error-msg");
  let inputSquares = document.getElementsByName("squares");
  let winCond = document.getElementsByName("winCondition");
  let playerX = document.getElementsByName("playerX");
  let playerO = document.getElementsByName("playerO");

  if (parseInt(inputSquares[0].value) < parseInt(winCond[0].value)) {
    errorMsg.textContent = "Size can't be lower than the in row condition.";
    errorMsg.style.display = "block";
    return;
  }
  if (
    winCond[0].value < 3 ||
    inputSquares[0].value < 3 ||
    winCond[0].value > 20 ||
    inputSquares[0].value > 20 ||
    playerX[0].value === "" ||
    playerO[0].value === "" ||
    inputSquares[0].value === "" ||
    winCond[0].value === ""
  ) {
    errorMsg.style.display = "block";
    return;
  }
  const winCondition = document.getElementsByName("winCondition");

  if (checkWin) {
    return winCondition[0].value;
  } else {
    return inputSquares[0].value;
  }
}
function createArray(inputSquares) {
  let boardTiles = new Array(parseInt(inputSquares));
  for (let i = 0; i < boardTiles.length; i++) {
    boardTiles[i] = new Array(2);
  }

  let h = 0;

  for (let i = 0; i < parseInt(inputSquares); i++) {
    for (let j = 0; j < parseInt(inputSquares); j++) {
      boardTiles[i][j] = h++;
    }
  }

  return boardTiles;
}

function drawScoreTable() {
  const player1 = document.getElementsByName("playerX");
  const player2 = document.getElementsByName("playerO");
  const scoreTable = document.querySelector(".scoreTable");

  scoreTable.innerHTML = `<div class="player1">
                            <div class="cross-icon">
                            <img class="player1-src" src="./img/cross.svg" alt="" srcset="">
                            </div>${player1[0].value}<br>
                                <p class="p-1-wins">${scoreX}</p>
                                </div>

                                <div class="player2">
                                <div class="naught-icon">
                                <img class="player2-src" src="./img/naught.svg" alt="" srcset="">
                                </div>${player2[0].value}<br>
                                <p class="p-2-wins">${scoreO}</p>
                                </div>`;
}
function startGame() {
  gameOn = true;
  let inputSquares = checkInput();
  let boardTiles = createArray(inputSquares);

  drawScoreTable();
  swapInterface(boardTiles);
  drawBoard(boardTiles);
  findPlayer(inputSquares);
}

function triggerStart() {
  const btnStart = document.querySelector(".btn-start");
  if (btnStart === null) return;
  btnStart.addEventListener("click", startGame);
}
triggerStart();
