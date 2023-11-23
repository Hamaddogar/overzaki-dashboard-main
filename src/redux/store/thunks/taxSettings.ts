import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ITaxSettingsRequest } from 'src/types/request/taxSettings';
import {
  getRequest,
  endpoints,
  defaultConfig,
  postRequest,
  putRequest,
  deleteRequest,
} from 'src/utils/axios';


export const fetchTaxSettingssList = createAsyncThunk('taxSettingss/fetchList', async () => {
  const response = await getRequest(endpoints.taxSettings.list, defaultConfig);

  return response.data;
});

export const fetchOneTaxSettings = createAsyncThunk(
  'taxSettingss/fetchOne',
  async (taxSettingsId: number) => {
    const response = await getRequest(`${endpoints.taxSettings.list}/${taxSettingsId}`, defaultConfig);

    return response.data;
  }
);

export const createTaxSettings = createAsyncThunk('taxSettingss/create', async (data: ITaxSettingsRequest) => {
  const response = await postRequest(endpoints.taxSettings.list, data, defaultConfig);

  return response.data;
});

export const editTaxSettings = createAsyncThunk(
  'taxSettingss/edit',
  async (payload : {taxSettingsId: number, data: ITaxSettingsRequest}) => {
    const { taxSettingsId, data} = payload
    const response = await putRequest(
      `${endpoints.taxSettings.list}/${taxSettingsId}`,
      data,
      defaultConfig
    );

    return response.data;
  }
);

export const deleteTaxSettings = createAsyncThunk('taxSettingss/delete', async (taxSettingsId: number) => {
  const response = await deleteRequest(`${endpoints.taxSettings.list}/${taxSettingsId}`, defaultConfig);

  return response.data;
});

const taxSettingssSlice = createSlice({
  name: 'taxSettingss',
  initialState: {
    list: [],
    taxSettings: null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setTaxSettings: (state, action: PayloadAction<any>) => {
      state.taxSettings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchTaxSettingssList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaxSettingssList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTaxSettingssList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(fetchOneTaxSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneTaxSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.taxSettings = action.payload;
      })
      .addCase(fetchOneTaxSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(createTaxSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTaxSettings.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createTaxSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(editTaxSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTaxSettings.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editTaxSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(deleteTaxSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTaxSettings.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteTaxSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })
  },
});
export const { setTaxSettings } = taxSettingssSlice.actions;
export default taxSettingssSlice.reducer;
