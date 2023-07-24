import { customerSlice } from "./customerSlice";
import { AppDispatch } from "../store";
import {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  findCustomers,
} from "./customersAPI";
import { toast } from "react-hot-toast";
const { actions } = customerSlice;

export const customerAdd = (data: any) => (dispatch: AppDispatch) => {
  return createCustomer(data)
    .then((response) => {
      console.log(response);
      if (response?.data) {
        console.log(response?.data, "============");
        dispatch(getCustomers());
        toast.success("Customer Added Successfuly");
      }
    })
    .catch((error) => {
      console.log(error);
      toast.error("Customer Not Added");
    });
};

export const customerUpdate = (data: any) => (dispatch: AppDispatch) => {
  updateCustomer(data)
    .then((response) => {
      dispatch(getCustomers());
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
      dispatch(getCustomers());
      toast.error("Customer Deleted");
    })
    .catch((error) => {
      console.log(error.response);
      toast.error("Unable To Delete");
    });
};

export const getCustomers = (queryParams?: any) => (dispatch: AppDispatch) => {
  findCustomers(queryParams?.pageNumber, queryParams?.pageSize)
    .then((response) => {
      dispatch(actions.setCustomers(response.data.results));
    })
    .catch((error) => {
      console.log(error);
    });
};
