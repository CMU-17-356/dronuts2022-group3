import { Router } from 'express';
import DonutsController from '../controllers/DonutController';

class DonutRoutes {
  router = Router();
  donutController = new DonutsController();

  constructor() {
    this.intializeRoutes();
  }
  intializeRoutes() {
    this.router.route('/').get(this.donutController.findAll);
    this.router.route('/').post(this.donutController.create);
    this.router.route('/:id').get(this.donutController.findOne);
    this.router.route('/:id').put(this.donutController.update);
    this.router.route('/:id').delete(this.donutController.delete);
  }
}
export default new DonutRoutes().router;