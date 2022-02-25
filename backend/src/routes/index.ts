import { Application } from 'express';
import customerRouter from './CustomerRoutes';
import storeRouter from './StoreRoutes';
import orderRouter from './OrderRoutes'

export default class Routes {

  constructor(app: Application) {
    app.use('/api/v1/customers', customerRouter);
    app.use('/api/v1/stores', storeRouter);
    app.use('/api/v1/orders', orderRouter);
  }
}