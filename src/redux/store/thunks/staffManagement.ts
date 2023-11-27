import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { IStaffMangmentRequest } from 'src/types/request/staffManagement';
import {
  getRequest,
  endpoints,
  defaultConfig,
  postRequest,
  putRequest,
  deleteRequest,
} from 'src/utils/axios';

export const fetchStaffManagementsList = createAsyncThunk('staffManagement/fetchList', async () => {
  const response = await getRequest(`${endpoints.staffManagement.list}`, defaultConfig);

  return response;
});

export const fetchOneStaffManagement = createAsyncThunk(
  'staffManagement/fetchOne',
  async (staffManagementId: number) => {
    const response = await getRequest(
      `${endpoints.staffManagement.list}/${staffManagementId}`,
      defaultConfig
    );

    return response.data;
  }
);

export const createStaffManagement = createAsyncThunk(
  'staffManagement/create',
  async (data: any) => {
    const response = await postRequest(endpoints.staffManagement.list, data, defaultConfig);

    return response.data;
  }
);

export const editStaffManagement = createAsyncThunk(
  'staffManagement/edit',
  async (payload: { staffManagementId: number; data: any }) => {
    const { staffManagementId, data } = payload;
    const response = await putRequest(
      `${endpoints.staffManagement.list}/${staffManagementId}`,
      data,
      defaultConfig
    );

    return response.data;
  }
);

export const deleteStaffManagement = createAsyncThunk(
  'staffManagement/delete',
  async (staffManagementId: number) => {
    const response = await deleteRequest(
      `${endpoints.staffManagement.list}/${staffManagementId}`,
      defaultConfig
    );

    return response.data;
  }
);

const staffManagementSlice = createSlice({
  name: 'staffManagement',
  initialState: {
    list: [],
    staffManagement: null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setStaffManagement: (state, action: PayloadAction<any>) => {
      state.staffManagement = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchStaffManagementsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaffManagementsList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchStaffManagementsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(fetchOneStaffManagement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneStaffManagement.fulfilled, (state, action) => {
        state.loading = false;
        state.staffManagement = action.payload;
      })
      .addCase(fetchOneStaffManagement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(createStaffManagement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStaffManagement.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createStaffManagement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(editStaffManagement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editStaffManagement.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editStaffManagement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(deleteStaffManagement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStaffManagement.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteStaffManagement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      });
  },
});
export const { setStaffManagement } = staffManagementSlice.actions;
export default staffManagementSlice.reducer;
