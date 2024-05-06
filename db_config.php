<?php
define('DB_SERVER', 'cmsc508.com');
define('DB_USERNAME', '24SP_jacksonja13');
define('DB_PASSWORD', 'V00962619');
define('DB_DATABASE', '24SP_jacksonja13_pr');

function getDB() {
    $dsn = "mysql:host=" . DB_SERVER . ";dbname=" . DB_DATABASE;
    $pdo = new PDO($dsn, DB_USERNAME, DB_PASSWORD);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $pdo;
}
?>