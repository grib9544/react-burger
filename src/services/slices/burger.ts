import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IComposeIngredient, IIngredient, TAppDispatch, TRootState } from '../../types';
import { randomAlphaNumeric } from '../../utils';
import { createOrder, getIngredients, IOrderRes } from '../api';

type TBurgerSliceState = {
  ingredients: {
    items: IIngredient[];
    loading: boolean;
    error: string | null;
  };
  composition: {
    bun: IComposeIngredient | null;
    filling: IComposeIngredient[];
  };
  order: {
    loading: boolean;
    error: string | null;
    orderId: number | null;
  };
  totalCost: number;
  viewedIngredient: IIngredient | null;
};

function calculateTotalCost(burger: TBurgerSliceState['composition']) {
  return burger.filling.reduce((acc, curr) => acc + curr.price, 0) + (burger.bun?.price || 0) * 2;
}

export const fetchIngredientsThunk = createAsyncThunk<IIngredient[]>(
  'burger/fetchIngredients',
  async () => {
    return getIngredients();
  }
);

export const createOrderThunk = createAsyncThunk<
  IOrderRes,
  undefined,
  { state: TRootState; dispatch: TAppDispatch }
>('burger/createOrder', async (_, thunkAPI) => {
  const { composition } = thunkAPI.getState().burger;

  if (!composition.bun?._id) {
    throw Error('Cannot create burger without bun');
  }

  return createOrder([
    composition.bun._id,
    composition.bun._id,
    ...composition.filling.map((ing) => ing._id)
  ]);
});

const initState: TBurgerSliceState = {
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
  totalCost: 0,
  viewedIngredient: null
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState: initState,
  reducers: {
    setIngredient: (state, action: PayloadAction<Pick<IIngredient, '_id'>>) => {
      const ingredient = state.ingredients.items.find((ing) => ing._id === action.payload._id);

      if (!ingredient) {
        return;
      }

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
    },
    swapFillings: (state, action) => {
      const fillingArray = state.composition.filling;

      const currentIndex = fillingArray.findIndex(
        (ing) => ing.composId === action.payload.currentId
      );
      const targetIndex = fillingArray.findIndex((ing) => ing.composId === action.payload.targetId);

      [fillingArray[currentIndex], fillingArray[targetIndex]] = [
        fillingArray[targetIndex],
        fillingArray[currentIndex]
      ];

      state.composition.filling = fillingArray;
    },
    setViewedIngredient: (state, action: PayloadAction<IIngredient>) => {
      state.viewedIngredient = action.payload;
    },
    unsetViewedIngredient: (state) => {
      state.viewedIngredient = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredientsThunk.pending, (state) => {
      state.ingredients.loading = true;
    });
    builder.addCase(fetchIngredientsThunk.fulfilled, (state, action) => {
      state.ingredients.loading = false;
      state.ingredients.items = action.payload;
    });
    builder.addCase(fetchIngredientsThunk.rejected, (state, action) => {
      state.ingredients.loading = false;
      state.ingredients.error = action.error.message || null;
    });
    builder.addCase(createOrderThunk.pending, (state) => {
      state.order.loading = true;
    });
    builder.addCase(createOrderThunk.fulfilled, (state, action) => {
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
    });
    builder.addCase(createOrderThunk.rejected, (state, action) => {
      state.order.loading = false;
      state.order.error = action.error.message || null;
    });
  }
});

export const {
  setIngredient,
  removeIngredient,
  swapFillings,
  setViewedIngredient,
  unsetViewedIngredient
} = burgerSlice.actions;

export default burgerSlice.reducer;
