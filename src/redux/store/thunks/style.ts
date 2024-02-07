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

export const createStyleCategory = createAsyncThunk('styles/create', async (data: IIconForm) => {
  //   let headersObj = defaultConfig();
  //   headersObj.headers['Content-Type'] = 'multipart/form-data';
  const response = await postRequest(endpoints.style.create, data, defaultConfig());
  return response.data;
});
export const createStyle = createAsyncThunk('style/create', async (data: any) => {
  let headersObj = defaultConfig();
  headersObj.headers['Content-Type'] = 'multipart/form-data';
  const response = await postRequest(endpoints.style.app, data, headersObj);
  return response.data;
});
export const deleteStyleCategory = createAsyncThunk('styles/delete', async (id: any) => {
  const response = await deleteRequest(`${endpoints.style.create}/${id}`, defaultConfig());
  return response.data;
});
export const getStyleCategoryById = createAsyncThunk('styles/delete', async (id: any) => {
  const response = await getRequest(`${endpoints.style.create}/${id}`, defaultConfig());
  return response.data;
});

export const fetchStyleCategoryList = createAsyncThunk('styles/fetchList', async () => {
  try {
    const response = await getRequest(`${endpoints.style.create}/all`, defaultConfig());
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const fetchStyleList = createAsyncThunk('styles/fetchStyleList', async () => {
  try {
    const response = await getRequest(`${endpoints.style.app}/all`, defaultConfig());
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const fetchStyleById = createAsyncThunk('styles/fetchById', async (id: string) => {
  const response = await getRequest(`${endpoints.style.app}/${id}`, defaultConfig());
  return response.data;
});
export const editStyleCategory = createAsyncThunk(
  'styles/edit',
  async (payload: { id: string; data: any }) => {
    const { id, data } = payload;
    const response = await putRequest(`${endpoints.style.create}/${id}`, data, defaultConfig());

    return response.data;
  }
);
export const editStyle = createAsyncThunk(
  'style/edit',
  async (payload: { id: string; data: any }) => {
    const { id, data } = payload;
    let headersObj = defaultConfig();
    headersObj.headers['Content-Type'] = 'multipart/form-data';
    const response = await putRequest(`${endpoints.style.app}/${id}`, data, headersObj);
    return response.data;
  }
);
export const deleteStyleById = createAsyncThunk('styles/delete', async (id: any) => {
  const response = await deleteRequest(`${endpoints.style.app}/${id}`, defaultConfig());
  return response.data;
});
// export const deleteStyle = createAsyncThunk(
//   'style/edit',
//   async (payload: { id: string; data: any }) => {
//     const { id, data } = payload;
//     let headersObj = defaultConfig();
//     headersObj.headers['Content-Type'] = 'multipart/form-data';
//     const response = await putRequest(`${endpoints.style.app}/${id}`, data, headersObj);
//     return response.data;
//   }
// );

const stylesSlice = createSlice({
  name: 'style',
  initialState: {
    list: [],
    icons: null as any,
    loading: false,
    error: null as string | null,
    status: 'idle',
  },
  reducers: {
    setStyles: (state, action: PayloadAction<any>) => {
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

      .addCase(createStyleCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(createStyleCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.list = action.payload.data;
      })
      .addCase(createStyleCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })
      .addCase(fetchStyleCategoryList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchStyleCategoryList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.list = action?.payload?.data;
      })
      .addCase(fetchStyleCategoryList.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })
      .addCase(deleteStyleCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(deleteStyleCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.list = action.payload.data;
      })
      .addCase(deleteStyleCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
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
export const { setStyles } = stylesSlice.actions;
export default stylesSlice.reducer;
