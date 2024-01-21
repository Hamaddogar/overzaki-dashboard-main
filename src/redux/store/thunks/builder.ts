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

export interface IBuilderForm extends IRequest {
  name: string;
  balance: number;
  // examples
}

export const fetchBuilderList = createAsyncThunk(
  'builder/fetchList',
  async (params: IRequest, { rejectWithValue }) => {
    try {
      const response = await getRequest(endpoints.builder.get, defaultConfig());
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createSocketRequest = createAsyncThunk(
  'builder/socket',
  async (data: any) => data
  // const response = await postRequest(endpoints.builder.list, data, defaultConfig());
  // return response.data;
);
export const createBuilderFun = createAsyncThunk('builder/create', async (data: any) => {
  let headersObj = defaultConfig();
  headersObj.headers['Content-Type'] = 'multipart/form-data';
  const response = await postRequest(endpoints.builder.list, data, headersObj);
  console.log('response', response);

  return response;
});

export const editDesignBuilder = createAsyncThunk('builder/editDesignBuilder', async () => {
  const response = await getRequest(endpoints.analytic.customers, defaultConfig());

  return response;
});

export const builderActivateWebsite = createAsyncThunk(
  'builder/builderActivateWebsite',
  async (builderId: number) => {
    const response = await getRequest(
      `${endpoints.analytic.summary}/${builderId}`,
      defaultConfig()
    );

    return response.data;
  }
);

export const builderActivateApplication = createAsyncThunk(
  'builder/builderActivateApplication',
  async (data: IBuilderForm) => {
    const response = await postRequest(endpoints.analytic.vouchers, data, defaultConfig());

    return response.data;
  }
);

const builderSlice = createSlice({
  name: 'builder',
  initialState: {
    list: [],
    builder: null,
    loading: false,
    error: null as string | null,
    status: 'idle',
  },
  reducers: {
    setBuilder: (state, action: PayloadAction<any>) => {
      state.builder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchBuilderList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchBuilderList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.status = 'succeeded';
      })
      .addCase(fetchBuilderList.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(createBuilderFun.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBuilderFun.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createBuilderFun.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(editDesignBuilder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editDesignBuilder.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(editDesignBuilder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(builderActivateWebsite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(builderActivateWebsite.fulfilled, (state, action) => {
        state.loading = false;
        state.builder = action.payload;
      })
      .addCase(builderActivateWebsite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(builderActivateApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(builderActivateApplication.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(builderActivateApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      });
  },
});
export const { setBuilder } = builderSlice.actions;
export default builderSlice.reducer;
