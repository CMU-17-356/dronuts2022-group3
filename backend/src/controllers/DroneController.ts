import { Request, Response, NextFunction } from 'express';
import { apiErrorHandler } from './../handlers/errorHandler';
import { DroneModel } from '../models/drone';
import * as winston from 'winston';

export default class DroneController {
    constructor() { }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try{
            DroneModel.find(req.query, function(err, drones){
                if(err){
                    apiErrorHandler(err, req, res, "Could not retrieve all the drones.");
                }else{
                    res.json(drones);
                }
            });
        }catch (err){
            apiErrorHandler(err, req, res, "Could not retrieve all the drones.");
        }
    };
    async findOne(req: Request, res: Response, next: NextFunction) {
        try{
            DroneModel.findById(req.query.id, function(err, drone){
                if(err){
                    apiErrorHandler(err, req, res, "Could not find that specific drone.");
                }else{
                    res.json(drone);
                }
            })
        }catch(err){
            apiErrorHandler(err, req, res, "Could not find that specific drone.");
        }
    }
    async create(req: Request, res: Response, next: NextFunction){
        try{
            new DroneModel(req.body).save(function (err){
                if (err){
                    apiErrorHandler(err, req, res, "Could not add the new drone");
                }
                else{
                    res.sendStatus(201);
                }
            });
        }catch(err){
            apiErrorHandler(err, req, res, "Could not add the new drone");
        }
    }
    async update(req: Request, res: Response, next: NextFunction){
        try{
            DroneModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {upsert: true, runValidators: true},function(err){
                if(err){
                    apiErrorHandler(err, req, res, "Could not update drone");
                }else{
                    res.sendStatus(200);
                }
            });
        }catch(err){
            apiErrorHandler(err, req, res, "Could not update drone")
        }
    }
    async delete(req: Request, res: Response, next: NextFunction){
        try{
            DroneModel.deleteOne({_id: req.params.id}, function(err, deleteRes){
                if (err) {
                    apiErrorHandler(err, req, res, "Delete of drone failed.");
                }else if (deleteRes.deletedCount == 0) {
                    res.sendStatus(204);
                }else{
                    res.sendStatus(200);
                }
            });
        }catch(err){
            apiErrorHandler(err, req, res, "Delete of drone failed")
        }
    }
}