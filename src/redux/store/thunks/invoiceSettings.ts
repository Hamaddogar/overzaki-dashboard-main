import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { resetAllReducers } from './resetSlice';
// import { IInvoiceSettingsRequest } from 'src/types/request/invoiceSettings';
import {
  getRequest,
  endpoints,
  defaultConfig,
  postRequest,
  putRequest,
  deleteRequest,
} from 'src/utils/axios';

export const fetchInvoiceSettingsList = createAsyncThunk('invoiceSettings/fetchList', async () => {
  const response = await getRequest(`${endpoints.invoiceSettings.list}`, defaultConfig());

  return response;
});

export const fetchOneInvoiceSettings = createAsyncThunk(
  'invoiceSettings/fetchOne',
  async (invoiceSettingsId: number) => {
    const response = await getRequest(
      `${endpoints.invoiceSettings.list}/${invoiceSettingsId}`,
      defaultConfig()
    );

    return response.data;
  }
);

export const createInvoiceSettings = createAsyncThunk(
  'invoiceSettings/create',
  async (data: any) => {
    const response = await postRequest(endpoints.invoiceSettings.list, data, defaultConfig());

    return response.data;
  }
);

export const editInvoiceSettings = createAsyncThunk(
  'invoiceSettings/edit',
  async (payload: any) => {
    const response = await putRequest(
      `${endpoints.invoiceSettings.list}`,
      payload,
      defaultConfig()
    );

    return response.data;
  }
);

export const deleteInvoiceSettings = createAsyncThunk(
  'invoiceSettings/delete',
  async (invoiceSettingsId: number) => {
    const response = await deleteRequest(
      `${endpoints.invoiceSettings.list}/${invoiceSettingsId}`,
      defaultConfig()
    );

    return response.data;
  }
);

const invoiceSettingsSlice = createSlice({
  name: 'invoiceSettings',
  initialState: {
    list: [],
    invoiceSettings: null,
    loading: false,
    error: null as string | null,
    status: 'idle',
  },
  reducers: {
    setInvoiceSettings: (state, action: PayloadAction<any>) => {
      state.invoiceSettings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetAllReducers, (state) => {
        // Reset the state for the customers reducer
        state.status = 'idle';
        state.list = []; // Replace with your initial state
      })
      .addCase(fetchInvoiceSettingsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoiceSettingsList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchInvoiceSettingsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(fetchOneInvoiceSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneInvoiceSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.invoiceSettings = action.payload;
      })
      .addCase(fetchOneInvoiceSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(createInvoiceSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInvoiceSettings.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createInvoiceSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(editInvoiceSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editInvoiceSettings.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editInvoiceSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(deleteInvoiceSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInvoiceSettings.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteInvoiceSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      });
  },
});
export const { setInvoiceSettings } = invoiceSettingsSlice.actions;
export default invoiceSettingsSlice.reducer;
