import { Request, Response, NextFunction } from 'express';
import { apiErrorHandler } from './../handlers/errorHandler';
import { CustomerModel } from '../models/customer';
import * as winston from 'winston';

export default class CustomersController {
  constructor() { }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      
      CustomerModel.find(req.query, function(err, customers) {
        if (err) {
          apiErrorHandler(err, req, res, "Find all customers failed.");
        } else { 
          res.json(customers);
        }
      });

    } catch (err) {
      apiErrorHandler(err, req, res, 'Find all customers failed.');
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      
      CustomerModel.findById(req.params.id, function(err, customer) {
        if (err) {
          apiErrorHandler(err, req, res, "Find customer by id failed.");
        } else { 
          res.json(customer);
        }
      });

    } catch (err) {
      apiErrorHandler(err, req, res, "Find customer by id failed.");
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      
      new CustomerModel(req.body).save(function (err) {
        if (err) {
          apiErrorHandler(err, req, res, "Create customer failed.");
        } else {
          res.sendStatus(201);
        }
      });

    } catch (err) {
      apiErrorHandler(err, req, res, "Create customer failed.");
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      
      CustomerModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {upsert: true, runValidators: true}, function(err) {
        console.log(req.body);
        if (err) {
          apiErrorHandler(err, req, res, "Update customer failed.");
        } else {
          res.sendStatus(200);
        }
      });
      
    } catch (err) {
      apiErrorHandler(err, req, res, "Update customer failed.");
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      
      CustomerModel.deleteOne({_id: req.params.id}, function(err, deleteRes) {
        if (err) {
          apiErrorHandler(err, req, res, "Delete customer failed.");
        } else if (deleteRes.deletedCount == 0) {
          res.sendStatus(204);
        } else {
          res.sendStatus(200);
        }
      });

    } catch (err) {
      apiErrorHandler(err, req, res, "Delete customer failed.");
    }
  }
}