import { Router } from 'express';
import StoreController from '../controllers/StoreController';

class CustomerRoutes {
  router = Router();
  storeController = new StoreController();

  constructor() {
    this.intializeRoutes();
  }
  intializeRoutes() {
    this.router.route('/').get(this.storeController.findAll);
    this.router.route('/').post(this.storeController.create);
    this.router.route('/:id').get(this.storeController.findOne);
    this.router.route('/:id').put(this.storeController.update);
    this.router.route('/:id').delete(this.storeController.delete);
  }
}
export default new CustomerRoutes().router;