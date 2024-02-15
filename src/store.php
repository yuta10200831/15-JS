<?php 

$title = filter_input(INPUT_POST, 'title');
$text = filter_input(INPUT_POST, 'text');

if ($title != '' && $text != '') {
	$user = 'root';
	$password = 'password';
	$pdo = new PDO('mysql:host=mysql; dbname=blog; charset=utf8', $user, $password);

	$sql = "INSERT INTO `blogs`(`id`, `title`, `content`) VALUES(0, :title, :content)";
	$statement = $pdo->prepare($sql);
	$statement->bindValue(':title', $title, PDO::PARAM_STR);
	$statement->bindValue(':content', $text, PDO::PARAM_STR);
	$statement->execute();
}

header('Location: http://localhost:8080/');
exit();
