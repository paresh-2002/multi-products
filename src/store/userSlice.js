import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
};
const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      return localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("user");
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
