import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import router from './routes/index.js';

import orderRoutes from './routes/order.routes.js';



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', router);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('ForsaMarket API is running!');
});

export default app;
