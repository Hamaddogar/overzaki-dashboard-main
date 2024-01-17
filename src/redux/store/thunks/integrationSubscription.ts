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

export interface IIntegrationSubscriptionForm extends IRequest {
  name: string;
  balance: number;
  // examples
}
export const fetchIntegrationSubscriptionsList = createAsyncThunk(
  'integrationSubscription/fetchList',
  async () => {
    const response = await getRequest(`${endpoints.integrationSubscription.list}`, defaultConfig());

    return response;
  }
);

export const fetchOneIntegrationSubscription = createAsyncThunk(
  'integrationSubscription/fetchOne',
  async (integrationSubscriptionId: number) => {
    const response = await getRequest(
      `${endpoints.integrationSubscription.list}/${integrationSubscriptionId}`,
      defaultConfig()
    );

    return response.data;
  }
);

export const createIntegrationSubscription = createAsyncThunk(
  'integrationSubscription/create',
  async (data: IIntegrationSubscriptionForm) => {
    const response = await postRequest(
      endpoints.integrationSubscription.list,
      data,
      defaultConfig()
    );

    return response.data;
  }
);

export const editIntegrationSubscription = createAsyncThunk(
  'integrationSubscription/edit',
  async (payload: { integrationSubscriptionId: number; data: IIntegrationSubscriptionForm }) => {
    const { integrationSubscriptionId, data } = payload;
    const response = await putRequest(
      `${endpoints.integrationSubscription.list}/${integrationSubscriptionId}`,
      data,
      defaultConfig()
    );

    return response.data;
  }
);

export const deleteIntegrationSubscription = createAsyncThunk(
  'integrationSubscription/delete',
  async (integrationSubscriptionId: number) => {
    const response = await deleteRequest(
      `${endpoints.integrationSubscription.list}/${integrationSubscriptionId}`,
      defaultConfig()
    );

    return response.data;
  }
);

const integrationSubscriptionSlice = createSlice({
  name: 'integrationSubscription',
  initialState: {
    list: [],
    integrationSubscription: null,
    loading: false,
    error: null as string | null,
    status: 'idle',
  },
  reducers: {
    setIntegrationSubscription: (state, action: PayloadAction<any>) => {
      state.integrationSubscription = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetAllReducers, (state) => {
        // Reset the state for the customers reducer
        state.status = 'idle';
        state.list = []; // Replace with your initial state
      })
      .addCase(fetchIntegrationSubscriptionsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIntegrationSubscriptionsList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchIntegrationSubscriptionsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(fetchOneIntegrationSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneIntegrationSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.integrationSubscription = action.payload;
      })
      .addCase(fetchOneIntegrationSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(createIntegrationSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createIntegrationSubscription.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createIntegrationSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(editIntegrationSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editIntegrationSubscription.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editIntegrationSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(deleteIntegrationSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteIntegrationSubscription.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteIntegrationSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      });
  },
});
export const { setIntegrationSubscription } = integrationSubscriptionSlice.actions;
export default integrationSubscriptionSlice.reducer;
