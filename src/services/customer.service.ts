import mongoose from "mongoose";
import { ObjectId } from "mongoose";
import { CustomerDocument } from "../interfaces/customer.interface";
import { Customer } from "../models/customer.model";

//create customer
export const createCustomer = async (customerBody: { [k: string]: any }): Promise<CustomerDocument> => {
    return Customer.create(customerBody);
};

// GET all customers
export const getAllCustomers = async (): Promise<CustomerDocument[]> => {
    console.log('I am in GETALLCUSTOMERS SERVICE ------------')
    const allCustomers = await Customer.find();
    return allCustomers;
}
 
// Get customer by ID
export const getCustomerById =async (id: ObjectId): Promise<CustomerDocument> => {
    console.log('IN getCustomerbyid service ........')
    console.log(id)
    return Customer.findById(id);
}

// Get Customer by email
export const getCustomerByEmail = async (email: string): Promise<CustomerDocument> => {
    return Customer.findOne({ email });
}

// Update Customer by ID
export const updateCustomerById = async (customerId: ObjectId, updateBody: { [k: string]: any }): Promise<CustomerDocument> => {
    const customer = await getCustomerById(customerId);
    Object.assign(customer as any, updateBody as any);
    await (customer as any).save();
    return customer;
}

// Delete Customer
export const deleteCustomerById = async (customerId: ObjectId): Promise<CustomerDocument> => {
    const customer = await getCustomerById(customerId);
    if (!customer) {
        console.log("NO SUCH CUSTOMER AVAILABLE...")
    }     
    await (customer as any).remove();
    return customer;
}