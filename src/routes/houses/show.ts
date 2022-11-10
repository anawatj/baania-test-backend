import express, {Request,Response, NextFunction } from 'express';
import { deleteHouse, findOneHouse } from '../../dao/houses';
import { ResponseData } from '../../middlewares/response-data';



const router = express.Router();

router.get("/home/:id",
async(req:Request,res:Response,next:NextFunction)=>{
    const houseId = req.params.id as string;

    const rows = await findOneHouse(Number.parseInt(houseId))
    const data:ResponseData={
        payload:rows,
        count:rows.length
    }
    res.send(data);
});

export {router as showHouseRouter}