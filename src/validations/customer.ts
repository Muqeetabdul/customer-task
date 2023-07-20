import Joi from "joi";
import { objectId } from "./custom";

const createCustomer = {
  body: Joi.object().keys({
    firstName: Joi.string().required().trim().min(3).max(45),
    lastName: Joi.string().required().trim().min(3).max(45),
    email: Joi.string().required().trim().lowercase(),
    dateOfBirth: Joi.string().required().trim(),
    ipAddress: Joi.string().required().trim(),
    status: Joi.string().optional(),
    gender: Joi.string().optional(),   
    type: Joi.string().optional(),
  }),    
};    

const getAllCustomers = {
  query: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string(),
    dateOfBirth: Joi.string(),
    ipAddress: Joi.string(),
    status: Joi.string(),
    gender: Joi.string(),   
    type: Joi.string(),
  }),
}

const getCustomer = {
  params: Joi.object().keys({
    customerId: Joi.string().custom(objectId),
  }),
};

const updateCustomer = {
  params: Joi.object().keys({
    customerId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      firstName: Joi.string().required().trim().min(3).max(45),
      lastName: Joi.string().required().trim().min(3).max(45),
      email: Joi.string().required().trim().lowercase(),
      dateOfBirth: Joi.string().required().trim(),
      ipAddress: Joi.string().required().trim(),
      status: Joi.string().optional(),
      gender: Joi.string().optional(),
      type: Joi.string().optional(),
    })
    .min(1),
};

const deleteCustomer = {
  params: Joi.object().keys({
    customerId: Joi.required().custom(objectId),
  }),
};

export { createCustomer, getAllCustomers, getCustomer, updateCustomer, deleteCustomer };
