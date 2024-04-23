/* eslint-disable import/no-cycle */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appStateReducer from './features/appStateSlice';
import authStateReducer from './features/authStateSlice';
import rolePermissionStateReducer from './features/permissionsStateSlice';
import shopScheduleStateSliceReducer from './features/shopScheduleStateSlice';
import CategorySliceReducer from './features/CategorySlice';
import ItemSliceReducer from './features/ItemSlice';
import CartSliceReducer from './features/CartSlice';

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
    categoryState: CategorySliceReducer,
    itemState: ItemSliceReducer,
    cartState: CartSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
