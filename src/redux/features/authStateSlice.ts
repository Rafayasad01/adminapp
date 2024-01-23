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
  token: string;
  avatar: string;
  branchLimit: number;
  employeeLimit: number;
  userLimit: number;
};

type AuthState = {
  user: User | null;
  theme: null;
};

function getUser() {
  const user = getItem<any>('USER');
  if (user) {
    setThemeColor(user.tenantConfig);
  }
  return user;
}

const initialState: AuthState = {
  user: getUser(),
  theme: getItem<any>('THEME'),
};

export const authStateSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      setThemeColor(state.user?.tenantConfig);
      setItem('USER', action.payload);
    },
    logout: (state) => {
      state.user = null;
      removeItem('USER');
    },
    setTenantConfig: (state, action: PayloadAction<any>) => {
      state.theme = action.payload;
      setThemeColor(action.payload);
      setItem('THEME', state.theme);
    },
  },
});

export const { login, logout, setTenantConfig } = authStateSlice.actions;

export default authStateSlice.reducer;
