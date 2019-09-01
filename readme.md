# DevSquad e-commerce

## Installation
```
$ composer install
$ yarn
$ cp .env.example .env
```

In .env set `APP_URL`, `DATABASE` and `MAIL_DRIVER`

```
$ php artisan key:generate
$ php artisan storage:link
$ php artisan jwt:secret
$ php artisan migrate --seed
$ yarn dev
```

CSV file for importing: https://gist.github.com/brunohccz/88b4515362c0bd4014911e61cbfdd0a9
