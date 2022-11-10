import express, {Request,Response, NextFunction } from 'express';
import { findAvgAndMedian } from '../../dao/houses';
import { ResponseData } from '../../middlewares/response-data';
const cal_median=(values:number[])=>{
   if(values.length ===0) return 0;

   values.sort((a:number,b:number)=>{
     return a-b;
   });
 
   var half = Math.floor(values.length / 2);
   
   if (values.length % 2)
     return values[half];
   
   return (values[half - 1] + values[half]) / 2.0;
}

const router = express.Router();

router.get("/postCode/:id",async(req:Request,res:Response,next:NextFunction)=>{
   const id = req.params.id as string 
   const rows = await findAvgAndMedian(id);
   const average =rows.length>0? rows.map(row=>row.price).reduce((a,b)=>a+b)/rows.length:0;
   const median = cal_median(rows.map(row=>row.price));
   const data:{
      average:number,
      median:number
   }={
      average:average,
      median:median
   }
   const r:{
      payload:any
   } = {
      payload:data
   }
   res.send(r);
});


export {router as showPostCode}