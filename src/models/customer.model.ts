import mongoose from "mongoose";
import validator from "validator";
import {
  CustomerDocument,
  CustomerModel,
} from "../interfaces/customer.interface";
import { toJSON } from "./plugins/toJSON.plugin";
import { paginate } from "./plugins/paginate.plugin";
const customerSchema = new mongoose.Schema<CustomerDocument, CustomerModel>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 45,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 45,
    },
    login: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 4,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    userName: {
      type: String,
      required: false,
      trim: false,
    },
    status: {
      type: String,
      required: false,
      trim: false,
    },
    gender: {
      type: String,
      requried: false,
      trim: false,
    },
    dateOfBirth: {
      type: String,
      required: true,
      trim: true,
    },
    ipAddress: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: false,
      trim: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
customerSchema.plugin(toJSON);
customerSchema.plugin(paginate);

// export default Customer
export const Customer = mongoose.model<CustomerDocument, CustomerModel>(
  "Customer",
  customerSchema
);
