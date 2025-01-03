import { Router } from "express";

import { ProductsCollection } from "../main.js";
import { logger } from "../config/logger/logger.js";

export const ProductsRouter = Router();

ProductsRouter.get('/amount/(:am)', async (req, res) => {
    try {
        const products = await ProductsCollection.find().limit(parseInt(req.params.am)).toArray();

        res.json(products);
        logger.info(`${req.method} ${req.baseUrl}${req.url}`);
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong @_@' });
        logger.warn(`${req.method} ${req.baseUrl}${req.url}: ${err.message}`);
    }
});