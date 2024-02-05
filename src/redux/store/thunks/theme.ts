import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { resetAllReducers } from './resetSlice';
import {
  getRequest,
  endpoints,
  defaultConfig,
  postRequest,
  putRequest,
  IRequest,
  deleteRequest,
} from '../../../utils/axios';

export interface IIconForm extends IRequest {
  name: string;
}

export const createTheme = createAsyncThunk('style/create', async (data: any) => {
  let headersObj = defaultConfig();
  headersObj.headers['Content-Type'] = 'multipart/form-data';
  const response = await postRequest(endpoints.theme.app, data, headersObj);
  return response.data;
});

export const fetchThemeList = createAsyncThunk('styles/fetchStyleList', async () => {
  try {
    const response = await getRequest(`${endpoints.theme.app}/all`, defaultConfig());
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const fetchThemeById = createAsyncThunk('styles/fetchById', async (id: string) => {
  const response = await getRequest(`${endpoints.theme.app}/${id}`, defaultConfig());
  return response.data;
});

export const editTheme = createAsyncThunk(
  'style/edit',
  async (payload: { id: string; data: any }) => {
    const { id, data } = payload;
    let headersObj = defaultConfig();
    headersObj.headers['Content-Type'] = 'multipart/form-data';
    const response = await putRequest(`${endpoints.theme.app}/${id}`, data, headersObj);
    return response.data;
  }
);
export const deleteThemeById = createAsyncThunk('icon/delete', async (id: any) => {
  const response = await deleteRequest(`${endpoints.theme.app}/${id}`, defaultConfig());
  return response.data;
});

const themeSlice = createSlice({
  name: 'style',
  initialState: {
    list: [],
    icons: null as any,
    loading: false,
    error: null as string | null,
    status: 'idle',
  },
  reducers: {
    setThemes: (state, action: PayloadAction<any>) => {
      state.icons = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAllReducers, (state) => {
      // Reset the state for the customers reducer
      state.status = 'idle';
      state.list = []; // Replace with your initial state
    });

    // .addCase(editStyles.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    //   state.status = 'loading';
    // })
    // .addCase(editStyles.fulfilled, (state, action) => {
    //   state.status = 'succeeded';
    //   state.loading = false;
    //   state.list = action.payload.data.data;
    // })
    // .addCase(editStyles.rejected, (state, action) => {
    //   state.status = 'failed';
    //   state.loading = false;
    //   state.error = action.error.message !== undefined ? action.error.message : null;
    // });
  },
});
export const { setThemes } = themeSlice.actions;
export default themeSlice.reducer;
