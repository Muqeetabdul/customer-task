import axios from "axios";
import { Customer, CustomerFilter } from "../_mocks_/mockTypes";
export const CUSTOMERS_URL = "api/customers";

// CREATE =>  POST: add a new customer to the server
export function createCustomer(customer: Customer) {
  return axios.post(CUSTOMERS_URL, { customer });
}

// READ
export function getAllCustomers() {
  return axios.get(CUSTOMERS_URL);
}

export function getCustomerById(customerId: number) {
  return axios.get(`${CUSTOMERS_URL}/${customerId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCustomers(queryParams: CustomerFilter) {
  return axios.post(`${CUSTOMERS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the customer on the server
export function updateCustomer(customer: Customer) {
  return axios.put(`${CUSTOMERS_URL}/${customer.id}`, { customer });
}

// UPDATE Status
export function updateStatusForCustomers(ids: number[], status: number) {
  return axios.post(`${CUSTOMERS_URL}/updateStatusForCustomers`, {
    ids,
    status,
  });
}

// DELETE => delete the customer from the server
export function deleteCustomer(customerId: number) {
  return axios.delete(`${CUSTOMERS_URL}/${customerId}`);
}

// DELETE Customers by ids
export function deleteCustomers(ids: number[]) {
  return axios.post(`${CUSTOMERS_URL}/deleteCustomers`, { ids });
}
