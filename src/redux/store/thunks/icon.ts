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
  getRequestWithParams,
} from '../../../utils/axios';

export interface IIconForm extends IRequest {
  name: string;

  // examples
}

export const createIconCategory = createAsyncThunk('icon/create', async (data: IIconForm) => {
  //   let headersObj = defaultConfig();
  //   headersObj.headers['Content-Type'] = 'multipart/form-data';
  const response = await postRequest(endpoints.icon.create, data, defaultConfig());
  return response.data;
});
export const createIcon = createAsyncThunk('icon/create', async (data: any) => {
  let headersObj = defaultConfig();
  headersObj.headers['Content-Type'] = 'multipart/form-data';
  const response = await postRequest(endpoints.icon.app, data, headersObj);
  return response.data;
});
export const fetchIconsList = createAsyncThunk('icons/fetchIconsList', async () => {
  try {
    const response = await getRequest(`${endpoints.icon.app}/all`, defaultConfig());
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchIconCategoryList = createAsyncThunk('icons/fetchList', async () => {
  try {
    const response = await getRequest(`${endpoints.icon.create}/all`, defaultConfig());
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const deleteIconCategory = createAsyncThunk('icon/delete', async (id: any) => {
  const response = await deleteRequest(`${endpoints.icon.create}/${id}`, defaultConfig());
  return response.data;
});
export const getIconCategoryById = createAsyncThunk('icon/delete', async (id: any) => {
  const response = await getRequest(`${endpoints.icon.create}/${id}`, defaultConfig());
  return response.data;
});
export const editIconCategory = createAsyncThunk(
  'icon/edit',
  async (payload: { id: string; data: any }) => {
    // let headersObj = defaultConfig();
    // headersObj.headers['Content-Type'] = 'multipart/form-data';
    const { id, data } = payload;
    const response = await putRequest(`${endpoints.icon.create}/${id}`, data, defaultConfig());

    return response.data;
  }
);
export const editIcon = createAsyncThunk(
  'icon/edit',
  async (payload: { id: string; data: any }) => {
    let headersObj = defaultConfig();
    headersObj.headers['Content-Type'] = 'multipart/form-data';
    const { id, data } = payload;
    const response = await putRequest(`${endpoints.icon.app}/${id}`, data, headersObj);

    return response.data;
  }
);
export const fetchIconById = createAsyncThunk('icon/fetchbyid', async (id: any) => {
  const response = await getRequest(`${endpoints.icon.app}/${id}`, defaultConfig());
  return response.data;
});

const iconsSlice = createSlice({
  name: 'icons',
  initialState: {
    list: [],
    icons: null as any,
    loading: false,
    error: null as string | null,
    status: 'idle',
  },
  reducers: {
    setIcons: (state, action: PayloadAction<any>) => {
      state.icons = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetAllReducers, (state) => {
        // Reset the state for the customers reducer
        state.status = 'idle';
        state.list = []; // Replace with your initial state
      })

      .addCase(createIconCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(createIconCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.list = action.payload.data;
      })
      .addCase(createIconCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      });
  },
});
export const { setIcons } = iconsSlice.actions;
export default iconsSlice.reducer;
