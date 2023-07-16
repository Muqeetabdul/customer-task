import { customerSlice } from "./customerSlice";
import { AppDispatch } from "../store";
import { createCustomer, updateCustomer, deleteCustomer, findCustomers } from "./customersAPI";
import { toast } from "react-hot-toast";
const { actions } = customerSlice;

export const customerAdd = (data: any) => (dispatch: AppDispatch) => {
    //adding new customer
    createCustomer(data)
    .then((response) => {
      console.log(response);
      dispatch(actions.customerAdd(response.data))
      toast.success("Customer Added Successfuly");
    })
    .catch((error) => {
      console.log(error);
      toast.error("Customer Not Added");
    });
}

export const customerUpdate = (data: any) => (dispatch: AppDispatch) => {
    //Updating customer
    updateCustomer(data)
      .then((response) => {
        console.log(response, 'UPDATE RESPONSE ACTIONS ------------');
        dispatch(actions.customerAdd(response.data))
        toast.success(
          `Customer "${
            data.firstName + " " + data.lastName
          }" Updated Successfuly`
        );
      })
      .catch((error) => {
        console.log(error);
        toast.error("Customer Not Updated");
      });
}

export const customerDelete = (id: any) => (dispatch: AppDispatch) => {
    //Delete customer
    deleteCustomer(id)
        .then((response) => {
          console.log("DELETED");
          dispatch(actions.customerDelete(response.data))
          toast.error("Customer Deleted");
        })
        .catch((error) => {
          toast.error("Unable To Delete");
        });
}

export const customerFind = (queryParams: any) => (dispatch: AppDispatch) => {
    //Filter customers
    findCustomers(queryParams)
    .then((response) => {
        console.log(response, 'RESPONSE FROM FILTERS -----------------')
        dispatch(actions.customerFind(response.data.entities))
    })
    .catch((error) => {
        console.log(error)
    })
}


