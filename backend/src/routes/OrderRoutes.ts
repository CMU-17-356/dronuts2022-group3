import { Router } from 'express';
import OrdersController from '../controllers/OrderController';

class OrderRoutes {
  router = Router();
  orderController = new OrdersController();

  constructor() {
    this.intializeRoutes();
  }
  intializeRoutes() {
    this.router.route('/').get(this.orderController.findAll);
    this.router.route('/').post(this.orderController.create);
    this.router.route('/:id').get(this.orderController.findOne);
    this.router.route('/:id').put(this.orderController.update);
    this.router.route('/:id').delete(this.orderController.delete);
  }
}
export default new OrderRoutes().router;