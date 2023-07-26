import Joi from "joi";
import { objectId } from "./custom";

const createCustomer = {
  body: Joi.object().keys({
    firstName: Joi.string().required().trim().min(3).max(45),
    lastName: Joi.string().required().trim().min(3).max(45),
    login: Joi.string().required().trim().min(4).max(4),
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
    search: Joi.string().optional().trim().allow(''),
    type: Joi.string().optional().trim(),
    status: Joi.string().optional().trim(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

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
      id: Joi.string().custom(objectId),
      firstName: Joi.string().required().trim().min(3).max(45),
      lastName: Joi.string().required().trim().min(3).max(45),
      login: Joi.string().required().trim().min(4).max(4),
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

export {
  createCustomer,
  getAllCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};
