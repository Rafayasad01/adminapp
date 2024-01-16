import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setThemeColor } from '../../utils/setThemeColor';

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
};

function getUser() {
  const stringifiedUser = localStorage.getItem('user');
  if (stringifiedUser) {
    const user = JSON.parse(stringifiedUser);
    setThemeColor(user.tenantConfig);
    return user;
  }
  return null;
}

const initialState: AuthState = {
  user: getUser(),
};

export const authStateSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      setThemeColor(state.user?.tenantConfig);
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    setTenantConfig: (state, action: PayloadAction<any>) => {
      if (!state.user) {
        return;
      }
      state.user.tenantConfig = action.payload;
      setThemeColor(action.payload);
      localStorage.setItem('user', JSON.stringify(state.user));
    },
  },
});

export const { login, logout, setTenantConfig } = authStateSlice.actions;

export default authStateSlice.reducer;
