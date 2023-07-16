import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Customer, CustomerFilter } from "../_mocks_/mockTypes";
import { CustomTransformer } from "typescript";

export interface customerState{
    customer: Customer,
    filteredCustomers: Customer,
    isAdded: Boolean,
    error: String | undefined;
}

const initialState = {
    customer: {},
    filteredCustomers: [],
    isAdded: false,
    error: undefined
}

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers:{
        customerAdd: (state, action: PayloadAction<Customer>) => {
            state.customer = {
                id: action.payload.id,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                dateOfBbirth: action.payload.dateOfBbirth,
                ipAddress: action.payload.ipAddress,
                gender: action.payload.gender,
                type: action.payload.type,                
            }   
        },

        customerUpdate: (state, action: PayloadAction<Customer>) => {
            state.customer = {
                id: action.payload.id,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                dateOfBbirth: action.payload.dateOfBbirth,
                ipAddress: action.payload.ipAddress,
                gender: action.payload.gender,
                type: action.payload.type,                
            }   
        },

        customerDelete: (state, action: PayloadAction<Customer>) => {
            state.customer = {};  
        },

        customerFind: (state, action: PayloadAction<Customer>) => {
            console.log(action.payload)
            state.filteredCustomers = push(action.payload);
            console.log(state.filteredCustomers)  
        },
    }
});

export default customerSlice.reducer;

function push(payload: Customer): never[] {
    throw new Error("Function not implemented.");
}
