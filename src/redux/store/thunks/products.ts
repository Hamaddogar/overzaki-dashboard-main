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

export interface IProductsForm extends IRequest {
  name: string;
  balance: number;
  // examples
}
export const fetchProductsList = createAsyncThunk(
  'products/fetchList',
  async (params: IRequest, { rejectWithValue }) => {
    try {
      const response = await getRequest(endpoints.product.list, defaultConfig());
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchProductsWithParams = createAsyncThunk(
  'products/fetchListWithParams',
  async ({ pageNumber, pageSize }: { pageNumber: any; pageSize: any }, { rejectWithValue }) => {
    try {
      const response = await getRequest(
        `${endpoints.product.list}?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        defaultConfig()
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOneProduct = createAsyncThunk('products/fetchOne', async (productId: number) => {
  const response = await getRequest(`${endpoints.product.list}/${productId}`, defaultConfig());

  return response.data;
});

export const createProduct = createAsyncThunk('products/create', async (data: any) => {
  // defaultConfig().headers['Content-Type'] = 'multipart/form-data';
  let headersObj = defaultConfig();
  headersObj.headers['Content-Type'] = 'multipart/form-data';
  const response = await postRequest(endpoints.product.list, data, headersObj);

  return response.data;
});

export const editProduct = createAsyncThunk(
  'products/edit',
  async (payload: { productId: any; data: any }) => {
    // defaultConfig().headers['Content-Type'] = 'multipart/form-data';
    let headersObj = defaultConfig();
    headersObj.headers['Content-Type'] = 'multipart/form-data';
    const { productId, data } = payload;
    const response = await putRequest(`${endpoints.product.list}/${productId}`, data, headersObj);

    return response.data;
  }
);

export const deleteProduct = createAsyncThunk('products/delete', async (productId: number) => {
  const response = await deleteRequest(`${endpoints.product.list}/${productId}`, defaultConfig());

  return response.data;
});

export const fetchAllVariant = createAsyncThunk(
  'products/fetchAllVariant',
  async (productId: number) => {
    const response = await getRequest(`${endpoints.product.varient}/${productId}`, defaultConfig());

    return response.data;
  }
);
export const fetchOneVariant = createAsyncThunk(
  'products/fetchOneVariant',
  async (productId: number) => {
    const response = await getRequest(`${endpoints.product.varient}/${productId}`, defaultConfig());

    return response.data;
  }
);
// createVariant;

export const createVariant = createAsyncThunk(
  'products/createVariant',
  async ({ productId, data }: any) => {
    // defaultConfig().headers['Content-Type'] = 'multipart/form-data';
    let headersObj = defaultConfig();
    headersObj.headers['Content-Type'] = 'multipart/form-data';
    const response = await postRequest(
      `${endpoints.product.varient}/${productId}`,
      data,
      headersObj
    );

    return response.data;
  }
);

// editVariant;
export const editVariant = createAsyncThunk(
  'products/editVariant',
  async (payload: { variantId: any; data: any }) => {
    // defaultConfig().headers['Content-Type'] = 'multipart/form-data';
    let headersObj = defaultConfig();
    headersObj.headers['Content-Type'] = 'multipart/form-data';
    const { variantId, data } = payload;
    const response = await putRequest(
      `${endpoints.product.varient}/${variantId}`,
      data,
      headersObj
    );

    return response.data;
  }
);
export const editVariantRow = createAsyncThunk(
  'products/editVariantRow',
  async (payload: { rowId: any; data: any }) => {
    // defaultConfig().headers['Content-Type'] = 'multipart/form-data';
    let headersObj = defaultConfig();
    headersObj.headers['Content-Type'] = 'multipart/form-data';
    const { rowId, data } = payload;
    const response = await putRequest(`${endpoints.product.rows}/${rowId}`, data, headersObj);

    return response.data;
  }
);

export const deleteVariant = createAsyncThunk('products/deleteVariant', async (productId: any) => {
  const response = await deleteRequest(
    `${endpoints.product.varient}/${productId}`,
    defaultConfig()
  );

  return response.data;
});
export const deleteVariantRow = createAsyncThunk(
  'products/deleteVariantRow',
  async (rowId: any) => {
    const response = await deleteRequest(`${endpoints.product.rows}/${rowId}`, defaultConfig());

    return response.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    product: null,
    variant: null,
    loading: false,
    error: null as string | null,
    status: 'idle',
  },
  reducers: {
    setProduct: (state, action: PayloadAction<any>) => {
      state.product = action.payload;
    },
    setVariant: (state, action: PayloadAction<any>) => {
      state.variant = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetAllReducers, (state) => {
        // Reset the state for the customers reducer
        state.status = 'idle';
        state.list = []; // Replace with your initial state
      })

      .addCase(fetchProductsList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchProductsList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data.data;
        state.status = 'succeeded';
      })
      .addCase(fetchProductsList.rejected, (state, action) => {
        state.status = 'failed';
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
      .addCase(fetchOneVariant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneVariant.fulfilled, (state, action) => {
        state.loading = false;
        state.variant = action.payload;
      })
      .addCase(fetchOneVariant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(createVariant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVariant.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createVariant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })
      .addCase(editVariant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editVariant.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editVariant.rejected, (state, action) => {
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
      });
  },
});
export const { setProduct, setVariant } = productsSlice.actions;
export default productsSlice.reducer;
