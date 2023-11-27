import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { IVouchersRequest } from 'src/types/request/vouchers';
import {
  getRequest,
  endpoints,
  defaultConfig,
  postRequest,
  putRequest,
  deleteRequest,
  IRequest,
} from 'src/utils/axios';

export const fetchVouchersList = createAsyncThunk('voucher/fetchList', async () => {
  const response = await getRequest(`${endpoints.voucher.list}`, defaultConfig);

  return response;
});

export const fetchOneVoucher = createAsyncThunk('voucher/fetchOne', async (voucherId: number) => {
  const response = await getRequest(`${endpoints.voucher.list}/${voucherId}`, defaultConfig);

  return response.data;
});

export const createVoucher = createAsyncThunk('voucher/create', async (data: any) => {
  const response = await postRequest(endpoints.voucher.list, data, defaultConfig);

  return response.data;
});

export const editVoucher = createAsyncThunk(
  'voucher/edit',
  async (payload: { voucherId: number; data: any }) => {
    const { voucherId, data } = payload;
    const response = await putRequest(
      `${endpoints.voucher.list}/${voucherId}`,
      data,
      defaultConfig
    );

    return response.data;
  }
);

export const deleteVoucher = createAsyncThunk('voucher/delete', async (voucherId: number) => {
  const response = await deleteRequest(`${endpoints.voucher.list}/${voucherId}`, defaultConfig);

  return response.data;
});

const voucherSlice = createSlice({
  name: 'voucher',
  initialState: {
    list: [],
    voucher: null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setVoucher: (state, action: PayloadAction<any>) => {
      state.voucher = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchVouchersList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVouchersList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchVouchersList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(fetchOneVoucher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneVoucher.fulfilled, (state, action) => {
        state.loading = false;
        state.voucher = action.payload;
      })
      .addCase(fetchOneVoucher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(createVoucher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVoucher.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createVoucher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(editVoucher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editVoucher.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editVoucher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(deleteVoucher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVoucher.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteVoucher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      });
  },
});
export const { setVoucher } = voucherSlice.actions;
export default voucherSlice.reducer;
