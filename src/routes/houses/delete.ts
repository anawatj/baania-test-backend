import express, {Request,Response, NextFunction } from 'express';
import { deleteHouse } from '../../dao/houses';


import HouseRequestModel from '../../models/house-request-model';
const router = express.Router();

router.delete("/home/:id",
async(req:Request,res:Response,next:NextFunction)=>{
    const houseId = req.params.id as string;

    await deleteHouse(Number.parseInt(houseId))
    res.send("Delete Successful");
});

export {router as deleteHouseRouter}