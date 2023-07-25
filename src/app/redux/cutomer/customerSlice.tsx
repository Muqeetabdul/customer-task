import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { customers } from "../_mocks_/mockData";
import { Customer, CustomerFilter } from "../_mocks_/mockTypes";

export interface customerState {
  customers: Customer[] | undefined | any;
  totalPages?: CustomerFilter;
  totalResults?: CustomerFilter;
  isAdded: Boolean;
  error: String | undefined;
}

const initialState: customerState = {
  customers: customers,
  totalPages: undefined,
  totalResults: undefined,
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
    setTotalPages: (state, action: PayloadAction<CustomerFilter>) => {
      state.totalPages = action.payload;
    },
    setTotalResults: (state, action: PayloadAction<CustomerFilter>) => {
      state.totalResults = action.payload;
    },
  },
});

export default customerSlice.reducer;
