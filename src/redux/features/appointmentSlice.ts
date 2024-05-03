import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Appointment } from '../../interfaces/appointment.interface';
// eslint-disable-next-line import/no-cycle
import appointmentService from '../../services/adminapp/adminStoreAppointment';

type InitialState = {
  appointments: Appointment[];
  loading: boolean;
  notify: boolean;
  total_count: number;
  notifyMessage: { text?: string; type?: string };
};

const initialState: InitialState = {
  appointments: [],
  total_count: 0,
  loading: false,
  notify: false,
  notifyMessage: {},
};

export const fetchAppointments = createAsyncThunk(
  'appointment/fetchAppointments',
  async (
    data: {
      tenant: string | any;
      startDate?: string | any;
      endDate?: string | any;
      page?: string | any;
      size?: string | any;
      search?: string | any;
      status?: string | any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await appointmentService.fetchAllAppointments(
        data.tenant,
        data
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const appointmentSlice = createSlice({
  name: 'appointmentSlice',
  initialState,
  reducers: {
    setAppointments: (state, action: PayloadAction<Appointment[]>) => {
      state.appointments = action.payload;
    },
    setNotifyState: (state, action: PayloadAction<boolean>) => {
      state.notify = action.payload;
    },
    showNotifyMessage: (state, action: PayloadAction<any>) => {
      state.notifyMessage = action.payload;
      state.notify = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload?.data.appointments || [];
        state.total_count =
          action.payload?.data?.totalCount ||
          action.payload?.data.appointments?.length ||
          0;
      })
      .addCase(fetchAppointments.rejected, (state, action: any) => {
        state.loading = false;
        if (action.error) {
          state.notifyMessage = {
            text: `Something went wrong. Error: ${action.error.message}`,
            type: 'error',
          };
          state.notify = true;
        }
      });
  },
});

export const { setAppointments, setNotifyState, showNotifyMessage } =
  appointmentSlice.actions;

export default appointmentSlice.reducer;
