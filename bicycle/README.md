# Настройка перед запуском
- создайте SSL сертификат и ключ
```schell
openssl genpkey -algorithm RSA -out out/key.key
openssl req -new -key out/key.key -out out/req.csr
openssl x509 -req -days 365 -in out/req.csr -signkey out/key.key -out out/cert.crt
```

- Создайте .env файл и укажите в нем следующее:
    - PORT - для смены порта
    - HTTPS - для https протокола
    - SSL_CRT_FILE - путь до сертификата (.crt) https протокола
    - SSL_KEY_FILE - путь до SSL ключа (.key)
    - REACT_APP_AES_KEY - ключ для шифрования (должен совпадать с backend частью)
    - REACT_APP_BACKEND_URL - ссылка на backend API

- Запустите проект предварительно установив все зависимости
```schell
npm i
npm start
```