import { LoginRequest } from "../api/interfaces";
import axios, { AxiosResponse } from "axios";
export const LONGIN_URL = "/v1/auth/login";
export const LOGOUT_URL = "api/auth/logout";
export const WHO_AM_I = "/v1/auth/who-am-i";

export const logIn = ({email, password}: any): Promise<AxiosResponse<any>> => {
  return axios.post(LONGIN_URL, { email, password });
};

export const logOut = (): Promise<AxiosResponse<any>> => {
  return axios.post(LOGOUT_URL);
};
export const who_am_i = (): Promise<AxiosResponse<any>> => {
  return axios.get(WHO_AM_I);
};
