let player = "<span class='cross'></span>";
function createPlayer(tile) {
  if (gameOn) {
    let playerX = "<span class='cross'></span>";
    let playerO = "<span class='naught'></span>";
    if (tile.innerHTML === "") {
      tile.innerHTML = player;
      player === playerX ? (player = playerO) : (player = playerX);
    }
  }
}
function findPlayer(inputSquares) {
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      let boardTiles = createArray(inputSquares);
      createPlayer(tile);
      checkWinner(tile, boardTiles);
    });
  });
}
