import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { resetAllReducers } from './resetSlice';
// import { IOrdersRequest } from 'src/types/request/orders';
import {
  getRequest,
  endpoints,
  defaultConfig,
  postRequest,
  putRequest,
  deleteRequest,
  getRequestWithParams,
} from 'src/utils/axios';

export const fetchOrderssList = createAsyncThunk(
  'orders/fetchList',
  async (paramsData: any = undefined) => {
    try {
      if (paramsData !== undefined) {
        const { pageNumber, pageSize } = paramsData;
        const response = await getRequest(
          `${endpoints.orders.list}/all?pageSize=${pageSize}&pageNumber=${pageNumber}`,
          defaultConfig()
        );
        return response.data;
      }
      // const response = await getRequest(`${endpoints.orders.myOrders}`, defaultConfig());
      // return response.data;
      const response = await getRequest(`${endpoints.orders.list}/all`, defaultConfig());
      console.log(response?.data);

      return response?.data?.data;
    } catch (error) {
      return error;
    }
  }
);

export const fetchOneOrders = createAsyncThunk('orders/fetchOne', async (ordersId: number) => {
  const response = await getRequest(`${endpoints.orders.list}/${ordersId}`, defaultConfig());

  return response.data;
});

export const createOrders = createAsyncThunk('orders/create', async (data: any) => {
  const response = await postRequest(endpoints.orders.viaAdmin, data, defaultConfig());

  return response.data;
});

export const editOrders = createAsyncThunk(
  'orders/edit',
  async (payload: { ordersId: number; data: any }) => {
    const { ordersId, data } = payload;
    const response = await putRequest(
      `${endpoints.orders.list}/${ordersId}`,
      data,
      defaultConfig()
    );

    return response.data;
  }
);

export const deleteOrders = createAsyncThunk('orders/delete', async (ordersId: number) => {
  const response = await deleteRequest(`${endpoints.orders.list}/${ordersId}`, defaultConfig());

  return response.data;
});

export const cancellOrder = createAsyncThunk('orders/cancell', async (ordersId: number) => {
  const response = await putRequest(`${endpoints.orders.cancel}/${ordersId}`, {}, defaultConfig());

  return response.data;
});
export const changeOrderStatus = createAsyncThunk(
  'orders/status',
  async (payload: { ordersId: any; data: any }) => {
    const { ordersId, data } = payload;
    const response = await putRequest(
      `${endpoints.orders.status}/${ordersId}`,
      data,
      defaultConfig()
    );

    return response.data;
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    list: [] as any,
    order: null as any,
    loading: false,
    error: null as string | null,
    status: 'idle',
  },
  reducers: {
    setOrders: (state, action: PayloadAction<any>) => {
      state.order = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetAllReducers, (state) => {
        // Reset the state for the customers reducer
        state.status = 'idle';
        state.list = []; // Replace with your initial state
      })
      .addCase(fetchOrderssList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchOrderssList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchOrderssList.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(fetchOneOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOneOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(createOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrders.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(editOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editOrders.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(deleteOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrders.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      });
  },
});
export const { setOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
