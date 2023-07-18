import { customers } from "../mockData";
import MockAdapter from "axios-mock-adapter";
import MockUtils from "../mock.utils";
import { Customer } from "../mockTypes";

export default function mockCustomer(mock: MockAdapter) {
  mock.onPost("api/customers").reply(({ data }) => {
    const { customer } = JSON.parse(data);
    const {
      firstName = "",
      lastName = "",
      email = "",
      userName = "",
      gender = "Female",
      status = 0,
      dateOfBbirth = "01/01/2019",
      ipAddress = "127.0.0.1",
      type = 1,
    } = customer;

    const id = generateUserId();
    const newCustomer: Customer = {
      id,
      firstName,
      lastName,
      email,
      userName,
      gender,
      status,
      dateOfBbirth,
      ipAddress,
      type,
    };
    const dublicateArray = [...customers];
    dublicateArray.push(newCustomer);
    // customers.push(newCustomer);
    return [200, dublicateArray];
  });

  mock.onPost("api/customers/find").reply((config) => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const copy_customers = [ ...customers ];
    console.log(copy_customers, 'Copy_customers -----------------------')
    const filterdCustomers = mockUtils.baseFilter(copy_customers, queryParams);
    console.log(filterdCustomers, 'filtered Customers ----------------')
    return [200, filterdCustomers];
  });

  mock.onPost("api/customers/deleteCustomers").reply((config) => {
    const { ids } = JSON.parse(config.data);
    ids.forEach((id: Number) => {
      const index = customers.findIndex((el) => el.id === id);
      if (index > -1) {
        customers.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onPost("api/customers/updateStatusForCustomers").reply((config) => {
    const { ids, status } = JSON.parse(config.data);
    customers.forEach((el) => {
      if (ids.findIndex((id: Number) => id === el.id) > -1) {
        el.status = status;
      }
    });
    return [200];
  });

  mock.onGet(/api\/customers\/\d+/).reply((config) => {
    if (config?.url) {
      const id = config.url.match(/api\/customers\/(\d+)/)![1];
      const customer = customers.find((el) => el.id === +id);
      console.log(customer, "API GET CUSTOMER -------------------");
      if (!customer) {
        return [400];
      }
      return [200, customer];
    } else {
      return [500, { error: "An unknown error occured" }];
    }
  });

  //Update Customer
  mock.onPut(/api\/customers\/\d+/).reply((config) => {
    if (config?.url) {
      const id = config.url.match(/api\/customers\/(\d+)/)![1];
      const { customer } = JSON.parse(config.data);
      const index = customers.findIndex((el: any) => el.id === +id);
      if (index < 0) {
        return [200, [...customers, customer]];
      }

      let dublicate = [...customers];
      dublicate[index] = { ...customer };
      return [200, dublicate];
    } else {
      return [500, { error: "An unknown error occured" }];
    }
  });

  mock.onDelete(/api\/customers\/\d+/).reply((config) => {
    if (config?.url) {
      const id = config.url.match(/api\/customers\/(\d+)/)![1];
      const index = customers.findIndex((el) => el.id === +id);
      // const filterdCustomers = customers.filter(
      //   (customer) => customer.id !== +id
      // );
      // const After_Delete_Customers = [...filterdCustomers];
      const duplicate_customers = [...customers];
      duplicate_customers.splice(index, 1);
      // customers = filterdCustomers;
      // customers.splice(index, 1);
      if (index < 0) {
        return [200, [...customers]];
      }
      return [200, duplicate_customers];
    } else {
      return [500, { error: "An unknown error occured" }];
    }
  });
}

function generateUserId() {
  if (customers.length === 0) {
    return 1; // Return 1 as the initial ID if the customers array is empty
  }
  const ids = customers.map((el) => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}
