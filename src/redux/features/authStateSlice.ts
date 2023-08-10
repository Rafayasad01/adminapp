import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  tenant: string;
  isActive: boolean;
  isSuperAdmin: boolean;
  token: string;
};

type AuthState = {
  user: User | null;
};

function getUser() {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
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
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    }
  },
});

export const { login, logout } = authStateSlice.actions;

export default authStateSlice.reducer;
