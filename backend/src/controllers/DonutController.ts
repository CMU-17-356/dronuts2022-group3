import { Request, Response, NextFunction } from 'express';
import { apiErrorHandler } from './../handlers/errorHandler';
import { DonutModel } from '../models/donut';
import * as winston from 'winston';

export default class DonutsController {
  constructor() { }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      
      DonutModel.find(req.query, function(err, donuts) {
        if (err) {
          apiErrorHandler(err, req, res, "Find all donuts failed.");
        } else { 
          res.json(donuts);
        }
      });

    } catch (err) {
      apiErrorHandler(err, req, res, 'Find all donuts failed.');
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      
      DonutModel.findById(req.params.id, function(err, donut) {
        if (err) {
          apiErrorHandler(err, req, res, "Find donut by id failed.");
        } else { 
          res.json(donut);
        }
      });

    } catch (err) {
      apiErrorHandler(err, req, res, "Find donut by id failed.");
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      
      new DonutModel(req.body).save(function (err) {
        if (err) {
          apiErrorHandler(err, req, res, "Create donut failed.");
        } else {
          res.sendStatus(201);
        }
      });

    } catch (err) {
      apiErrorHandler(err, req, res, "Create donut failed.");
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      
      DonutModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {upsert: true, runValidators: true}, function(err) {
        console.log(req.body);
        if (err) {
          apiErrorHandler(err, req, res, "Update donut failed.");
        } else {
          res.sendStatus(200);
        }
      });
      
    } catch (err) {
      apiErrorHandler(err, req, res, "Update donut failed.");
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      
      DonutModel.deleteOne({_id: req.params.id}, function(err, deleteRes) {
        if (err) {
          apiErrorHandler(err, req, res, "Delete donut failed.");
        } else if (deleteRes.deletedCount == 0) {
          res.sendStatus(204);
        } else {
          res.sendStatus(200);
        }
      });

    } catch (err) {
      apiErrorHandler(err, req, res, "Delete donut failed.");
    }
  }
}