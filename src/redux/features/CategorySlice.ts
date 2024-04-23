/* eslint-disable import/no-cycle */

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppCategories } from '../../interfaces/category.interface';
import services from '../../services/adminapp/adminOrders';

type InitialState = {
  categories: AppCategories[];
  loading: boolean;
  notify: boolean;
  notifyMessage: { text?: string; type?: string };
};

const initialState: InitialState = {
  categories: [],
  loading: false,
  notify: false,
  notifyMessage: {},
};

export const fetchCategories = createAsyncThunk(
  'order/fetchCategories',
  async (tenant: string | undefined, { rejectWithValue }) => {
    try {
      const response = await services.OrderCatList(tenant);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const CategorySlice = createSlice({
  name: 'CategorySlice',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<AppCategories[]>) => {
      state.categories = action.payload;
    },
    setNotifyState: (state, action: PayloadAction<boolean>) => {
      state.notify = action.payload;
    },
    showNotifyMessage: (state, action: PayloadAction<any>) => {
      state.notifyMessage = action.payload;
      state.notify = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state, _action) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
      })
      .addCase(fetchCategories.rejected, (state, action: any) => {
        state.loading = false;
        if (action?.payload?.error) {
          state.notifyMessage = {
            text: `Something went wrong. Error: ${action.payload.error} `,
            type: 'error',
          };
        }
      });
  },
});

export const { setCategories, setNotifyState, showNotifyMessage } =
  CategorySlice.actions;

export default CategorySlice.reducer;
