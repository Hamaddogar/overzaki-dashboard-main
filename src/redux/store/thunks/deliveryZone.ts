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

export const fetchDeliveryZonesForBranch = createAsyncThunk(
  'deliveryZone/fetchDeliveryZones',
  async (locationId: any) => {
    const response = await getRequest(
      `${endpoints.deliveryPickup.deliveryZones}/branch/${locationId}`,
      defaultConfig
    );

    return response.data;
  }
);

export const fetchOneDeliveryZone = createAsyncThunk(
  'deliveryZone/fetchOne',
  async (deliveryZoneId: number) => {
    const response = await getRequest(
      `${endpoints.deliveryPickup.deliveryZones}/${deliveryZoneId}`,
      defaultConfig
    );

    return response.data;
  }
);

export const createDeliveryZone = createAsyncThunk(
  'deliveryZone/create',
  async ({ id, data }: any) => {
    const response = await postRequest(
      `${endpoints.deliveryPickup.deliveryZones}/${id}`,
      data,
      defaultConfig
    );

    return response.data;
  }
);

export const editDeliveryZone = createAsyncThunk(
  'deliveryZone/edit',
  async (payload: { deliveryZoneId: any; data: any }) => {
    const { deliveryZoneId, data } = payload;
    const response = await putRequest(
      `${endpoints.deliveryPickup.deliveryZones}/${deliveryZoneId}`,
      data,
      defaultConfig
    );

    return response.data;
  }
);

export const deleteDeliveryZone = createAsyncThunk(
  'deliveryZone/delete',
  async (deliveryZoneId: any) => {
    const response = await deleteRequest(
      `${endpoints.deliveryPickup.deliveryZones}/${deliveryZoneId}`,
      defaultConfig
    );

    return response.data;
  }
);

const deliveryZoneSlice = createSlice({
  name: 'deliveryZone',
  initialState: {
    list: [] as any,
    deliveryZone: null as any,
    loading: false,
    error: null as string | null,
    status: 'idle',
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
        state.status = 'loading';
      })
      .addCase(fetchDeliveryZonesList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data.data;
        state.status = 'success';
      })
      .addCase(fetchDeliveryZonesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
        state.status = 'failed';
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
