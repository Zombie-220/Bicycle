# Описание
Личный проект для тренировки (потом добавлю в портфолио).  
Сделано по макету Веломагазина World Bike (найдено в свободном доступе, ~~но всегда можно договориться по цене~~).  
Делал в свободное время от учёбы, старался изучить все используемые технологии, достаточно глубоко, чтобы понимать как это работает или хотя бы применяется.

---

# Стек разработки
## Frontend
- React
- SCSS
## Backend
- NodeJS
- Express
## База данных
- MongoDB
## Развертывание
- Docker (совсем немного)

---

# Результат
Проект пока не готов полностью, но уже заметны продвижки в использовании React, NodeJS, MongoDB и Docker.  
Так же были изучены некоторые методы шифрования и авторизации, структуры и паттерны написания REST API.

---

# Настройка
## Настройка перед запуском
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

## Настройка перед запуском
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