import { Router } from 'express';
import LocationsController from '../controllers/LocationController';

class LocationRoutes {
  router = Router();
  locationController = new LocationsController();

  constructor() {
    this.intializeRoutes();
  }
  intializeRoutes() {
    this.router.route('/').get(this.locationController.findAll);
    this.router.route('/').post(this.locationController.create);
    this.router.route('/:id').get(this.locationController.findOne);
    this.router.route('/:id').put(this.locationController.update);
    this.router.route('/:id').delete(this.locationController.delete);
  }
}
export default new LocationRoutes().router;