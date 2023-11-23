import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ILocationRequest } from 'src/types/request/locations';
import {
  getRequest,
  endpoints,
  defaultConfig,
  postRequest,
  putRequest,
  deleteRequest,
} from 'src/utils/axios';


export const fetchLocationsList = createAsyncThunk('location/fetchList', async () => {

  const response = await getRequest(`${endpoints.location.list}`, defaultConfig);

  return response;
});

export const fetchOneLocation = createAsyncThunk(
  'location/fetchOne',
  async (locationId: number) => {
    const response = await getRequest(`${endpoints.location.list}/${locationId}`, defaultConfig);

    return response.data;
  }
);

export const createLocation = createAsyncThunk('location/create', async (data: ILocationRequest) => {
  const response = await postRequest(endpoints.location.list, data, defaultConfig);

  return response.data;
});

export const editLocation = createAsyncThunk(
  'location/edit',
  async (payload : {locationId: number, data: ILocationRequest}) => {
    const { locationId, data} = payload
    const response = await putRequest(
      `${endpoints.location.list}/${locationId}`,
      data,
      defaultConfig
    );

    return response.data;
  }
);

export const deleteLocation = createAsyncThunk('location/delete', async (locationId: number) => {
  const response = await deleteRequest(`${endpoints.location.list}/${locationId}`, defaultConfig);

  return response.data;
});

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    list: [],
    location: null,
    loading: false,
    error: null as string | null,
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
      })
      .addCase(fetchLocationsList.fulfilled, (state, action) => {

        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchLocationsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
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
      })
  },
});
export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
