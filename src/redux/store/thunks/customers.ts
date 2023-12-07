import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getRequest,
  endpoints,
  defaultConfig,
  postRequest,
  putRequest,
  deleteRequest,
  IRequest,
  getRequestWithParams,
} from 'src/utils/axios';

export interface ICustomerForm extends IRequest {
  name: string;
  balance: number;
  // examples
}
export const fetchCustomersList = createAsyncThunk(
  'customers/fetchList',
  async (params: IRequest, { rejectWithValue }) => {
    try {
      const response = await getRequestWithParams(
        `${endpoints.customer.list}?pageSize=10&pageNumber=1`,
        params,
        defaultConfig
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOneCustomer = createAsyncThunk('customers/fetchOne', async (customerId: any) => {
  const response = await getRequest(`${endpoints.customer.list}/${customerId}`, defaultConfig);
  console.log('customerId....', customerId);
  return response.data?.user || {};
});

export const createCustomer = createAsyncThunk('customers/create', async (data: ICustomerForm) => {
  defaultConfig.headers['Content-Type'] = 'multipart/form-data';
  const response = await postRequest(endpoints.customer.list, data, defaultConfig);

  return response.data;
});

export const editCustomer = createAsyncThunk(
  'customers/edit',
  async (payload: { customerId: any; data: ICustomerForm }) => {
    defaultConfig.headers['Content-Type'] = 'multipart/form-data';
    const { customerId, data } = payload;
    const response = await putRequest(
      `${endpoints.customer.list}/${customerId}`,
      data,
      defaultConfig
    );

    return response.data;
  }
);

export const deleteCustomer = createAsyncThunk('customers/delete', async (customerId: number) => {
  const response = await deleteRequest(`${endpoints.customer.list}/${customerId}`, defaultConfig);

  return response.data;
});

const customersSlice = createSlice({
  name: 'customers',
  initialState: {
    list: [],
    customer: null as any,
    loading: false,
    error: null as string | null,
    status: 'idle',
  },
  reducers: {
    setCustomer: (state, action: PayloadAction<any>) => {
      state.customer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchCustomersList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchCustomersList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.list = action.payload.data;
      })
      .addCase(fetchCustomersList.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(fetchOneCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
      })
      .addCase(fetchOneCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(createCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCustomer.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(editCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCustomer.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(deleteCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCustomer.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      });
  },
});
export const { setCustomer } = customersSlice.actions;
export default customersSlice.reducer;
