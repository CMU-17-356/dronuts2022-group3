import { Router } from 'express';
import CustomerController from '../controllers/CustomerController';

class CustomerRoutes {
  router = Router();
  customerController = new CustomerController();

  constructor() {
    this.intializeRoutes();
  }
  intializeRoutes() {
    this.router.route('/').get(this.customerController.findAll);
    this.router.route('/').post(this.customerController.create);
    this.router.route('/:id').get(this.customerController.findOne);
    this.router.route('/:id').put(this.customerController.update);
    this.router.route('/:id').delete(this.customerController.delete);
  }
}
export default new CustomerRoutes().router;