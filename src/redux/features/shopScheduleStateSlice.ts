/* eslint-disable import/no-cycle */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateRange, WorkDay } from '../../interfaces/shop-schedule.interface';
import shopScheduleService from '../../services/adminapp/adminShopSchedule';
import { convertKeysToDayJS } from '../../utils/helper';

type InitialState = {
  workDays: WorkDay[];
  offDays: DateRange[];
  offDaysForWeek: DateRange[];
  dateForWeek?: string;
  date?: string;
  loading: boolean;
  postLoading: boolean;
  notify: boolean;
  notifyMessage: { text?: string; type?: string };
};

const initialState: InitialState = {
  offDaysForWeek: [],
  workDays: [],
  offDays: [],
  loading: true,
  postLoading: false,
  notify: false,
  notifyMessage: {},
};

export const fetchSchedule = createAsyncThunk(
  'setting/get_schedule',
  async (
    data: { tenant: string | any; date: string; forWeek?: boolean },
    { rejectWithValue }
  ) => {
    const { tenant, date } = data;
    try {
      const response = await shopScheduleService.getShopScheduleService(
        tenant,
        date
      );

      if (data.forWeek) {
        return { ...response.data, forWeek: true };
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const setScheduleThunk = createAsyncThunk(
  'setting/set_schedule',
  async (data: { tenant: string | any; body: object }, { rejectWithValue }) => {
    const { tenant, body } = data;
    try {
      const response = await shopScheduleService.setShopScheduleService(
        tenant,
        body
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const shopScheduleSlice = createSlice({
  name: 'shopScheduleSlice',
  initialState,
  reducers: {
    setWordDays: (state, action: PayloadAction<any>) => {
      state.workDays = action.payload;
    },
    setOffDays: (state, action: PayloadAction<any>) => {
      state.offDays = action.payload;
    },
    setScheduleMonthDate: (state, action: PayloadAction<any>) => {
      state.date = action.payload;
    },
    setScheduleMonthDateForWeek: (state, action: PayloadAction<any>) => {
      state.dateForWeek = action.payload;
    },
    setShopScheduleLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setNotifyScheduleError: (state, action: PayloadAction<boolean>) => {
      state.notify = action.payload;
    },
    setNotifyMessageError: (
      state,
      action: PayloadAction<{ text?: string; type?: string }>
    ) => {
      state.notify = true;
      state.notifyMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedule.pending, (state, _action) => {
        state.loading = true;
      })
      .addCase(fetchSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.workDays = convertKeysToDayJS(action.payload.data.workDays, [
          'openTime',
          'breakTime',
          'closeTime',
          'breakOffTime',
        ]);
        if (action.payload.forWeek) {
          state.offDaysForWeek = action.payload.data.eventDays.map(
            (x: any | DateRange) => ({
              ...x,
              key: x?.event,
            })
          );
        } else {
          state.offDays = action.payload.data.eventDays.map(
            (x: any | DateRange) => ({
              ...x,
              key: x?.event,
            })
          );
        }
      })
      .addCase(fetchSchedule.rejected, (state, action: any) => {
        state.workDays = [];
        state.offDays = [];
        state.loading = false;
        if (action?.payload?.error) {
          state.notifyMessage = {
            text: `Something went wrong. Error: ${action.payload.error} `,
            type: 'error',
          };
          state.notify = true;
        }
      })
      .addCase(setScheduleThunk.pending, (state) => {
        state.postLoading = true;
      })
      .addCase(setScheduleThunk.fulfilled, (state, action) => {
        state.workDays = convertKeysToDayJS(action.payload.data.workDays, [
          'openTime',
          'breakTime',
          'closeTime',
          'breakOffTime',
        ]);
        state.offDays = action.payload.data.eventDays.map(
          (x: any | DateRange) => ({
            ...x,
            key: x?.event,
          })
        );
        state.postLoading = false;
        if (action?.payload?.message) {
          state.notifyMessage = {
            text: action?.payload?.message,
            type: 'success',
          };
          state.notify = true;
        }
      })
      .addCase(setScheduleThunk.rejected, (state, action: any) => {
        state.postLoading = false;
        if (action?.payload?.error) {
          state.notifyMessage = {
            text: `Something went wrong. Error: ${action.payload.error} `,
            type: 'error',
          };
          state.notify = true;
        }
      });
  },
});

export const {
  setWordDays,
  setOffDays,
  setScheduleMonthDate,
  setScheduleMonthDateForWeek,
  setNotifyScheduleError,
  setNotifyMessageError,
} = shopScheduleSlice.actions;

export default shopScheduleSlice.reducer;
