import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IOrdersRequest } from 'src/types/request/orders';
import {
  getRequest,
  endpoints,
  defaultConfig,
  postRequest,
  putRequest,
  deleteRequest,
} from 'src/utils/axios';


export const fetchOrderssList = createAsyncThunk('orders/fetchList', async () => {

  const response = await getRequest(`${endpoints.orders.list}`, defaultConfig);

  return response;
});

export const fetchOneOrders = createAsyncThunk(
  'orders/fetchOne',
  async (ordersId: number) => {
    const response = await getRequest(`${endpoints.orders.list}/${ordersId}`, defaultConfig);

    return response.data;
  }
);

export const createOrders = createAsyncThunk('orders/create', async (data: IOrdersRequest) => {
  const response = await postRequest(endpoints.orders.list, data, defaultConfig);

  return response.data;
});

export const editOrders = createAsyncThunk(
  'orders/edit',
  async (payload : {ordersId: number, data: IOrdersRequest}) => {
    const { ordersId, data} = payload
    const response = await putRequest(
      `${endpoints.orders.list}/${ordersId}`,
      data,
      defaultConfig
    );

    return response.data;
  }
);

export const deleteOrders = createAsyncThunk('orders/delete', async (ordersId: number) => {
  const response = await deleteRequest(`${endpoints.orders.list}/${ordersId}`, defaultConfig);

  return response.data;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    list: [],
    orders: null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setOrders: (state, action: PayloadAction<any>) => {
      state.orders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchOrderssList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderssList.fulfilled, (state, action) => {

        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchOrderssList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(fetchOneOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
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
      })
  },
});
export const { setOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
