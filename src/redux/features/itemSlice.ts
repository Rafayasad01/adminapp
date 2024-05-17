/*  eslint-disable import/no-cycle */

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppCategoryItems } from '../../interfaces/category.interface';
import ordersService from '../../services/adminapp/adminOrders';

type InitialState = {
  items: AppCategoryItems[];
  loading: boolean;
  notify: boolean;
  notifyMessage: { text?: string; type?: string };
};

const initialState: InitialState = {
  items: [],
  loading: false,
  notify: false,
  notifyMessage: {},
};

export const fetchItemsByCategory = createAsyncThunk(
  'order/fetchItems',
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await ordersService.OrderCatItemList(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const itemSlice = createSlice({
  name: 'itemSlice',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<AppCategoryItems[]>) => {
      state.items = action.payload;
    },
    setNotifyState: (state, action: PayloadAction<boolean>) => {
      state.notify = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemsByCategory.pending, (state, _action) => {
        state.loading = true;
      })
      .addCase(fetchItemsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
      })
      .addCase(fetchItemsByCategory.rejected, (state, action: any) => {
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

export const { setItems, setNotifyState } = itemSlice.actions;

export default itemSlice.reducer;
