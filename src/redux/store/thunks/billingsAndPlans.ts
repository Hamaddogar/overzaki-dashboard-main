import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { IBillingsAndPlansRequest } from 'src/types/request/billingsAndPlans';
import {
  getRequest,
  endpoints,
  defaultConfig,
  postRequest,
  putRequest,
  deleteRequest,
} from 'src/utils/axios';

export const fetchBillingsAndPlanssList = createAsyncThunk(
  'billingsAndPlans/fetchList',
  async () => {
    const response = await getRequest(`${endpoints.billingsAndPlans.list}`, defaultConfig);

    return response;
  }
);

export const fetchOneBillingsAndPlans = createAsyncThunk(
  'billingsAndPlans/fetchOne',
  async (billingsAndPlansId: number) => {
    const response = await getRequest(
      `${endpoints.billingsAndPlans.list}/${billingsAndPlansId}`,
      defaultConfig
    );

    return response.data;
  }
);

export const createBillingsAndPlans = createAsyncThunk(
  'billingsAndPlans/create',
  async (data: any) => {
    const response = await postRequest(endpoints.billingsAndPlans.list, data, defaultConfig);

    return response.data;
  }
);

export const editBillingsAndPlans = createAsyncThunk(
  'billingsAndPlans/edit',
  async (payload: { billingsAndPlansId: number; data: any }) => {
    const { billingsAndPlansId, data } = payload;
    const response = await putRequest(
      `${endpoints.billingsAndPlans.list}/${billingsAndPlansId}`,
      data,
      defaultConfig
    );

    return response.data;
  }
);

export const deleteBillingsAndPlans = createAsyncThunk(
  'billingsAndPlans/delete',
  async (billingsAndPlansId: number) => {
    const response = await deleteRequest(
      `${endpoints.billingsAndPlans.list}/${billingsAndPlansId}`,
      defaultConfig
    );

    return response.data;
  }
);

const billingsAndPlansSlice = createSlice({
  name: 'billingsAndPlans',
  initialState: {
    list: [],
    billingsAndPlans: null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setBillingsAndPlans: (state, action: PayloadAction<any>) => {
      state.billingsAndPlans = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchBillingsAndPlanssList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBillingsAndPlanssList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchBillingsAndPlanssList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(fetchOneBillingsAndPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneBillingsAndPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.billingsAndPlans = action.payload;
      })
      .addCase(fetchOneBillingsAndPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(createBillingsAndPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBillingsAndPlans.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createBillingsAndPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(editBillingsAndPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editBillingsAndPlans.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editBillingsAndPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(deleteBillingsAndPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBillingsAndPlans.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteBillingsAndPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      });
  },
});
export const { setBillingsAndPlans } = billingsAndPlansSlice.actions;
export default billingsAndPlansSlice.reducer;
