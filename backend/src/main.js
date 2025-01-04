import express from 'express';
import cors from 'cors';

import { PORT } from './config/env.js';
import { logger } from './config/logger/logger.js';
import { UsersRouter } from './routes/users.js';
import { BicyclesRouter } from './routes/bicycles.js';

export const APP = express();
APP.use(
    cors({ origin: ['http://localhost:15924', 'https://localhost:15924'], methods: 'POST, GET, DELETE, PATCH'}),
    express.json()
);

APP.use('/users', UsersRouter);
APP.use('/bicycles', BicyclesRouter);

APP.use((req, res) => { res.status(404).send('Resource not found >_<'); });
APP.listen(PORT, () => { logger.info(`Server is running via http://localhost:${PORT}`); });