import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { Request, Response } from "express";
import { customerService } from "../services/index.service";
import pick from "../utils/pick";

const createCustomer = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const customer = await customerService.createCustomer(req.body);
    console.log(customer, "customer");
    res.status(httpStatus.CREATED).send(customer);
  }
);

const getAllCustomers = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const filter = pick(req.query, []);
    const options = pick(req.query, [
      "type",
      "status",
      "search",
      "limit",
      "page",
    ]);
    const result = await customerService.queryCustomers(filter, options);
    res.status(httpStatus.OK).send(result);
  }
);

const getCustomerById = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const customer = await customerService.getCustomerById(
      req.params.customerId as any
    );
    res.status(httpStatus.FOUND).send(customer);
  }
);

const updateCustomerById = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const customer = await customerService.updateCustomerById(
      req.params.customerId as any,
      req.body
    );
    res.send(customer);
  }
);

const deleteCustomer = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    await customerService.deleteCustomerById(req.params.customerId as any);
    res.status(httpStatus.NO_CONTENT).send();
  }
);

export {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomer,
};
