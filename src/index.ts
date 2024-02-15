import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import morgan from 'morgan';
import connectDB from './connect/db';
import notFoundMiddleware from './middlewares/not-found';
import errorHandlerMiddleware from './middlewares/error-handlers';
import path = require('path');
dotenv.config();
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import passRoutes from './routes/pass.routes';
const port = process.env.PORT || 3000;
const url = process.env.MONGO_URI || 'mongodb://localhost:27017/assignment';

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/pass', passRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const start = async () => {
  try {
    await connectDB(url);
    app.listen(port, () => {
      console.log(`The Server is running on ${port}`);
    });
  } catch (error) {}
};

start();
