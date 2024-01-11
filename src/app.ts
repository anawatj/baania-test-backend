import express, { json } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pool from './dbconfig/db-connector';
import { houseIndexRouter } from './routes/houses';
import { newHouseRouter } from './routes/houses/new';
import { postCodeIndexRouter } from './routes/postcodes';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { updateHouseRouter } from './routes/houses/update';
import { deleteHouseRouter } from './routes/houses/delete';
import { showHouseRouter } from './routes/houses/show';
import { showPostCode } from './routes/postcodes/show';
const app = express();
var options = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
app.use(cors(options));
app.use(json());
app.use(houseIndexRouter);
app.use(newHouseRouter);
app.use(updateHouseRouter);
app.use(deleteHouseRouter);
app.use(showHouseRouter);
app.use(postCodeIndexRouter);
app.use(showPostCode);
console.log(pool);
pool.connect(function (err, client, done) {
    if (err) throw new Error(err.message);
    console.log('Connected');
  }); 

app.use(errorHandler)
app.all('*', async (req, res,next) => {
  next(new NotFoundError());
});
export {app} ;