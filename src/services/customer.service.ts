import { ObjectId } from "mongoose";
import { CustomerDocument } from "../interfaces/customer.interface";
import { Customer } from "../models/customer.model";

//create customer
export const createCustomer = async (customerBody: { [k: string]: any }): Promise<CustomerDocument> => {
    return Customer.create(customerBody);
};

// Get customer by ID
export const getCustomerById =async (id: ObjectId): Promise<CustomerDocument> => {
    return Customer.findById(id);
}

// Get Customer by email
export const getCustomerByEmail = async (email: string): Promise<CustomerDocument> => {
    return Customer.findOne({ email });
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