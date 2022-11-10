import pool from '../dbconfig/db-connector';
export const findAllPostCode=async()=>{
    let sql = `
        SELECT DISTINCT
            post_code
        FROM houses 

    `


    const client = await pool.connect();
    const {rows} = await client.query(sql);
    client.release();
    return rows;
}