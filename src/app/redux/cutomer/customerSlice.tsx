import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { customers } from "../_mocks_/mockData";
import { Customer, CustomerFilter } from "../_mocks_/mockTypes";

export interface customerState {
  customers: Customer[] | undefined | any;
  isAdded: Boolean;
  error: String | undefined;
}

const initialState: customerState = {
  customers: customers,
  isAdded: false,
  error: undefined,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    getAllCustomers: (state, action: PayloadAction<Customer>) => {
      state.customers = action.payload;
    },
    
    customerAdd: (state, action: PayloadAction<Customer>) => {
    //   const newCustomer = action.payload;
    //   state.customers = [...(state.customers || []), newCustomer];
        state.customers = action.payload;
    },

    customerUpdate: (state, action: PayloadAction<Customer>) => {
        state.customers = action.payload;
    //   const updated_Customer = action.payload;
    //   console.log(action.payload, "PAYLOAD UPDATE CUSTOMER ================");
    //   const customer_Index = state.customers?.findIndex(
    //     (customer: any) => customer.id === updated_Customer.id
    //   );
    //   if (
    //     state.customers &&
    //     customer_Index !== undefined &&
    //     customer_Index !== -1
    //   ) {
    //     state.customers[customer_Index] = { ...updated_Customer };
    //   }
    },

    customerDelete: (state, action: PayloadAction<Number>) => {
        state.customers = action.payload;
    //   const customer_Index = state.customers?.findIndex(
    //     (customer: any) => customer.id === action.payload
    //   );
    //   if (
    //     state.customers &&
    //     customer_Index !== undefined &&
    //     customer_Index !== -1
    //   ) {
    //     state.customers.splice(customer_Index, 1);
    //   }
    },

    customerFind: (state, action: PayloadAction<Customer[]>) => {
            state.customers = action.payload;
        // state.filteredCustomers.push(...action.payload) ;
        // console.log(state.filteredCustomers, 'Filtered Customers ------------------')
    },
  },
});

export default customerSlice.reducer;
