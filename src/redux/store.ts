import { configureStore } from '@reduxjs/toolkit';
import appStateReducer from './features/appStateSlice';
import authStateReducer from './features/authStateSlice';

export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    authState: authStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
