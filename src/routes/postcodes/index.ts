import express, {Request,Response, NextFunction } from 'express';
import { findAllPostCode } from '../../dao/postcodes';
import { ResponseData } from '../../middlewares/response-data';

const router = express.Router();

router.get("/postCode",async(req:Request,res:Response,next:NextFunction)=>{
    const rows =await findAllPostCode();
    const data:ResponseData={
        payload:rows,
        count:rows.length
    }
    res.send(data);
});
export {router as postCodeIndexRouter}