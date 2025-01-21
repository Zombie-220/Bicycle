import express from 'express';
import cors from 'cors';
import { createServer } from 'https';

import { CERTIFICATE, PORT, PRIVATE_KEY, FRON_PORT } from './config/env.js';
import { logger } from './config/logger/logger.js';
import { UsersRouter } from './routes/users.js';
import { BicyclesRouter } from './routes/bicycles.js';
import { EquipmentsRouter } from './routes/equipments.js';

export const APP = express();
APP.use(
    cors({ origin: [`http://localhost:${FRON_PORT}`, `https://localhost:${FRON_PORT}`], methods: 'POST, GET, DELETE, PATCH'}),
    express.json()
);

APP.use('/users', UsersRouter);
APP.use('/bicycles', BicyclesRouter);
APP.use('/equipments', EquipmentsRouter);

APP.use((req, res) => {
    res.status(404).send('Resource not found >_<');
    logger.warn(`Wrong query: ${req.method} ${req.baseUrl}${req.url}`);
});

if (PRIVATE_KEY && CERTIFICATE) {
    const httpsServer = createServer({ key: PRIVATE_KEY, cert: CERTIFICATE }, APP);

    httpsServer.listen(PORT, () => { logger.info(`Server is running via https://localhost:${PORT}`); })
} else {
    APP.listen(PORT, () => { logger.info(`Server is running via http://localhost:${PORT}`); });
}