import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { customers } from "../_mocks_/mockData";
import { Customer, CustomerFilter } from "../_mocks_/mockTypes";

export interface customerState {
  customer: Customer | undefined;
  customers: Customer[] | undefined | any;
  isAdded: Boolean;
  error: String | undefined;
}

const initialState: customerState = {
  customer: undefined,
  customers: customers,
  isAdded: false,
  error: undefined,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    allCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.customers = [...action.payload];
    },

    customerAdd: (state, action: PayloadAction<Customer[]>) => {
      state.customers = [...action.payload];
    },

    customerUpdate: (state, action: PayloadAction<Customer[]>) => {},

    customerDelete: (state, action: PayloadAction<String>) => {},

    customerFind: (state, action: PayloadAction<Customer[]>) => {},
  },
});

export default customerSlice.reducer;
