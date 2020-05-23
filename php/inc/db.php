<?php
$db_server = 'localhost';
$db_database = 'naughtsandcrosses';
$db_username = 'root';
$db_password = '';

try{   
$db = new PDO("mysql:host=$db_server;dbname=$db_database;charset=utf8", $db_username, $db_password);$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// echo 'Connected successfully';
}
catch(PDOException $e){
echo $e-> getMessage();
}
?>