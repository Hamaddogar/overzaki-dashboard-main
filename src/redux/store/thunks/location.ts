import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { ILocationRequest } from 'src/types/request/locations';
import {
  getRequest,
  endpoints,
  defaultConfig,
  postRequest,
  putRequest,
  deleteRequest,
  IRequest,
} from 'src/utils/axios';

export const fetchLocationsList = createAsyncThunk(
  'location/fetchList',
  async (params: IRequest, { rejectWithValue }) => {
    try {
      const response = await getRequest(`${endpoints.deliveryPickup.branches}`, defaultConfig);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOneLocation = createAsyncThunk('location/fetchOne', async (locationId: any) => {
  const response = await getRequest(
    `${endpoints.deliveryPickup.branches}/${locationId}`,
    defaultConfig
  );

  return response.data;
});
export const fetchWorkingHoursForBranch = createAsyncThunk(
  'location/fetchWorkingHours',
  async (locationId: any) => {
    const response = await getRequest(
      `${endpoints.deliveryPickup.workingHours}/branch/${locationId}`,
      defaultConfig
    );

    return response.data;
  }
);
export const createLocation = createAsyncThunk('location/create', async (data: any) => {
  const response = await postRequest(endpoints.deliveryPickup.branches, data, defaultConfig);

  return response.data;
});
export const createWorkingHours = createAsyncThunk(
  'location/create_workingHours',
  async ({ id, data }: any) => {
    const response = await postRequest(
      `${endpoints.deliveryPickup.workingHours}/${id}`,
      data,
      defaultConfig
    );

    return response.data;
  }
);

export const editLocation = createAsyncThunk(
  'location/edit',
  async (payload: { branchId: any; data: any }) => {
    const { branchId, data } = payload;
    const response = await putRequest(
      `${endpoints.deliveryPickup.branches}/${branchId}`,
      data,
      defaultConfig
    );

    return response.data;
  }
);
export const editWorkingHours = createAsyncThunk(
  'location/edit_workingHours',
  async (payload: { id: any; data: any }) => {
    const { id, data } = payload;
    const response = await putRequest(
      `${endpoints.deliveryPickup.workingHours}/${id}`,
      data,
      defaultConfig
    );

    return response.data;
  }
);

export const deleteLocation = createAsyncThunk('location/delete', async (branchId: any) => {
  const response = await deleteRequest(
    `${endpoints.deliveryPickup.branches}/${branchId}`,
    defaultConfig
  );

  return response.data;
});

export const deleteWorkingHours = createAsyncThunk(
  'location/delete_workingHours',
  async (id: any) => {
    const response = await deleteRequest(
      `${endpoints.deliveryPickup.workingHours}/${id}`,
      defaultConfig
    );

    return response.data;
  }
);

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    list: [] as any,
    location: null as any,
    loading: false,
    error: null as string | null,
    status: 'idle',
  },
  reducers: {
    setLocation: (state, action: PayloadAction<any>) => {
      state.location = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchLocationsList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchLocationsList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data.data;
        state.status = 'succeeded';
      })
      .addCase(fetchLocationsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
        state.status = 'failed';
      })

      .addCase(fetchOneLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.location = action.payload;
      })
      .addCase(fetchOneLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(createLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLocation.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(editLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editLocation.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(deleteLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLocation.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      });
  },
});
export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
