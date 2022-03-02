import { Request, Response, NextFunction } from 'express';
import { apiErrorHandler } from './../handlers/errorHandler';
import { OrderModel } from '../models/order';
import * as winston from 'winston';

export default class OrdersController {
  constructor() { }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      
      OrderModel.find(req.query, function(err, orders) {
        if (err) {
          apiErrorHandler(err, req, res, "Find all orders failed.");
        } else { 
          res.json(orders);
        }
      });

    } catch (err) {
      apiErrorHandler(err, req, res, 'Find all orders failed.');
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      
      OrderModel.findById(req.params.id, function(err, order) {
        if (err) {
          apiErrorHandler(err, req, res, "Find order by id failed.");
        } else { 
          res.json(order);
        }
      });

    } catch (err) {
      apiErrorHandler(err, req, res, "Find order by id failed.");
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      
      new OrderModel(req.body).save(function (err) {
        if (err) {
          apiErrorHandler(err, req, res, "Create order failed.");
        } else {
          res.sendStatus(201);
        }
      });

    } catch (err) {
      apiErrorHandler(err, req, res, "Create order failed.");
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      
      OrderModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {upsert: true, runValidators: true}, function(err) {
        console.log(req.body);
        if (err) {
          apiErrorHandler(err, req, res, "Update order failed.");
        } else {
          res.sendStatus(200);
        }
      });
      
    } catch (err) {
      apiErrorHandler(err, req, res, "Update order failed.");
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      
      OrderModel.deleteOne({_id: req.params.id}, function(err, deleteRes) {
        if (err) {
          apiErrorHandler(err, req, res, "Delete order failed.");
        } else if (deleteRes.deletedCount == 0) {
          res.sendStatus(204);
        } else {
          res.sendStatus(200);
        }
      });

    } catch (err) {
      apiErrorHandler(err, req, res, "Delete order failed.");
    }
  }
}