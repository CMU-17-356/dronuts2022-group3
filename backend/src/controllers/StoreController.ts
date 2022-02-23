import { Request, Response, NextFunction } from 'express';
import { apiErrorHandler } from './../handlers/errorHandler';
import { StoreModel } from '../models/store';
import * as winston from 'winston';

export default class StoresController {
  constructor() { }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      
      StoreModel.find(req.query, function(err, stores) {
        if (err) {
          apiErrorHandler(err, req, res, "Find all stores failed.");
        } else { 
          res.json(stores);
        }
      });

    } catch (err) {
      apiErrorHandler(err, req, res, 'Find all stores failed.');
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      
      StoreModel.findById(req.params.id, function(err, store) {
        if (err) {
          apiErrorHandler(err, req, res, "Find store by id failed.");
        } else { 
          res.json(store);
        }
      });

    } catch (err) {
      apiErrorHandler(err, req, res, "Find store by id failed.");
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      
      new StoreModel(req.body).save(function (err) {
        if (err) {
          apiErrorHandler(err, req, res, "Create store failed.");
        } else {
          res.sendStatus(201);
        }
      });

    } catch (err) {
      apiErrorHandler(err, req, res, "Create store failed.");
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      
      StoreModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {upsert: true, runValidators: true}, function(err) {
        console.log(req.body);
        if (err) {
          apiErrorHandler(err, req, res, "Update store failed.");
        } else {
          res.sendStatus(200);
        }
      });
      
    } catch (err) {
      apiErrorHandler(err, req, res, "Update store failed.");
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      
      StoreModel.deleteOne({_id: req.params.id}, function(err, deleteRes) {
        if (err) {
          apiErrorHandler(err, req, res, "Delete store failed.");
        } else if (deleteRes.deletedCount == 0) {
          res.sendStatus(204);
        } else {
          res.sendStatus(200);
        }
      });

    } catch (err) {
      apiErrorHandler(err, req, res, "Delete store failed.");
    }
  }
}