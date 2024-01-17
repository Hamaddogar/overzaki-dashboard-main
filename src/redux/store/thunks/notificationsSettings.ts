import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { resetAllReducers } from './resetSlice';
// import { INotificationsSettingsRequest } from 'src/types/request/notificationsSettings';
import {
  getRequest,
  endpoints,
  defaultConfig,
  postRequest,
  putRequest,
  deleteRequest,
} from 'src/utils/axios';

export const fetchNotificationsSettingssList = createAsyncThunk(
  'notificationsSettings/fetchList',
  async () => {
    const response = await getRequest(endpoints.notificationsSettings.list, defaultConfig());

    return response.data;
  }
);

export const fetchOneNotificationsSettings = createAsyncThunk(
  'notificationsSettings/fetchOne',
  async (notificationsSettingsId: number) => {
    const response = await getRequest(
      `${endpoints.notificationsSettings.list}/${notificationsSettingsId}`,
      defaultConfig()
    );

    return response.data;
  }
);

export const createNotificationsSettings = createAsyncThunk(
  'notificationsSettings/create',
  async (data: any) => {
    const response = await postRequest(endpoints.notificationsSettings.list, data, defaultConfig());

    return response.data;
  }
);

export const editNotificationsSettings = createAsyncThunk(
  'notificationsSettings/edit',
  async (data: any) => {
    const response = await putRequest(endpoints.notificationsSettings.list, data, defaultConfig());

    return response.data;
  }
);

export const deleteNotificationsSettings = createAsyncThunk(
  'notificationsSettings/delete',
  async (notificationsSettingsId: number) => {
    const response = await deleteRequest(
      `${endpoints.notificationsSettings.list}/${notificationsSettingsId}`,
      defaultConfig()
    );

    return response.data;
  }
);

const notificationsSettingsSlice = createSlice({
  name: 'notificationsSettings',
  initialState: {
    list: [],
    notificationsSettings: null,
    loading: false,
    error: null as string | null,
    status: 'idle',
  },
  reducers: {
    setNotificationsSettings: (state, action: PayloadAction<any>) => {
      state.notificationsSettings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetAllReducers, (state) => {
        // Reset the state for the customers reducer
        state.status = 'idle';
        state.list = []; // Replace with your initial state
      })
      .addCase(fetchNotificationsSettingssList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotificationsSettingssList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchNotificationsSettingssList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(fetchOneNotificationsSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneNotificationsSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.notificationsSettings = action.payload;
      })
      .addCase(fetchOneNotificationsSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(createNotificationsSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNotificationsSettings.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createNotificationsSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(editNotificationsSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editNotificationsSettings.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editNotificationsSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(deleteNotificationsSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNotificationsSettings.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteNotificationsSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      });
  },
});
export const { setNotificationsSettings } = notificationsSettingsSlice.actions;
export default notificationsSettingsSlice.reducer;
