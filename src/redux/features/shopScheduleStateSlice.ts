import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateRange, WorkDay } from '../../interfaces/shop-schedule.interface';

type InitialState = {
  workDays: WorkDay[];
  offDays: DateRange[];
};

const initialState: InitialState = {
  workDays: [],
  offDays: [],
};

export const shopScheduleStateSlice = createSlice({
  name: 'shopScheduleStateSlice',
  initialState,
  reducers: {
    setWordDays: (state, action: PayloadAction<any>) => {
      state.workDays = action.payload;
    },
    setOffDays: (state, action: PayloadAction<any>) => {
      state.offDays = action.payload;
    },
  },
});

export const { setWordDays, setOffDays } = shopScheduleStateSlice.actions;

export default shopScheduleStateSlice.reducer;
