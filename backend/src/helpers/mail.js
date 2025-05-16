import nodemailer from 'nodemailer';
import path from 'path';

import { Logger } from '../config/logger/logger.js';
import { __dirname } from './__dirname.js';
import { parseToBase64 } from './base64.js';
import { Encrypt } from './encryption.js';
import { SMTP_ADDRESS, SMTP_PORT, EMAIL, EMAIL_PASS, FRON_PORT } from '../config/env.js';

const logo64 = parseToBase64(path.join(__dirname, '/src/helpers/assets/logo.png'));
const bebas64 = parseToBase64(path.join(__dirname, '/src/helpers/assets/bebas.ttf'));
const inter64 = parseToBase64(path.join(__dirname, '/src/helpers/assets/inter.ttf'));

const transporter = nodemailer.createTransport({
    host: SMTP_ADDRESS,
    port: SMTP_PORT,
    secure: false,
    auth: { user: EMAIL, pass: EMAIL_PASS },
    tls: { rejectUnauthorized: false }
});

/**
 * @param {string} to
 * @param {string} token
 * 
 * @returns {void}
*/
export const SendRecoverCode = (to, token) => {
    transporter.sendMail({
        from: EMAIL,
        to: to,
        subject: 'Восстановление пароля',
        text: `https://localhost:${FRON_PORT}/auth/recover?email=${Encrypt(to)}&token=${token}`,
        html: `
            <!DOCTYPE html>
            <html lang="ru">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Recover Password</title>
                <style>
                    @font-face { font-family: 'bebas'; src: url('data:font/ttf;base64,${bebas64}') format('truetype'); }
                    @font-face { font-family: 'inter'; src: url('data:font/ttf;base64,${inter64}') format('truetype'); }
                    h1, h2 { font-family: 'bebas'; }
                    p, a { font-family: 'inter'; transition: 200ms; }
                    a:hover { opacity: 66% }
                    a:active { opacity: 33% }
                    .header { height: 60px; display: flex; align-items: center; justify-content: space-between; background-color: #101010; padding: 10px; }
                    .header-text { color: #FFF; margin: 0px; text-align: right; }
                    .header-img { height: 100%; }
                    .button { color: #FFF; background-color: #F57520; padding: 10px 20px; box-sizing: border-box; border-radius: 10px; display: block; width: 160px; text-align: center; text-decoration: none; }
                    .main-h1 { margin: 0px 0px 5px 0px; }
                    .main-text1 { margin: 2px 0px 2px 0px; }
                    .main-h2 { margin: 16px 0px 5px 0px; }
                    .main-text2 { margin: 2px 0px 2px 0px; }
                    .main-text2 span { color: #000; text-decoration: underline; }
                </style>
            </head>
            <body>
                <div>
                    <header class='header'>
                        <img class='header-img' src="data:image/png;base64,${logo64}" alt="logo"/>
                        <p class='header-text'>World Bike<br />Восстановление пароля</p>
                    </header>
                    <main class="main">
                        <h1 class="main-h1">Восстановление пароля</h1>
                        <p class="main-text1">Для вашего аккаунта был запрошен сброс пароляЕсли это были Вы, нажмите на кнопку ниже.</p>
                        <a href='https://localhost:${FRON_PORT}/auth/recover?email=${Encrypt(to)}&token=${token}' class='button'>Нажми меня</a>
                        <h2 class="main-h2">Я ничего не запрашивал!</h2>
                        <p class="main-text2">Если это были не Вы не предпринимайте никаких действий или обратитесь в службу поддержки.</p>
                        <h2 class="main-h2">Кнопка не работает...</h2>
                        <p class="main-text2">Если кнопка не работает, то можете перейти по этой ссылке: <span>https://localhost:${FRON_PORT}/auth/recover?email=${Encrypt(to)}&token=${token}</span> <br/> или скопировать её в адресную строку браузера.</p>
                    </main>
                </div>
            </body>
            </html>
        `
    }, (err, info) => {
        if (err) { Logger.crit(`Sending e-mail error: ${err}`); }
        else { Logger.info(`E-mail send: ${info.messageId}`); }
    });
}