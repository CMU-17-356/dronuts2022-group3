import { Request, Response, NextFunction } from 'express';
import { apiErrorHandler } from './../handlers/errorHandler';
import { CustomerModel } from '../models/customer';

export default class CustomersController {
  constructor() { }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      res.json("Hah no customers right now. Need to connect to mongoose here and actually return to API user.");
    } catch (error) {
      apiErrorHandler(error, req, res, 'Find all customers failed.');
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    res.json("Return one customer lol. Need to implement.");
  }

  async create(req: Request, res: Response, next: NextFunction) {
    console.log(req.body)
    try {
      const newCustomer = new CustomerModel(req.body);
      newCustomer.save(function (err) {
        if (err) {
          console.log("Error creating customer.");
          console.log(err);
          res.json("Error");
        } else {
          res.json(req.body);
        }
      })
      // res.json("Create one customer lol. Need to implement.");
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