import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { resetAllReducers } from './resetSlice';
// import { IWebSiteInformationRequest } from 'src/types/request/websiteInformation';
import {
  getRequest,
  endpoints,
  defaultConfig,
  postRequest,
  putRequest,
  deleteRequest,
} from 'src/utils/axios';

export const fetchWebSiteInformationsList = createAsyncThunk(
  'webSiteInformations/fetchList',
  async () => {
    const response = await getRequest(endpoints.webSiteInformation.list, defaultConfig());

    return response.data;
  }
);

export const fetchOneWebSiteInformation = createAsyncThunk(
  'webSiteInformations/fetchOne',
  async (webSiteInformationId: number) => {
    const response = await getRequest(
      `${endpoints.webSiteInformation.list}/${webSiteInformationId}`,
      defaultConfig()
    );

    return response.data;
  }
);

export const createWebSiteInformation = createAsyncThunk(
  'webSiteInformations/create',
  async (data: any) => {
    const response = await postRequest(endpoints.webSiteInformation.list, data, defaultConfig());

    return response.data;
  }
);

export const editWebSiteInformation = createAsyncThunk(
  'webSiteInformations/edit',
  async (payload: { webSiteInformationId: number; data: any }) => {
    const { webSiteInformationId, data } = payload;
    const response = await putRequest(
      `${endpoints.webSiteInformation.list}/${webSiteInformationId}`,
      data,
      defaultConfig()
    );

    return response.data;
  }
);

export const deleteWebSiteInformation = createAsyncThunk(
  'webSiteInformations/delete',
  async (webSiteInformationId: number) => {
    const response = await deleteRequest(
      `${endpoints.webSiteInformation.list}/${webSiteInformationId}`,
      defaultConfig()
    );

    return response.data;
  }
);

const webSiteInformationsSlice = createSlice({
  name: 'webSiteInformations',
  initialState: {
    list: [],
    webSiteInformation: null,
    loading: false,
    error: null as string | null,
    status: 'idle',
  },
  reducers: {
    setWebSiteInformation: (state, action: PayloadAction<any>) => {
      state.webSiteInformation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetAllReducers, (state) => {
        // Reset the state for the customers reducer
        state.status = 'idle';
        state.list = []; // Replace with your initial state
      })

      .addCase(fetchWebSiteInformationsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWebSiteInformationsList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchWebSiteInformationsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(fetchOneWebSiteInformation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneWebSiteInformation.fulfilled, (state, action) => {
        state.loading = false;
        state.webSiteInformation = action.payload;
      })
      .addCase(fetchOneWebSiteInformation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(createWebSiteInformation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWebSiteInformation.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createWebSiteInformation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(editWebSiteInformation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editWebSiteInformation.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editWebSiteInformation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(deleteWebSiteInformation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWebSiteInformation.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteWebSiteInformation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      });
  },
});
export const { setWebSiteInformation } = webSiteInformationsSlice.actions;
export default webSiteInformationsSlice.reducer;
