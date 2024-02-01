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

export interface IAnalyticsForm extends IRequest {
  name: string;
  balance: number;
  // examples
}
export const fetchAllBrands = createAsyncThunk('brands/fetchAll', async () => {
  const response = await getRequest(endpoints.brand.list, defaultConfig());

  return response;
});
export const deleteBrand = createAsyncThunk('brands/delete', async (id: any) => {
  const response = await deleteRequest(`${endpoints.brand.search}/${id}`, defaultConfig());
  return response;
});
export const createBrand = createAsyncThunk('brands/create', async (data: any) => {
  let headersObj = defaultConfig();
  headersObj.headers['Content-Type'] = 'multipart/form-data';
  const response = await postRequest(endpoints.brand.search, data, headersObj);
  return response.data;
});

export const fetchOneBrand = createAsyncThunk('brands/fetchOne', async (brandId: number) => {
  const response = await getRequest(
    `${endpoints.brand.search}/${brandId}?lang=en`,
    defaultConfig()
  );

  return response.data;
});

export const editBrand = createAsyncThunk(
  'brands/edit',
  async (payload: { brandId: any; data: any }) => {
    // defaultConfig().headers['Content-Type'] = 'multipart/form-data';
    let headersObj = defaultConfig();
    headersObj.headers['Content-Type'] = 'multipart/form-data';

    const { brandId, data } = payload;
    const response = await putRequest(`${endpoints.brand.search}/${brandId}`, data, headersObj);

    return response.data;
  }
);

const analyticsSlice = createSlice({
  name: 'brands',
  initialState: {
    list: [] as any,
    brand: null as any,
    loading: false as any,
    error: null as string | null,
    status: 'idle',
  },
  reducers: {
    setBrand: (state, action: PayloadAction<any>) => {
      state.brand = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetAllReducers, (state) => {
        state.status = 'idle';
        state.list = [];
      })
      .addCase(fetchAllBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchAllBrands.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.list = action.payload.data.data;
      })
      .addCase(fetchAllBrands.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })
      .addCase(fetchOneBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brand = action.payload;
      })
      .addCase(fetchOneBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })
      .addCase(editBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editBrand.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      });
  },
});
export const { setBrand } = analyticsSlice.actions;
export default analyticsSlice.reducer;
