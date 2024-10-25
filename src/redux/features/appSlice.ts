import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setItem } from '../../utils/storage';

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
  branch: any;
};

const initialState: AppState = {
  UserItems: {
    employeeLimit: 0,
  },
  logo: null,
  profileAvatar: null,
  branch: null,
};

export const appSlice = createSlice({
  name: 'appSlice',
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
    setRemoveItemState: (state) => {
      state.UserItems = null;
    },
    setTenantConfig: (state, action: PayloadAction<any>) => {
      state.UserItems = {
        ...state.UserItems,
        tenantConfig: { ...state.UserItems.tenantConfig, ...action.payload },
      };
      setItem('TENANT_CONFIG', state.UserItems);
    },
    setOfficeTimeOut: (state, action: PayloadAction<any>) => {
      state.UserItems = {
        ...state.UserItems,
        tenantConfig: { ...state.UserItems.tenantConfig, ...action.payload },
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
    setBranchData: (state, action: PayloadAction<any>) => {
      state.branch = action.payload;
      setItem('BRANCH_DATA', action.payload);
    },
    setTempBranchData: (state, action: PayloadAction<any>) => {
      state.branch = action.payload;
      setItem('TEMP_BRANCH_DATA', action.payload);
    },
  },
});

export const {
  setItemState,
  setRemoveItemState,
  setLogo,
  setEmployeeLimit,
  setTenantConfig,
  setProfileAvatar,
  setOfficeTimeOut,
  setBranchData,
  setTempBranchData,
} = appSlice.actions;

export default appSlice.reducer;
