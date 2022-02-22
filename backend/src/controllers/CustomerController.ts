import { Request, Response, NextFunction } from 'express';
import { apiErrorHandler } from './../handlers/errorHandler';
import { CustomerModel } from '../models/customer';

export default class CustomersController {
  constructor() { }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      CustomerModel.find(function(err, customers) {
        if (err) {
          console.log(err);
          res.send(err);
        }
        
        res.json(customers);
      });
    } catch (error) {
      apiErrorHandler(error, req, res, 'Find all customers failed.');
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    res.json("Return one customer lol. Need to implement.");
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newCustomer = new CustomerModel(req.body);
      newCustomer.save(function (err) {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.json(req.body);
        }
      })
    } catch (error) {
      apiErrorHandler(error, req, res, "Create customer failed.");
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    res.json("Update one customer lol. Need to implement.");
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    res.json("Delete one customer lol. Need to implement.");
  }
}