import { Router } from 'express';
import CustomerController from '../controllers/CustomerController';

class CustomerRoutes {
  router = Router();
  customerController = new CustomerController();

  constructor() {
    this.intializeRoutes();
  }
  intializeRoutes() {
    this.router.route('/').get(this.customerController.getAllCustomers);
  }
}
export default new CustomerRoutes().router;