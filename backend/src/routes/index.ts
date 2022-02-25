import { Application } from 'express';
import customerRouter from './CustomerRoutes';
import storeRouter from './StoreRoutes';
import employeeRouter from './EmployeeRoutes';
import orderRouter from './OrderRoutes';
import donutRouter from './DonutRoutes';
import locationRouter from './LocationRoutes';

export default class Routes {

  constructor(app: Application) {
    app.use('/api/v1/customers', customerRouter);
    app.use('/api/v1/stores', storeRouter);
    app.use('/api/v1/employees', employeeRouter);
    app.use('/api/v1/orders', orderRouter);
    app.use('/api/v1/locations', locationRouter);
  }
}


