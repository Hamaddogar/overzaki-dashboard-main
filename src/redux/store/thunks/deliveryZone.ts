import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { IDeliveryZoneRequest } from 'src/types/request/deliveryZone';
import {
  getRequest,
  endpoints,
  defaultConfig,
  postRequest,
  putRequest,
  deleteRequest,
} from 'src/utils/axios';

export const fetchDeliveryZonesList = createAsyncThunk('deliveryZone/fetchList', async () => {
  const response = await getRequest(`${endpoints.deliveryZone.list}`, defaultConfig);

  return response;
});

export const fetchOneDeliveryZone = createAsyncThunk(
  'deliveryZone/fetchOne',
  async (deliveryZoneId: number) => {
    const response = await getRequest(
      `${endpoints.deliveryZone.list}/${deliveryZoneId}`,
      defaultConfig
    );

    return response.data;
  }
);

export const createDeliveryZone = createAsyncThunk('deliveryZone/create', async (data: any) => {
  const response = await postRequest(endpoints.deliveryZone.list, data, defaultConfig);

  return response.data;
});

export const editDeliveryZone = createAsyncThunk(
  'deliveryZone/edit',
  async (payload: { deliveryZoneId: number; data: any }) => {
    const { deliveryZoneId, data } = payload;
    const response = await putRequest(
      `${endpoints.deliveryZone.list}/${deliveryZoneId}`,
      data,
      defaultConfig
    );

    return response.data;
  }
);

export const deleteDeliveryZone = createAsyncThunk(
  'deliveryZone/delete',
  async (deliveryZoneId: number) => {
    const response = await deleteRequest(
      `${endpoints.deliveryZone.list}/${deliveryZoneId}`,
      defaultConfig
    );

    return response.data;
  }
);

const deliveryZoneSlice = createSlice({
  name: 'deliveryZone',
  initialState: {
    list: [],
    deliveryZone: null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setDeliveryZone: (state, action: PayloadAction<any>) => {
      state.deliveryZone = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchDeliveryZonesList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliveryZonesList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchDeliveryZonesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(fetchOneDeliveryZone.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneDeliveryZone.fulfilled, (state, action) => {
        state.loading = false;
        state.deliveryZone = action.payload;
      })
      .addCase(fetchOneDeliveryZone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(createDeliveryZone.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDeliveryZone.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createDeliveryZone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(editDeliveryZone.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editDeliveryZone.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editDeliveryZone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(deleteDeliveryZone.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDeliveryZone.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteDeliveryZone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      });
  },
});
export const { setDeliveryZone } = deliveryZoneSlice.actions;
export default deliveryZoneSlice.reducer;
