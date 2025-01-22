# Настройка перед запуском
- создайте SSL сертификат и ключ
```schell
openssl genpkey -algorithm RSA -out out/key.key
openssl req -new -key out/key.key -out out/req.csr
openssl x509 -req -days 365 -in out/req.csr -signkey out/key.key -out out/cert.crt
```

- Создайте .env файл и укажите в нем следующее:
    - PORT - порт (как ни странно)
    - FRONT_PORT - порт frontend
    - DATABASE_PORT - порт для БД
    - DATABASE_ROOT - админ БД
    - DATABASE_PASS - пароль админа БД
    - AES_KEY - ключ шифрования (должен совпадать с frontend)
    - TOKEN_KEY - ключ токена

- Запустите проект предварительно установив все зависимости
```schell
npm i
node .\src\main.js
```
