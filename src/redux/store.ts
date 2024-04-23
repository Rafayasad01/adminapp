/* eslint-disable import/no-cycle */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appStateReducer from './features/appSlice';
import authStateReducer from './features/authSlice';
import cartSliceReducer from './features/cartSlice';
import categorySliceReducer from './features/categorySlice';
import itemSliceReducer from './features/itemSlice';
import rolePermissionStateReducer from './features/permissionsStateSlice';
import shopScheduleStateSliceReducer from './features/shopScheduleStateSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  appState: appStateReducer,
  roleState: rolePermissionStateReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    persistedReducer,
    // roleState: persistReducer<any, any>(
    //   persistConfig,
    //   rolePermissionStateReducer
    // ),
    // appState: persistReducer<any, any>(persistConfig, appStateReducer),
    authState: authStateReducer,
    scheduleState: shopScheduleStateSliceReducer,
    categoryState: categorySliceReducer,
    itemState: itemSliceReducer,
    cartState: cartSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
