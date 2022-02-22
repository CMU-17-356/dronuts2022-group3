import { Router } from 'express';
// import CustomerController from '../controllers/CustomerController.ts';

class CustomerRoutes {
  router = Router();
//   coursesCtrl = new CoursesCtrl();

  constructor() {
    this.intializeRoutes();
  }
  intializeRoutes() {
    // this.router.route('/').get(this.coursesCtrl.getAllCourses);
    // this.router.route('/:id').get(this.coursesCtrl.getCourseDetails);
  }
}
export default new CustomerRoutes().router;