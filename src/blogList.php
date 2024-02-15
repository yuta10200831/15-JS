<?php
$user = 'root';
$password = 'password';
$pdo = new PDO('mysql:host=mysql; dbname=blog; charset=utf8', $user, $password);

$sql = 'select * from blogs';
$statement = $pdo->prepare($sql);
$statement->execute();
$blogs = $statement->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($blogs);
