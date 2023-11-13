import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppUserItems = {
  UserItems: any;
};

type AppUserLogo = {
  logo: string;
};

type AppState = {
  UserItems: AppUserItems | null;
  logo: AppUserLogo | null;
};

const initialState: AppState = {
  UserItems: null,
  logo: null,
};

export const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    // setAppState: (state, action: PayloadAction<string>) => {
    //   state.appState = JSON.parse(JSON.stringify(action.payload));
    // },
    setItemState: (state, action: PayloadAction<any>) => {
      state.UserItems = JSON.parse(JSON.stringify(action.payload));
    },
    setLogo: (state, action: PayloadAction<any>) => {
      state.logo = JSON.parse(JSON.stringify(action.payload));
    },
  },
});

export const { setItemState, setLogo } = appStateSlice.actions;

export default appStateSlice.reducer;
