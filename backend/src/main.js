import express from 'express';
import cors from 'cors';
import { createServer } from 'https';

import { CERTIFICATE, PORT, PRIVATE_KEY } from './config/env.js';
import { logger } from './config/logger/logger.js';
import { UsersRouter } from './routes/users.js';
import { BicyclesRouter } from './routes/bicycles.js';
import { EquipmentsRouter } from './routes/equipments.js';

export const APP = express();
APP.use(
    cors({ origin: ['http://localhost:15924', 'https://localhost:15924'], methods: 'POST, GET, DELETE, PATCH'}),
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
    const httpsServer = createServer({ key: PRIVATE_KEY, cert: CERTIFICATE, passphrase: 'pass phrase' }, APP);

    httpsServer.listen(PORT, () => { logger.info(`Server is running via https://localhost:${PORT}`); })
} else {
    APP.listen(PORT, () => { logger.info(`Server is running via http://localhost:${PORT}`); });
}