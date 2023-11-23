import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getRequest,
  endpoints,
  defaultConfig,
  postRequest,
  putRequest,
  deleteRequest,
  IRequest,
} from 'src/utils/axios';

export interface IAnalyticsForm extends IRequest {
  name: string;
  balance: number;
  // examples
}
export const fetchAnalyticssCustomer = createAsyncThunk('analytics/fetchCustomer', async () => {

  const response = await getRequest(endpoints.analytic.customers, defaultConfig);

  return response;
});

export const fetchAnalyticsSummary = createAsyncThunk(
  'analytics/fetchSummary',
  async (analyticsId: number) => {
    const response = await getRequest(`${endpoints.analytic.summary}/${analyticsId}`, defaultConfig);

    return response.data;
  }
);

export const fetchAnalyticsVouchers= createAsyncThunk('analytics/fetchVouchers', async (data: IAnalyticsForm) => {
  const response = await postRequest(endpoints.analytic.vouchers, data, defaultConfig);

  return response.data;
});



const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    list: [],
    analytics: null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setAnalytics: (state, action: PayloadAction<any>) => {
      state.analytics = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchAnalyticssCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalyticssCustomer.fulfilled, (state, action) => {

        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAnalyticssCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(fetchAnalyticsSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalyticsSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
      })
      .addCase(fetchAnalyticsSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(fetchAnalyticsVouchers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalyticsVouchers.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchAnalyticsVouchers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })


  },
});
export const { setAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer;
