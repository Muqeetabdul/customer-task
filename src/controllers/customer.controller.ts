import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { Request, Response } from "express";
import { customerService } from "../services/index.service";

const createCustomer = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const customer = await customerService.createCustomer(req.body);
    console.log(customer, 'customer')
    res.status(httpStatus.CREATED).send(customer);
});

const getCustomerById = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const customer = await customerService.getCustomerById(req.body);
    console.log(req.body, "CUSTOMER BY ID");
    res.status(httpStatus.FOUND).send(customer);    
});

export { createCustomer, getCustomerById };