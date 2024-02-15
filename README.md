# 環境構築

ステップ１

```
git clone git@github.com:tech-quest/blog_modal.git
```

ステップ２

```
docker-compose up
```

docker環境に変更があった時

```
docker-compose up --build
```

# ページ紹介

php

[localhost:8080](http://localhost:8080)

PHPMyAdmin

[localhost:3306](http://localhost:3306)

# 設定を変更したい

```
localhost:8080をhtmlが表示されるようにしたい -> nginx/default.conf 4行目を index index.htmlにする。
```

# DB作成

```
CREATE DATABASE blog;

CREATE TABLE blogs ( id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, title varchar(255) NOT NULL, content text NOT NULL, created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP );
```

