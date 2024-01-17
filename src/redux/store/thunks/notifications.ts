import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { resetAllReducers } from './resetSlice';
import {
  getRequest,
  endpoints,
  defaultConfig,
  postRequest,
  putRequest,
  deleteRequest,
} from 'src/utils/axios';

export const fetchUsersNotifications = createAsyncThunk('notification/fetchUsers', async () => {
  const response = await getRequest(`${endpoints.notification.users}`, defaultConfig());

  return response;
});

export const fetchUserNotification = createAsyncThunk(
  'notification/fetchUser',
  async (notificationId: number) => {
    const response = await getRequest(
      `${endpoints.notification.user}/${notificationId}`,
      defaultConfig()
    );

    return response.data;
  }
);
export const fetchGroupNotification = createAsyncThunk(
  'notification/fetchGroup',
  async (notificationId: number) => {
    const response = await getRequest(
      `${endpoints.notification.group}/${notificationId}`,
      defaultConfig()
    );

    return response.data;
  }
);
export const fetchMyNotification = createAsyncThunk(
  'notification/fetchMyNotification',
  async (notificationId: number) => {
    const response = await getRequest(
      `${endpoints.notification.myNotification}/${notificationId}`,
      defaultConfig()
    );

    return response.data;
  }
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    list: [],
    notification: null,
    loading: false,
    error: null as string | null,
    status: 'idle',
  },
  reducers: {
    setNotification: (state, action: PayloadAction<any>) => {
      state.notification = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetAllReducers, (state) => {
        // Reset the state for the customers reducer
        state.status = 'idle';
        state.list = []; // Replace with your initial state
      })
      .addCase(fetchUsersNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsersNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(fetchUserNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.notification = action.payload;
      })
      .addCase(fetchUserNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(fetchMyNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyNotification.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchMyNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      });
  },
});
export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
