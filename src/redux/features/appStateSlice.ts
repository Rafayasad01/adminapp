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
  profileAvatar: string | any;
};

const initialState: AppState = {
  UserItems: {
    employeeLimit: 0,
  },
  logo: null,
  profileAvatar: null,
};

export const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    // setAppState: (state, action: PayloadAction<string>) => {
    //   state.appState = JSON.parse(JSON.stringify(action.payload));
    // },
    setItemState: (state, action: PayloadAction<any>) => {
      state.UserItems = {
        ...state.UserItems,
        ...action.payload,
      };
    },
    setTenantConfig: (state, action: PayloadAction<any>) => {
      state.UserItems = {
        ...state.UserItems,
        tenantConfig: action.payload,
      };
    },
    setLogo: (state, action: PayloadAction<any>) => {
      state.logo = JSON.parse(JSON.stringify(action.payload));
    },
    setProfileAvatar: (state, action: PayloadAction<any>) => {
      state.profileAvatar = JSON.parse(JSON.stringify(action.payload));
    },
    setEmployeeLimit: (state, action: PayloadAction<any>) => {
      state.UserItems = {
        ...state.UserItems,
        employeeLimit: Number(action.payload),
      };
    },
  },
});

export const {
  setItemState,
  setLogo,
  setEmployeeLimit,
  setTenantConfig,
  setProfileAvatar,
} = appStateSlice.actions;

export default appStateSlice.reducer;
