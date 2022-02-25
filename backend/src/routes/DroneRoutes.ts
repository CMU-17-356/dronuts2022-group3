import { Router } from 'express';
import DroneController from '../controllers/DroneController';

class DroneRoutes {
    router = Router();
    droneController = new DroneController();

    constructor(){
        this.initializeRoutes();
    }
    initializeRoutes(){
        this.router.route('/').get(this.droneController.findAll);
        this.router.route('/').post(this.droneController.create);
        this.router.route('/:id').get(this.droneController.findOne);
        this.router.route('/:id').get(this.droneController.update);
        this.router.route(':/id').get(this.droneController.update);
    }
}
export default new DroneRoutes().router;
