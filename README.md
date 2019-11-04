# Adonis API application

## Setup

.env configuration

```env
APP_KEY (you can use command adonis key:generate)
DB
SMTP
REDIS
```

run `npm install`.

Run migrations.

```js
adonis migration:run
```

## Runing

API
```js
adonis serve --dev
```

Queue to send email outside requests
```js
adonis kue:listen
```
