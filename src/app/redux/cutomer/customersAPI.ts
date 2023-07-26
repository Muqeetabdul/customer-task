import axios from "axios";
import { Customer, CustomerFilter } from "../_mocks_/mockTypes";
export const CUSTOMERS_URL = "http://localhost:3001/v1/customers";

// CREATE =>  POST: add a new customer to the server
export function createCustomer(customer: Customer) {
  return axios.post(CUSTOMERS_URL, customer);
}

// READ
export function getAllCustomers() {
  return axios.get(`${CUSTOMERS_URL}/`);
}

export function getCustomerById(customerId: number) {
  return axios.get(`${CUSTOMERS_URL}/${customerId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
// export function findCustomers(queryParams: CustomerFilter) {
//   console.log("find customers api end point .............");
//   return axios.post(`${CUSTOMERS_URL}/`, { queryParams });
// }

// export function findCustomers(
//   pageNumber?: number,
//   pageSize?: number,
//   type?: string,
//   status?: string,
//   search?: string
// ) {
//   if (pageNumber && pageSize && status === undefined && type === undefined && search === '') {
//     return axios.get(`${CUSTOMERS_URL}?limit=${pageSize}&page=${pageNumber}`);
//   } else if (pageNumber && pageSize && status && type === undefined && search === '') {
//     return axios.get(
//       `${CUSTOMERS_URL}?limit=${pageSize}&page=${pageNumber}&status=${status}`
//     );
//   } else if (pageNumber && pageSize && status === undefined && type && search === '') {
//     return axios.get(
//       `${CUSTOMERS_URL}?limit=${pageSize}&page=${pageNumber}&type=${type}`
//     );
//   } else if (pageNumber && pageSize && status === undefined && type === undefined && search) {
//     return axios.get(
//       `${CUSTOMERS_URL}?limit=${pageSize}&page=${pageNumber}&search=${search}`
//     );
//   } else if (pageNumber || pageSize || type || status || search) {
//     return axios.get(
//       `${CUSTOMERS_URL}?limit=${pageSize}&page=${pageNumber}&search=${search ? search : ''}&type=${type ? type : undefined}&status=${status ? status : undefined}`
//     );
//   } else {
//     return axios.get(`${CUSTOMERS_URL}/`);
//   }
// }

export function findCustomers(
  pageNumber?: number,
  pageSize?: number,
  type?: string,
  status?: string,
  search?: string
) {
  const params = new URLSearchParams();

  if (pageNumber) params.append("page", String(pageNumber));
  if (pageSize) params.append("limit", String(pageSize));
  if (status) params.append("status", status);
  if (type) params.append("type", type);
  if (search) params.append("search", search);

  const queryString = params.toString();
  const url = `${CUSTOMERS_URL}${queryString ? `?${queryString}` : ""}`;

  return axios.get(url);
}

// UPDATE => PUT: update the customer on the server
export function updateCustomer(customer: Customer) {
  return axios.patch(`${CUSTOMERS_URL}/${customer.id}`, customer);
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
