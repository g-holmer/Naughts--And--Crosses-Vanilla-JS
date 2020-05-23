<?php require_once('./php/header.php'); ?>
    
      <div class="content">
      <h1 class="title">Naughts and Crosses</h1>
        <div class="interface">
        <nav class="nav">
            <ul class="navigation__list">
        <li class="navigation__list__item"><a href="?highscores">Highscores</a></li>
        <li class="navigation__list__item"><a href="index.php">Play Game</a></li>
        </ul>
      </nav>
      <div class="inner-content">
    <?php 
    if(isset($_GET['highscores'])) {
       require_once('./php/inc/highscores.php');
    }else {
    require_once('./php/game.php'); 
    }?>
    </div>
    </div>
</div>
    <script src="js/drawBoard.js"></script>
    <script src="js/createPlayer.js"></script>
    <script src="js/checkWinner.js"></script>
    <script src="js/dragElement.js"></script>
<?php require_once('./php/footer.php'); ?>
