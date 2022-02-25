import { Request, Response, NextFunction } from 'express';
import { apiErrorHandler } from './../handlers/errorHandler';
import { LocationModel } from '../models/location';
import * as winston from 'winston';

export default class LocationsController {
  constructor() { }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      
      LocationModel.find(req.query, function(err, locations) {
        if (err) {
          apiErrorHandler(err, req, res, "Find all locations failed.");
        } else { 
          res.json(locations);
        }
      });

    } catch (err) {
      apiErrorHandler(err, req, res, 'Find all locations failed.');
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      
      LocationModel.findById(req.params.id, function(err, location) {
        if (err) {
          apiErrorHandler(err, req, res, "Find location by id failed.");
        } else { 
          res.json(location);
        }
      });

    } catch (err) {
      apiErrorHandler(err, req, res, "Find location by id failed.");
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      
      new LocationModel(req.body).save(function (err) {
        if (err) {
          apiErrorHandler(err, req, res, "Create location failed.");
        } else {
          res.sendStatus(201);
        }
      });

    } catch (err) {
      apiErrorHandler(err, req, res, "Create location failed.");
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      
      LocationModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {upsert: true, runValidators: true}, function(err) {
        console.log(req.body);
        if (err) {
          apiErrorHandler(err, req, res, "Update location failed.");
        } else {
          res.sendStatus(200);
        }
      });
      
    } catch (err) {
      apiErrorHandler(err, req, res, "Update location failed.");
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      
      LocationModel.deleteOne({_id: req.params.id}, function(err, deleteRes) {
        if (err) {
          apiErrorHandler(err, req, res, "Delete location failed.");
        } else if (deleteRes.deletedCount == 0) {
          res.sendStatus(204);
        } else {
          res.sendStatus(200);
        }
      });

    } catch (err) {
      apiErrorHandler(err, req, res, "Delete location failed.");
    }
  }
}