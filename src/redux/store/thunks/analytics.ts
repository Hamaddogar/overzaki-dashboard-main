import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { resetAllReducers } from './resetSlice';
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
export const fetchAnalyticsGlobal = createAsyncThunk('analytics/fetchGlobal', async () => {
  const response = await getRequest(endpoints.analytic.global, defaultConfig());

  return response;
});
export const fetchChartData = createAsyncThunk('analytics/fetchChartData', async () => {
  const response = await getRequest(endpoints.analytic.chart, defaultConfig());

  return response;
});
export const fetchAnalyticsOrder = createAsyncThunk('analytics/fetchOrder', async () => {
  const response = await getRequest(endpoints.analytic.order, defaultConfig());

  return response;
});
export const fetchBestSellingItems = createAsyncThunk(
  'analytics/fetchBestSellingItem',
  async () => {
    const response = await getRequest(endpoints.analytic.bestSellingItems, defaultConfig());

    return response;
  }
);
export const fetchBestSellingCategories = createAsyncThunk(
  'analytics/fetchBestSellingCategories',
  async () => {
    const response = await getRequest(endpoints.analytic.bestSellingCategories, defaultConfig());

    return response;
  }
);
export const fetchBestSellingBranches = createAsyncThunk(
  'analytics/fetchBestSellingBranches',
  async () => {
    const response = await getRequest(endpoints.analytic.bestSellingBranches, defaultConfig());

    return response;
  }
);

// export const fetchAnalyticsSummary = createAsyncThunk(
//   'analytics/fetchSummary',
//   async (analyticsId: number) => {
//     const response = await getRequest(
//       `${endpoints.analytic.summary}/${analyticsId}`,
//       defaultConfig()
//     );

//     return response.data;
//   }
// );

// export const fetchAnalyticsVouchers = createAsyncThunk(
//   'analytics/fetchVouchers',
//   async (data: IAnalyticsForm) => {
//     const response = await postRequest(endpoints.analytic.vouchers, data, defaultConfig());

//     return response.data;
//   }
// );

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    list: [],
    analytics: null,
    loading: false,
    error: null as string | null,
    status: 'idle',
  },
  reducers: {
    setAnalytics: (state, action: PayloadAction<any>) => {
      state.analytics = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(resetAllReducers, (state) => {
        // Reset the state for the customers reducer
        state.status = 'idle';
        state.list = []; // Replace with your initial state
      })
      .addCase(fetchAnalyticsGlobal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalyticsGlobal.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAnalyticsGlobal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(fetchAnalyticsOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalyticsOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
      })
      .addCase(fetchAnalyticsOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })
      .addCase(fetchBestSellingItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBestSellingItems.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
      })
      .addCase(fetchBestSellingItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })
      .addCase(fetchBestSellingCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBestSellingCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
      })
      .addCase(fetchBestSellingCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })
      .addCase(fetchBestSellingBranches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBestSellingBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
      })
      .addCase(fetchBestSellingBranches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })
      .addCase(fetchChartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      });

    // .addCase(fetchAnalyticsVouchers.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(fetchAnalyticsVouchers.fulfilled, (state) => {
    //   state.loading = false;
    // })
    // .addCase(fetchAnalyticsVouchers.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message !== undefined ? action.error.message : null;
    // });
  },
});
export const { setAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer;
