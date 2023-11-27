import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { IIntegrationsRequest } from 'src/types/request/integrations';
import {
  getRequest,
  endpoints,
  defaultConfig,
  postRequest,
  putRequest,
  deleteRequest,
} from 'src/utils/axios';

export const fetchIntegrationsList = createAsyncThunk('integrations/fetchList', async () => {
  const response = await getRequest(`${endpoints.integrations.list}`, defaultConfig);

  return response;
});

export const fetchOneIntegrations = createAsyncThunk(
  'integrations/fetchOne',
  async (integrationsId: number) => {
    const response = await getRequest(
      `${endpoints.integrations.list}/${integrationsId}`,
      defaultConfig
    );

    return response.data;
  }
);

export const createIntegrations = createAsyncThunk('integrations/create', async (data: any) => {
  const response = await postRequest(endpoints.integrations.list, data, defaultConfig);

  return response.data;
});

export const editIntegrations = createAsyncThunk(
  'integrations/edit',
  async (payload: { integrationsId: number; data: any }) => {
    const { integrationsId, data } = payload;
    const response = await putRequest(
      `${endpoints.integrations.list}/${integrationsId}`,
      data,
      defaultConfig
    );

    return response.data;
  }
);

export const deleteIntegrations = createAsyncThunk(
  'integrations/delete',
  async (integrationsId: number) => {
    const response = await deleteRequest(
      `${endpoints.integrations.list}/${integrationsId}`,
      defaultConfig
    );

    return response.data;
  }
);

const integrationsSlice = createSlice({
  name: 'integrations',
  initialState: {
    list: [],
    integrations: null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setIntegrations: (state, action: PayloadAction<any>) => {
      state.integrations = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchIntegrationsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIntegrationsList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchIntegrationsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(fetchOneIntegrations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneIntegrations.fulfilled, (state, action) => {
        state.loading = false;
        state.integrations = action.payload;
      })
      .addCase(fetchOneIntegrations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(createIntegrations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createIntegrations.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createIntegrations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(editIntegrations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editIntegrations.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editIntegrations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(deleteIntegrations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteIntegrations.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteIntegrations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      });
  },
});
export const { setIntegrations } = integrationsSlice.actions;
export default integrationsSlice.reducer;
