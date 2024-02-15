import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./app.ts";

export interface User {
  firstName: string;
  lastName: string;
  id: string;
  email: string;
}

let user = localStorage.getItem("user");
let isAuthenticated = false;
if (user) {
  isAuthenticated = true;
}

const parsedUser: User | null = user ? JSON.parse(user) : null;
console.log(parsedUser);

interface Authstate {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
}

const initialState: Authstate = {
  isAuthenticated,
  user: parsedUser,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export default authSlice;
export const { addUser } = authSlice.actions;
export const userSelector = (state: RootState) => state.auth;
