import express, {Request,Response, NextFunction } from 'express';
import { findAllHouse } from '../../dao/houses';
import { ResponseData } from '../../middlewares/response-data';


const router = express.Router();

router.get("/home",async(req:Request,res:Response,next:NextFunction)=>{
    
    const {skip,take} = req.query;
    const rows =await findAllHouse(skip?skip as string:undefined,take?take as string:undefined);
    const data:ResponseData = {
        payload:rows,
        count:rows.length
    }
    res.send(data);

});

export {router as houseIndexRouter}