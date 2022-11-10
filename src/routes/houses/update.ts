import express, {Request,Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { findOneHouse, insertHouse, updateHouse } from '../../dao/houses';
import { ResponseData } from '../../middlewares/response-data';
import { validateRequest } from '../../middlewares/validate-request';

import HouseRequestModel from '../../models/house-request-model';
const router = express.Router();

router.patch("/home/:id",
/*[
    body("name")
    .isString()
    .withMessage("name must be provided"),
    body("price")
    .isNumeric()
    .withMessage("price must be provided"),
    body("post_code")
    .isPostalCode("TH")
    .withMessage("postcode must be provided")
],*/
validateRequest,
async(req:Request,res:Response,next:NextFunction)=>{
    const {name,price,desc,post_code} = req.body;
    const houseId = req.params.id as string;
    const reqData:HouseRequestModel= {
        id:Number.parseInt(houseId),
        name:name as string ,
        price:price as number,
        desc:desc as string,
        post_code:post_code as string
    };
    await updateHouse(reqData);
    const rows =await findOneHouse(houseId);
    const data:ResponseData={
        payload:rows,
        count:rows.length
    }
    res.send(data);
});

export {router as updateHouseRouter}