import { Application } from 'express';
import customerRouter from './CustomerRoutes';

export default class Routes {

  constructor(app: Application) {
    app.use('/api/v1/customers', customerRouter);
  }
}