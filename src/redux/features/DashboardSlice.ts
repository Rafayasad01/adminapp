import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import dashboardService from '../../services/adminapp/adminDashboard';

interface ServiceData {
  service: string;
  totalAmount: string | null;
}

type InitialState = {
  todayAppointments: number;
  totalAppointments: number;
  completedAppointmentsStats: Array<any>;
  inCompletedAppointmentsStats: Array<any>;
  loading: boolean;
  notify: boolean;
  sales: { completed: any[]; missed: any[]; canceled: any[] };
  notifyMessage: { text?: string; type?: string };
  customers: {
    name: string;
    email: string;
    status: string;
    dateIn: string;
    service: string;
  }[];
  services: ServiceData[];
};

const initialState: InitialState = {
  todayAppointments: 0,
  totalAppointments: 0,
  completedAppointmentsStats: [],
  inCompletedAppointmentsStats: [],
  sales: { completed: [], canceled: [], missed: [] },
  loading: false,
  notify: false,
  notifyMessage: {},
  customers: [],
  services: [],
};

export const fetchDashboardSummary = createAsyncThunk(
  'dashboard/summary',
  async (tenant: string, { rejectWithValue }) => {
    try {
      const response = await dashboardService.getDashboardCount(tenant);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const DashboardSlice = createSlice({
  name: 'DashboardSlice',
  initialState,
  reducers: {
    setTodayAppointments: (state, action: PayloadAction<number>) => {
      state.todayAppointments = action.payload;
    },
    setTotalAppointments: (state, action: PayloadAction<number>) => {
      state.totalAppointments = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
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
      .addCase(fetchDashboardSummary.pending, (state, _action) => {
        state.loading = true;
      })
      .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.todayAppointments = action.payload.data.todayAppointments || 0;
        state.totalAppointments = action.payload.data.totalAppointments || 0;
        state.sales = action.payload.data.sales || {};
        state.services = action.payload.data.topServices || [];
        state.customers = action.payload.data.customers || [];
        state.completedAppointmentsStats =
          action.payload.data.completedAppointmentsStats || [];
        state.inCompletedAppointmentsStats =
          action.payload.data.inCompletedAppointmentsStats || [];
      })
      .addCase(fetchDashboardSummary.rejected, (state, action: any) => {
        state.loading = false;
        if (action?.payload?.error) {
          state.notifyMessage = {
            text: `Something went wrong. Error: ${action.payload.error} `,
            type: 'error',
          };
        }
      });
  },
});

export const {
  setTodayAppointments,
  setLoading,
  setTotalAppointments,
  setNotifyState,
  showNotifyMessage,
} = DashboardSlice.actions;

export default DashboardSlice.reducer;
