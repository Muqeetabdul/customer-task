import { ObjectId } from "mongoose";
import { CustomerDocument } from "../interfaces/customer.interface";
import { Customer } from "../models/index.model";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";

//create customer
export const createCustomer = async (customerBody: {
  [k: string]: any;
}): Promise<CustomerDocument> => {
  return Customer.create(customerBody);
};

/**
 * Query for customers
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {number} [options.limit] - Maximum number of results per page (default = 3)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

// GET all customers
export const queryCustomers = async (
  filter: object,
  options: object
): Promise<CustomerDocument[]> => {
  const customers = await Customer.paginate(filter, options);
  return customers;
};

export const searchCustomers = async (
  search: string
): Promise<CustomerDocument[]> => {
  const searched_Customers = await Customer.find({
    firstName: { $regex: ".*" + search + ".*", $options: "i" },
  });
  if (searched_Customers) {
    return searched_Customers;
  }
}

// Get customer by ID
export const getCustomerById = async (
  id: ObjectId
): Promise<CustomerDocument> => {
  console.log(id);
  return Customer.findById(id);
};

// Get Customer by email
export const getCustomerByEmail = async (
  email: string
): Promise<CustomerDocument> => {
  return Customer.findOne({ email });
};

// Update Customer by ID
export const updateCustomerById = async (
  customerId: ObjectId,
  updateBody: { [k: string]: any }
): Promise<CustomerDocument> => {
  const customer = await getCustomerById(customerId);
  if (!customer) {
    throw new ApiError(httpStatus.NOT_FOUND, "Customer not found");
  }
  Object.assign(customer as any, updateBody as any);
  await (customer as any).save();
  return customer;
};

// Delete Customer
export const deleteCustomerById = async (
  customerId: ObjectId
): Promise<CustomerDocument> => {
  const customer = await getCustomerById(customerId);
  if (!customer) {
    throw new ApiError(httpStatus.NOT_FOUND, "Customer not found");
  }
  await (customer as any).remove();
  return customer;
};
