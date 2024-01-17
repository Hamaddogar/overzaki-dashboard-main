import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { resetAllReducers } from './resetSlice';
// import { IRolesRequest } from 'src/types/request/roles';
import {
  getRequest,
  endpoints,
  defaultConfig,
  postRequest,
  putRequest,
  deleteRequest,
  IRequest,
} from 'src/utils/axios';

export const fetchRolesList = createAsyncThunk(
  'role/fetchList',
  async (params: IRequest, { rejectWithValue }) => {
    try {
      const response = await getRequest(`${endpoints.role.list}/all`, defaultConfig());
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchPermissionsByGroupList = createAsyncThunk(
  'role/fetchListGroup',
  async (params: IRequest, { rejectWithValue }) => {
    try {
      const response = await getRequest(`${endpoints.permission.list}/group`, defaultConfig());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOneRole = createAsyncThunk('role/fetchOne', async (roleId: any) => {
  const response = await getRequest(`${endpoints.role.list}/${roleId}`, defaultConfig());

  return response.data;
});

export const createRole = createAsyncThunk('role/create', async (data: any) => {
  const response = await postRequest(endpoints.role.list, data, defaultConfig());

  return response.data;
});

export const editRole = createAsyncThunk(
  'role/edit',
  async (payload: { roleId: any; data: any }) => {
    const { roleId, data } = payload;
    const response = await putRequest(`${endpoints.role.list}/${roleId}`, data, defaultConfig());

    return response.data;
  }
);

export const deleteRole = createAsyncThunk('role/delete', async (roleId: number) => {
  const response = await deleteRequest(`${endpoints.role.list}/${roleId}`, defaultConfig());

  return response.data;
});

const roleSlice = createSlice({
  name: 'role',
  initialState: {
    list: [] as any,
    role: null as any,
    loading: false,
    error: null as string | null,
    status: 'idle',
  },
  reducers: {
    setRole: (state, action: PayloadAction<any>) => {
      state.role = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetAllReducers, (state) => {
        // Reset the state for the customers reducer
        state.status = 'idle';
        state.list = []; // Replace with your initial state
      })
      .addCase(fetchRolesList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchRolesList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.list = action.payload?.data?.data;
      })
      .addCase(fetchRolesList.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = true;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(fetchOneRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneRole.fulfilled, (state, action) => {
        state.loading = false;
        state.role = action.payload;
      })
      .addCase(fetchOneRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(createRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRole.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(editRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editRole.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(deleteRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRole.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      });
  },
});
export const { setRole } = roleSlice.actions;
export default roleSlice.reducer;
