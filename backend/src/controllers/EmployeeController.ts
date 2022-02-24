import { Request, Response, NextFunction } from 'express';
import { apiErrorHandler } from './../handlers/errorHandler';
import { EmployeeModel } from '../models/employee';
import * as winston from 'winston';

export default class EmployeeController {
    constructor() { }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try{
            EmployeeModel.find(req.query, function(err, employees){
                if(err){
                    apiErrorHandler(err, req, res, "Could not retrieve all the employees.");
                }else{
                    res.json(employees);
                }
            });
        }catch (err){
            apiErrorHandler(err, req, res, "Could not retrieve all the employees.");
        }
    };
    async findOne(req: Request, res: Response, next: NextFunction) {
        try{
            EmployeeModel.findById(req.query.id, function(err, employee){
                if(err){
                    apiErrorHandler(err, req, res, "Could not find that specific employee.");
                }else{
                    res.json(employee);
                }
            })
        }catch(err){
            apiErrorHandler(err, req, res, "Could not find that specific employee.");
        }
    }
    async create(req: Request, res: Response, next: NextFunction){
        try{
            new EmployeeModel(req.body).save(function (err){
                if (err){
                    apiErrorHandler(err, req, res, "Could not add the new employee");
                }
                else{
                    res.sendStatus(201);
                }
            });
        }catch(err){
            apiErrorHandler(err, req, res, "Could not add new employee");
        }
    }
    async update(req: Request, res: Response, next: NextFunction){
        try{
            EmployeeModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {upsert: true, runValidators: true},function(err){
                if(err){
                    apiErrorHandler(err, req, res, "Could not update employee");
                }else{
                    res.sendStatus(200);
                }
            });
        }catch(err){
            apiErrorHandler(err, req, res, "Could not update employee")
        }
    }
    async delete(req: Request, res: Response, next: NextFunction){
        try{
            EmployeeModel.deleteOne({_id: req.params.id}, function(err, deleteRes){
                if (err) {
                    apiErrorHandler(err, req, res, "Delete employee failed.");
                }else if (deleteRes.deletedCount == 0) {
                    res.sendStatus(204);
                }else{
                    res.sendStatus(200);
                }
            });
        }catch(err){
            apiErrorHandler(err, req, res, "Delete employee failed")
        }
    }
}