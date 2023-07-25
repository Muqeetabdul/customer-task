import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Login, User } from "../api/interfaces";

export interface CallType {
  list: String;
  action: String;
}

export const callTypes: CallType = {
  list: "list",
  action: "action",
};

export interface AuthState {
  user: User | undefined;
  isLoggedIn: boolean;
  loading: boolean;
  error: String | undefined;
}

const initialState: AuthState = {
  user: undefined,
  isLoggedIn: false,
  loading: false,
  error: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn: (state, action: PayloadAction<Login>) => {
      // state.user = action.payload;
      state.isLoggedIn = true;
      state.user = {
        id: action.payload.user.id,
        name: action.payload.user.name,
        email: action.payload.user.email,
        password: undefined,
      };
      if (action.payload.token) {
        window.localStorage.setItem("TOKEN", `${action.payload.token}`);
      }
    },
    whoAmI: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    loggedOut: (state, action: PayloadAction) => {
      state.user = undefined;
      state.isLoggedIn = false;
      window.localStorage.setItem("TOKEN", "");
    },
    startCall: (state, action: PayloadAction<{ callType: String }>) => {
      if (action.payload.callType === callTypes.action) {
        state.loading = true;
      }
    },
    catchError: (state, action: PayloadAction<{ error: String }>) => {
      state.error = action.payload.error;
      state.loading = false;
    },
  },
});

export default authSlice.reducer;
