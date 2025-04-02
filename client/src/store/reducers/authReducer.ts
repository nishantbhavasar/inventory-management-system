import { createSlice } from "@reduxjs/toolkit";

export interface User {
  id: number;
  name: string;
  email: string;
  access_token: string;
}

export interface AuthState {
  isLogin: boolean;
  user: null | User;
}

const initialState: AuthState = {
  isLogin: false,
  user: null,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLogin = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isLogin = false;
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authReducer.actions;

export default authReducer.reducer;
