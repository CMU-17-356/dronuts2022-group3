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
    this.router.route('/:id').get(this.customerController.getCustomer);
  }
}
export default new CustomerRoutes().router;