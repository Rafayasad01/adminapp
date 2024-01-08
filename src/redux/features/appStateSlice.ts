import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// type AppUserItems = {
//   UserItems: {
//     employeeLimit: any;
//   };
// };

type AppUserLogo = {
  logo: string;
};

type AppState = {
  UserItems: any;
  logo: AppUserLogo | null;
};

const initialState: AppState = {
  UserItems: {
    employeeLimit: 0,
  },
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
    setEmployeeLimit: (state, action: PayloadAction<any>) => {
      state.UserItems = {
        ...state.UserItems,
        employeeLimit: Number(action.payload),
      };
    },
  },
});

export const { setItemState, setLogo, setEmployeeLimit } =
  appStateSlice.actions;

export default appStateSlice.reducer;
