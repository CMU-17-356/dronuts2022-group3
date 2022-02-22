import { Application } from 'express';
import customerRouter from './CustomerRoutes';

export default class Routes {

  constructor(app: Application) {
    // course routes
    app.use('/api/v1/customers', customerRouter);
  }
}