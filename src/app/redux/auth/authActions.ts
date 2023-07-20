import * as serverRequest from "./authAPI";
import { authSlice } from "./authSlice";
import { AppDispatch } from "../store";
import { Login, User } from "../api/interfaces";
import { toast } from "react-hot-toast";
const { actions } = authSlice;

export const logIn =
  (email: string, password: string) => (dispatch: AppDispatch) => {
    dispatch(actions.startCall);
    return serverRequest
      .logIn({ email, password })
      .then((response) => {
        const loginData: Login = {
          user: {
            id: response.data.user.id,
            email: response.data.user.email,
            username: response.data.user.name,
            password: undefined,
          },
          token: response.data.tokens.access.token,
        };
        console.log(response);
        dispatch(actions.loggedIn(loginData));
        toast(`Welcome! ${loginData.user.username}`, {
          icon: "👏",
        });
      })
      .catch((error) => {
        dispatch(actions.catchError({ error: error.response.data.error }));
        toast.error(error.response.data.error);
      });
  };

export const Who_Am_i = () => (dispatch: AppDispatch) => {
  dispatch(actions.startCall);
  return serverRequest
    .who_am_i()
    .then((response) => {
      console.log(response, "response -=-=-=-=-=--=--=-=--=-=-");
      const user: User = {
        id: response.data.id,
        email: response.data.email,
        password: undefined,
        username: response.data.username,
      };
      dispatch(actions.whoAmI(user));
    })
    .catch((error) => {
      dispatch(actions.catchError({ error: error.response.data.error }));
      toast.error(error.response.data.error);
    });
};

export const logout = () => (dispatch: AppDispatch) => {
  dispatch(actions.loggedOut());
};
