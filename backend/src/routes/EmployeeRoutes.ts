import { Router } from 'express';
import EmployeeController from '../controllers/EmployeeController';


class EmployeeRoutes {
  router = Router();
  employeeController = new EmployeeController();

  constructor() {
    this.intializeRoutes();
  }
  intializeRoutes() {
    this.router.route('/').get(this.employeeController.findAll);
    this.router.route('/').post(this.employeeController.create);
    this.router.route('/:id').get(this.employeeController.findOne);
    this.router.route('/:id').put(this.employeeController.update);
    this.router.route('/:id').delete(this.employeeController.delete);
  }
}
export default new EmployeeRoutes().router;