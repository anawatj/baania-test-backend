import {Pool} from 'pg';

const pool = new Pool ({
    max: 20,
    connectionString:process.env.DATABASE_URL as string,
    idleTimeoutMillis: 30000
});

export default pool;