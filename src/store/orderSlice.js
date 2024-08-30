import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'order',
    initialState:[],
    reducers:{
        addToOrder: (state, action) => {
            state.push(action.payload);
           
          },
          removeFromOrder: (state, action) => {
            return state.filter((itemId) => itemId !== action.payload);
          },
          setOrders: (state, action) => {
            console.log(action.payload);
            return action.payload;
          },
        },
      })
      
      export const OrderActions = orderSlice.actions;
      
export default orderSlice