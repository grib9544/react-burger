import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrder } from '../../types';

type TOrderSliceState = {
  orders: IOrder[];
  total: number;
  totalToday: number;
  connected: boolean;
};

const initState: TOrderSliceState = {
  orders: [],
  total: 0,
  totalToday: 0,
  connected: false
};

type UpdateOrdersActions = PayloadAction<{
  orders: IOrder[];
  total: number;
  totalToday: number;
}>;

const orderSlice = createSlice({
  name: 'orders',
  initialState: initState,
  reducers: {
    connectStart: (state) => {
      state.connected = true;
    },
    connectStop: (state) => {
      state.connected = false;
    },
    updateOrders: (state, action: UpdateOrdersActions) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    }
  }
});

export const { connectStart, connectStop, updateOrders } = orderSlice.actions;

export default orderSlice.reducer;
