import { customerSlice } from "./customerSlice";
import { AppDispatch } from "../store";
import {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  findCustomers,
  getAllCustomers,
} from "./customersAPI";
import { toast } from "react-hot-toast";
const { actions } = customerSlice;

export const allCustomers = () => (dispatch: AppDispatch) => {
  getAllCustomers()
    .then((response) => {
      console.log(response);
      dispatch(actions.allCustomers(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const customerAdd = (data: any) => (dispatch: AppDispatch) => {
  createCustomer(data)
    .then((response) => {
      console.log(response);
      dispatch(actions.customerAdd(response.data));
      dispatch(allCustomers());
      toast.success("Customer Added Successfuly");
    })
    .catch((error) => {
      console.log(error);
      toast.error("Customer Not Added");
    });
};

export const customerUpdate = (data: any) => (dispatch: AppDispatch) => {
  updateCustomer(data)
    .then((response) => {
      dispatch(actions.customerUpdate(response.data));
      toast.success(
        `Customer "${data.firstName + " " + data.lastName}" Updated Successfuly`
      );
    })
    .catch((error) => {
      console.log(error.response);
      toast.error("Customer Not Updated");
    });
};

export const customerDelete = (id: any) => (dispatch: AppDispatch) => {
  deleteCustomer(id)
    .then((response) => {
      dispatch(actions.customerDelete(response.data));
      toast.error("Customer Deleted");
    })
    .catch((error) => {
      console.log(error.response);
      toast.error("Unable To Delete");
    });
};

export const customerFind = (queryParams: any) => (dispatch: AppDispatch) => {
  //Filter customers
  findCustomers(queryParams)
    .then((response) => {
      dispatch(actions.customerFind(response.data.entities));
    })
    .catch((error) => {
      console.log(error);
    });
};
