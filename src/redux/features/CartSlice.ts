import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppCategoryItems } from '../../interfaces/category.interface';

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

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<AppCategoryItems[]>) => {
      state.items = action.payload;
    },
    addToCart: (state, action: PayloadAction<AppCategoryItems | any>) => {
      state.items = [...state.items, action.payload];
    },
    quantityIncrement: (state, action?: PayloadAction<string>) => {
      state.items = state.items.map((item) => {
        if (item.id === action?.payload) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
    },
    quantityDecrement: (state, action?: PayloadAction<string>) => {
      state.items = state.items.map((item) => {
        if (item.id === action?.payload) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });
    },
    setNotifyState: (state, action: PayloadAction<boolean>) => {
      state.notify = action.payload;
    },
    showNotifyMessage: (state, action: PayloadAction<any>) => {
      state.notifyMessage = action.payload;
      state.notify = true;
    },
  },
});

export const {
  setCart,
  addToCart,
  quantityIncrement,
  quantityDecrement,
  setNotifyState,
  showNotifyMessage,
} = cartSlice.actions;

export default cartSlice.reducer;
