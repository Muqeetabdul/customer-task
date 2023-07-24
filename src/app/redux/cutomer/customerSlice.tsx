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
    setCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload;
    },
  },
});

export default customerSlice.reducer;
