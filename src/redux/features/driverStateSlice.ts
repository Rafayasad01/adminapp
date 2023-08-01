import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Driver = {
  id: string;
  app_order: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  appOrderDeliveryStatus: string;
  aappUserDriverExt: string;
  licenseNumber: string;
  phone: string;
  status: string;
};

type DriverState = {
  driver: Driver | null;
};

function getDriver() {
  const driver = localStorage.getItem('driver');
  if (driver) {
    return JSON.parse(driver);
  }
  return null;
}

const initialState: DriverState = {
  driver: getDriver(),
};

export const driverStateSlice = createSlice({
  name: 'driverState',
  initialState,
  reducers: {
    addDriver: (state, action: PayloadAction<Driver>) => {
      state.driver = action.payload;
      localStorage.setItem('driver', JSON.stringify(action.payload));
    },
  },
});

export const { addDriver } = driverStateSlice.actions;

export default driverStateSlice.reducer;
