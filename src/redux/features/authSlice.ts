import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import setThemeColor from '../../utils/setThemeColor';
import { getItem, removeItem, setItem } from '../../utils/storage';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  tenant: string;
  tenantConfig: any;
  isActive: boolean;
  isSuperAdmin: boolean;
  avatar: string;
  branchLimit: number;
  employeeLimit: number;
  userLimit: number;
  anonAppUser: string;
};

type ShopTenantDetails = {
  tenant: string;
  tenantName: string;
  maxEmployeeLimit: string;
  branchLimit: string;
};

interface SystemConfig {
  createdDate: string;
  domain: string;
  id: string;
  logoffImage: string;
  tenant: string;
  shopName: string;
  shopLogo: string;
}

type AuthState = {
  user: User | null;
  theme: null;
  shopTenantDetails: ShopTenantDetails | null;
  systemConfig: SystemConfig | null;
};

function getUser() {
  const user = getItem<any>('USER');
  return user;
}

function getTheme() {
  const theme = getItem<any>('THEME');
  if (theme) {
    setThemeColor(theme);
  }
  return theme;
}

const initialState: AuthState = {
  user: getUser(),
  theme: getTheme(),
  shopTenantDetails: getItem<any>('SHOP_TENANT'),
  systemConfig: getItem<any>('SYSTEM_CONFIG'),
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      setItem('USER', action.payload);
    },
    logout: (state) => {
      state.user = null;
      removeItem('USER');
    },
    setShopAdminTenant: (state, action: PayloadAction<any>) => {
      state.shopTenantDetails = action.payload;
      setItem('SHOP_TENANT', action.payload);
    },
    setTheme: (state, action: PayloadAction<any>) => {
      state.theme = action.payload;
      setThemeColor(action.payload);
      setItem('THEME', state.theme);
    },
    setSystemConfig: (state, action: PayloadAction<any>) => {
      state.systemConfig = action.payload;
      setItem('SYSTEM_CONFIG', state.systemConfig);
    },
  },
});

export const { login, logout, setTheme, setSystemConfig, setShopAdminTenant } =
  authSlice.actions;

export default authSlice.reducer;
