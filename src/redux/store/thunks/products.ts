import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getRequest,
  endpoints,
  defaultConfig,
  postRequest,
  putRequest,
  deleteRequest,
  IRequest,
} from 'src/utils/axios';

export interface IProductsForm extends IRequest {
  name: string;
  balance: number;
  // examples
}
export const fetchProductsList = createAsyncThunk('products/fetchList', async () => {
  const response = await getRequest(endpoints.product.list, defaultConfig);

  return response.data;
});

export const fetchOneProduct = createAsyncThunk(
  'products/fetchOne',
  async (productId: number) => {
    const response = await getRequest(`${endpoints.product.list}/${productId}`, defaultConfig);

    return response.data;
  }
);

export const createProduct = createAsyncThunk('products/create', async (data: IProductsForm) => {
  const response = await postRequest(endpoints.product.list, data, defaultConfig);

  return response.data;
});

export const editProduct = createAsyncThunk(
  'products/edit',
  async (payload : {productId: number, data: IProductsForm}) => {
    const { productId, data} = payload
    const response = await putRequest(
      `${endpoints.product.list}/${productId}`,
      data,
      defaultConfig
    );

    return response.data;
  }
);

export const deleteProduct = createAsyncThunk('products/delete', async (productId: number) => {
  const response = await deleteRequest(`${endpoints.product.list}/${productId}`, defaultConfig);

  return response.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    product: null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setProduct: (state, action: PayloadAction<any>) => {
      state.product = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchProductsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProductsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(fetchOneProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchOneProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(editProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })
  },
});
export const { setProduct } = productsSlice.actions;
export default productsSlice.reducer;
