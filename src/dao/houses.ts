import pool from '../dbconfig/db-connector';
import  HouseRequestModel  from '../models/house-request-model';

export const findAllHouse=async(skip:string|undefined,take:string|undefined)=>{
    let sql = `
        SELECT 
            id,
            house_name as name, 
            house_desc as desc ,
            price,
            post_code 
        FROM houses 

    `

    if(skip && take){
        sql += ` OFFSET ${skip} LIMIT ${take} `
    }else if (skip && !take){
        sql += ` OFFSET ${skip} `
    }else if (!skip && take){
        sql += ` LIMIT ${take} `
    }

    const client = await pool.connect();
    const {rows} = await client.query(sql);
    client.release();
    return rows;
}
export const findOneHouse=async(id:any) => {
    let sql = `
        SELECT 
            id,
            house_name as name, 
            house_desc as desc ,
            price,
            post_code 
        FROM houses 
        WHERE id = $1

    `

  

    const client = await pool.connect();
    const {rows} = await client.query(sql,[id]);
    client.release();
    return rows;
}
export const insertHouse=async(data:HouseRequestModel)=>{
    const sql =`
        INSERT INTO houses(
            house_name,
            house_desc,
            price,
            post_code
        )VALUES(
            $1,
            $2,
            $3,
            $4
        )
        RETURNING id
    `
    const client = await pool.connect();
    const res = await client.query(sql,[data.name,data.desc,data.price,data.post_code]);
    client.release();
    return res.rows[0].id;
}

export const updateHouse=async(data:HouseRequestModel)=>{
    const sql = `
        UPDATE houses SET 
            house_name=$1,
            house_desc=$2,
            price=$3,
            post_code=$4
        WHERE
            id = $5
    `
    const client = await pool.connect();
    await client.query(sql,[data.name,data.desc,data.price,data.post_code,data.id]);
    return data.id;
}

export const deleteHouse=async(id:number)=>{
    const sql= `
        DELETE
        FROM houses
        WHERE id = $1
    `
    const client = await pool.connect();
    await client.query(sql,[id]);
}

export const findAvgAndMedian = async (post_code:string)=>{
    const sql = `
    
        SELECT price
        FROM houses
        WHERE post_code=$1
    `
    const client = await pool.connect();
    const {rows} = await client.query(sql,[post_code]);
    return rows;
}
