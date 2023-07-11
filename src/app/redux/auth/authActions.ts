import * as serverRequest from "./authAPI";
import { authSlice } from "./authSlice";
import { AppDispatch } from "../store";
import { LoginRequest } from "../api/interfaces";
import { Login, User } from "../api/interfaces";
import { toast } from "react-hot-toast";
const { actions } = authSlice;

export const logIn =
  (email: string, password: string) => (dispatch: AppDispatch) => {
    dispatch(actions.startCall);
    const loginRequest: LoginRequest = {
      email,
      password,
    };
    return serverRequest
      .logIn(loginRequest)
      .then((response) => {
        const loginData: Login = {
          user: {
            id: response.data.id,
            email: response.data.email,
            username: response.data.username,
            password: undefined,
          },
          token: response.data.token,
        };
        dispatch(actions.loggedIn(loginData));
      })
      .catch((error) => {
        dispatch(actions.catchError({ error: error.response.data.error }));
      });
  };
export const Who_Am_i = () => (dispatch: AppDispatch) => {
  dispatch(actions.startCall);
  return serverRequest
    .who_am_i()
    .then((response) => {
      const user: User = {
        id: response.data.id,
        email: response.data.email,
        password: undefined,
        username: response.data.username,
      };
      dispatch(actions.whoAmI(user));
    })
    .catch((error) => {
      console.log(error.response, "========");
      dispatch(actions.catchError({ error: error.response.data.error }));
      toast.error(error.response.data.error);
    });
};

export const logout = () => (dispatch: AppDispatch) => {
  dispatch(actions.loggedOut());
};
