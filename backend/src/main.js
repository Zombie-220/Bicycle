import express from 'express';
import cors from 'cors';
import { createServer } from 'https';

import { CERTIFICATE, PORT, PRIVATE_KEY, FRON_PORT } from './config/env.js';
import { Logger } from './config/logger/logger.js';
import { UsersRouter } from './routes/users.js';
import { BicyclesRouter } from './routes/bicycles.js';
import { EquipmentsRouter } from './routes/equipments.js';
import { PartsRouter } from './routes/parts.js';
import { OrdersRouter } from './routes/orders.js';
import { AccessoriesRouter } from './routes/accessories.js';
// import { ConfigRouter } from './routes/config.js';

export const APP = express();
APP.use(
    cors({ origin: [`http://localhost:${FRON_PORT}`, `https://localhost:${FRON_PORT}`], methods: 'POST, GET, DELETE, PATCH'}),
    express.json()
);

// APP.use('/config', ConfigRouter);

APP.use('/users', UsersRouter);
APP.use('/bicycles', BicyclesRouter);
APP.use('/equipments', EquipmentsRouter);
APP.use('/parts', PartsRouter);
APP.use('/accessories', AccessoriesRouter);
APP.use('/orders', OrdersRouter);

APP.use((req, res) => {
    res.status(404).send('Resource not found >_<');
    Logger.warn(`Wrong query: ${req.method} ${req.baseUrl}${req.url}`);
});

if (PRIVATE_KEY && CERTIFICATE) {
    const httpsServer = createServer({ key: PRIVATE_KEY, cert: CERTIFICATE }, APP);

    httpsServer.listen(PORT, () => { Logger.info(`Server is running via https://localhost:${PORT}`); })
} else {
    APP.listen(PORT, () => { Logger.info(`Server is running via http://localhost:${PORT}`); });
}