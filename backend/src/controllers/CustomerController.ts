import { Request, Response, NextFunction } from 'express';
import { apiErrorHandler } from './../handlers/errorHandler';

export default class CustomersController {
  constructor() { }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      res.json("Hah no customers right now. Need to connect to mongoose here and actually return to API user.");
    } catch (error) {
      apiErrorHandler(error, req, res, 'Fetch All Courses failed.');
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    res.json("Return one customer lol. Need to implement.");
  }

  async create(req: Request, res: Response, next: NextFunction) {
    res.json("Create one customer lol. Need to implement.");
  }

  async update(req: Request, res: Response, next: NextFunction) {
    res.json("Update one customer lol. Need to implement.");
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    res.json("Delete one customer lol. Need to implement.");
  }
}