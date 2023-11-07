import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppState = {
  appState: string;
  items: any;
  logo: any;
};

const initialState: AppState = {
  appState: '',
  items: null,
  logo: null
};

export const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setAppState: (state, action: PayloadAction<string>) => {
      state.appState = action.payload;
    },
    setItemState: (state, action: PayloadAction<any>) => {
      state.items = action.payload;
    },
    setLogo: (state, action: PayloadAction<any>) => {
      state.logo = action.payload;
    }
  },
});

export const { setAppState, setItemState, setLogo } = appStateSlice.actions;

export default appStateSlice.reducer;
