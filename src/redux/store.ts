import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appStateReducer from './features/appStateSlice';
import authStateReducer from './features/authStateSlice';
import rolePermissionStateReducer from './features/permissionsStateSlice';

const persistConfig = {
  key: 'root',
  storage,
};

export const store = configureStore({
  reducer: {
    appState: persistReducer<any, any>(persistConfig, appStateReducer),
    authState: authStateReducer,
    roleState: persistReducer<any, any>(
      persistConfig,
      rolePermissionStateReducer
    ),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
