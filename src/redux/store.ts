import { configureStore } from '@reduxjs/toolkit';
import appStateReducer from './features/appStateSlice';
import authStateReducer from './features/authStateSlice';
import driverStateReducer from './features/driverStateSlice';

export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    authState: authStateReducer,
    driverState: driverStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
