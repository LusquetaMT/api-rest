import { config } from 'dotenv';
import { resolve } from 'path';

import express from 'express';
import homeRoutes from './src/routes/homeRoutes';
import userRoutes from './src/routes/userRoutes';
import tokenRoutes from './src/routes/tokenRoutes';
import costumerRoutes from './src/routes/costumerRoutes';
import pictureRoutes from './src/routes/pictureRoutes';

import './src/database/index';

config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/costumers/', costumerRoutes);
    this.app.use('/pictures/', pictureRoutes);
  }
}

export default new App().app;
