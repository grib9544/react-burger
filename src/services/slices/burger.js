import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { randomAlphaNumeric } from '../../utils';
import { createOrder, fetchIngredients } from '../api';

function calculateTotalCost(burger) {
  return burger.filling.reduce((acc, curr) => acc + curr.price, 0) + (burger.bun?.price || 0) * 2;
}

export const fetchIngredientsThunk = createAsyncThunk('burger/fetchIngredients', async () => {
  return fetchIngredients();
});

export const createOrderThunk = createAsyncThunk('burger/createOrder', async (_, thunkAPI) => {
  const { composition } = thunkAPI.getState().burger;

  return createOrder([
    composition.bun._id,
    composition.bun._id,
    ...composition.filling.map((ing) => ing._id)
  ]);
});

const burgerSlice = createSlice({
  name: 'burger',
  initialState: {
    ingredients: {
      items: [],
      loading: false,
      error: null
    },
    composition: {
      bun: null,
      filling: []
    },
    order: {
      loading: false,
      error: null,
      orderId: null
    },
    totalCost: 0
  },
  reducers: {
    setIngredient: (state, action) => {
      const ingredient = state.ingredients.items.find((ing) => ing._id === action.payload._id);

      const composId = randomAlphaNumeric();

      if (ingredient.type !== 'bun') {
        state.composition.filling.push({ ...ingredient, composId });
      } else {
        state.composition.bun = { ...ingredient, composId };
      }

      state.totalCost = calculateTotalCost(state.composition);
    },
    removeIngredient: (state, action) => {
      state.composition.filling = state.composition.filling.filter(
        (ing) => ing.composId !== action.payload.composId
      );

      state.totalCost = calculateTotalCost(state.composition);
    }
  },
  extraReducers: {
    [fetchIngredientsThunk.pending]: (state) => {
      state.ingredients.loading = true;
    },
    [fetchIngredientsThunk.fulfilled]: (state, action) => {
      state.ingredients.loading = false;
      state.ingredients.items = action.payload;
    },
    [fetchIngredientsThunk.rejected]: (state, action) => {
      state.ingredients.loading = false;
      state.ingredients.error = action.error.message;
    },
    [createOrderThunk.pending]: (state) => {
      state.order.loading = true;
    },
    [createOrderThunk.fulfilled]: (state, action) => {
      state.order = {
        loading: false,
        error: null,
        orderId: action.payload.orderId
      };

      state.composition = {
        bun: null,
        filling: []
      };

      state.totalCost = 0;
    },
    [createOrderThunk.rejected]: (state, action) => {
      state.order.loading = false;
      state.order.error = action.error.message;
    }
  }
});

export const { setIngredient, removeIngredient } = burgerSlice.actions;

export default burgerSlice.reducer;
