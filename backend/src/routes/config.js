import { Router } from "express";
import { DB } from "../config/database/database.js";

export const ConfigRouter = Router();

const database = DB.collection('bicycles');
ConfigRouter.get('/config', async function(req, res) {
    try {
        const bicycles = await database.find().toArray();

        bicycles.map(async (data) => {
            const filter = { _id: data._id };

            const [day, month, year] = data.productionDate.split('-');
            const upd = {
                $set: { productionDate: new Date(`${year}-${month}-${day}`) }
            }
            await database.updateOne(filter, upd);
        });

        res.json("CHECK");
    } catch (err) {
        res.status(500).json("ERROR");
        console.log(err);
    }
});