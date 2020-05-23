<?php 
require_once('db.php');
?>
<h2 class="highscores__title">Highscores</h2>
<table class="highscores" border="1">
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Wins</th>
            </tr>
<?php 
$stmt = $db->prepare("SELECT * FROM highscores ORDER BY wins DESC"); 
$stmt->execute();
$i = 0;
while($highscores = $stmt->fetch(PDO::FETCH_ASSOC)){
$i += 1;
$id = htmlspecialchars($highscores['id']);
$name = htmlspecialchars($highscores['name']);
$wins = htmlspecialchars($highscores['wins']);
?>
            <tr>
                <td><?php echo $i ?></td>
                <td><?php echo $name ?></td>
                <td class="wins"><?php echo $wins ?></td>
            </tr>
<?php 
}
?>