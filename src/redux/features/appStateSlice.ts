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
  shopItems: any;
};

const initialState: AppState = {
  UserItems: {
    employeeLimit: 0,
  },
  logo: null,
  profileAvatar: null,
  shopItems: null,
};

export const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setShopTenantState: (state, action: PayloadAction<any>) => {
      state.shopItems = {
        ...state.shopItems,
        ...action.payload,
      };
      setItem('SHOP_TENANT', state.shopItems);
    },
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
  setRemoveItemState,
  setLogo,
  setEmployeeLimit,
  setTenantConfig,
  setProfileAvatar,
  setShopTenantState,
} = appStateSlice.actions;

export default appStateSlice.reducer;
