'use strict';

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { phoneRouter } from './routes/phone.routes';

dotenv.config();

import { connect } from './utils/initDb';

connect();

const app = express()
  .use(express.json())
  .use(cors({ origin: '*' }));

app.use('/products', phoneRouter);

app.get('/', (req, res) => {
  res.send('Hi dude!👽');
});

app.listen(process.env.PORT, () => {
  console.log(
    `☄️👽☄️ Server is running and you can not stop it http://localhost:${process.env.PORT} 🚀👽🚀`,
  );
});
