import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  isActive: boolean;
  isSuperAdmin: boolean;
  token: string;
};

type AuthState = {
  user: User | null;
};

const initialState: AuthState = {
  user: null,
};

export const authStateSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    authLogin: (state) => {
      const user = localStorage.getItem('user');
      if (user) {
        state.user = JSON.parse(user);
      }
    },
  },
});

export const { login, logout, authLogin } = authStateSlice.actions;

export default authStateSlice.reducer;
