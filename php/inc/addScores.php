<?php
require_once('db.php');
if($_SERVER['REQUEST_METHOD'] === 'POST'):
if(isset($_POST['addScores'])) {
        $namePlayer1 = htmlspecialchars($_POST['pScore1Name']);
        $namePlayer1Score = htmlspecialchars($_POST['pScore1']);
        $namePlayer2 = htmlspecialchars($_POST['pScore2Name']);
        $namePlayer2Score = htmlspecialchars($_POST['pScore2']);
        $sql = "INSERT INTO highscores (name, wins)
        VALUES (   :name, :wins)";
        $stmt = $db->prepare($sql);
        //skicka sql satsen till databas servern
        $stmt->execute([
            ':name' => $namePlayer1,
            ':wins' => $namePlayer1Score
        ]);
        $stmt->execute([
            ':name' => $namePlayer2,
            ':wins' => $namePlayer2Score
        ]);
        header('Location: ../../index.php?highscores');
}
endif;
?>