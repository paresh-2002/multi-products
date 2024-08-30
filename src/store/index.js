import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./itemsSlice";
import fetchStatusSlice from "./fetchStatusSlice";
import orderSlice from "./orderSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    items: itemsSlice.reducer,
    fetchStatus: fetchStatusSlice.reducer,
    order: orderSlice.reducer,
    user: userSlice.reducer,
  },
});


export default store;
