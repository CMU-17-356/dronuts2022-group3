import { Request, Response, NextFunction } from 'express';

export default class CustomersController {
  constructor() { }

  async getAllCustomers(req: Request, res: Response, next: NextFunction) {
    res.json("Hah no customers right now. Need to connect to mongoose here and actually return to API user.");
  }

  async getCustomer(req: Request, res: Response, next: NextFunction) {
    res.json("Return one customer lol. Need to implement.");
  }
}