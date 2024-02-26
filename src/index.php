<?php
$user = 'root';
$password = 'password';
$dsn = 'mysql:host=mysql; dbname=blog; charset=utf8';

$pdo = new PDO($dsn, $user, $password);
$sql = 'SELECT * FROM blogs';
$statement = $pdo->query($sql);
$blogs = $statement->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="ja">

<head>
 <meta charset="UTF-8">
 <meta http-equiv="X-UA-Compatible" content="IE=edge">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>ブログアプリ</title>
 <script src="./main.js" defer></script>
 <link rel="stylesheet" href="./style.css">
</head>

<body>
 <header class="header">
  <ul class="flex_header">
   <li><a href="#" class="new_blog">記事を作成</a></li>
  </ul>
 </header>
 <h1>ブログアプリ</h1>
 <div class="form_parent">
  <form class="form none_form" method="post">
   <input type="hidden" name="id" value="">
   <p><span>ブログタイトル</span></p>
   <p><input class="contents" type="text" name="title"></p>
   <p><span>ブログ本文</span></p>
   <p><textarea class="contents content" name="text"></textarea></p>
   <button type="submit" class="addBlog">投稿</button>
   <button type="button" class="return">戻る</button>
  </form>
  <div class="article_list main">
   <h2>記事一覧</h2>
   <div class="blog_list">
    <?php foreach ($blogs as $blog): ?>
    <div class='blog_content'>
     <p class='mb-0 font-weight'>タイトル: <?php echo htmlspecialchars($blog['title'], ENT_QUOTES, 'UTF-8'); ?></p>
     <p class='mb-0 font-weight'>内容:</p>
     <p class='mt-0'><?php echo nl2br(htmlspecialchars($blog['content'], ENT_QUOTES, 'UTF-8')); ?></p>
     <button class='edit_link' data-id='<?php echo $blog['id']; ?>'>編集</button>
    </div>
    <?php endforeach; ?>
   </div>
  </div>
 </div>
 <script src="./main.js"></script>
</body>

</html>