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
} from 'src/utils/axios';

export interface ICustomerForm extends IRequest {
  name: string;
  balance: number;
  // examples
}
export const fetchPaymentMethodsList = createAsyncThunk(
  'paymentMethod/fetchList',
  async (paramsData: any = null) => {
    try {
      if (paramsData) {
        const { pageNumber, pageSize } = paramsData;
        const response = await getRequestWithParams(
          `${endpoints.paymentMethod.list}?pageSize=${pageSize}&pageNumber=${pageNumber}`,
          defaultConfig()
        );
        return response.data;
      }
      const response = await getRequestWithParams(
        `${endpoints.paymentMethod.list}/all`,
        defaultConfig()
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const fetchOnePaymentMethods = createAsyncThunk(
  'paymentMethod/fetchOne',
  async (paymentMethodId: any) => {
    const response = await getRequest(
      `${endpoints.paymentMethod.list}/${paymentMethodId}`,
      defaultConfig()
    );
    return response.data || {};
  }
);

export const createPaymentMothod = createAsyncThunk(
  'paymentMethod/create',
  async (data: ICustomerForm) => {
    defaultConfig().headers['Content-Type'] = 'multipart/form-data';
    const response = await postRequest(endpoints.paymentMethod.list, data, defaultConfig());

    return response.data;
  }
);

export const editPaymentMethods = createAsyncThunk(
  'paymentMethod/edit',
  async (payload: { paymentMethodId: any; data: ICustomerForm }) => {
    defaultConfig().headers['Content-Type'] = 'multipart/form-data';
    const { paymentMethodId, data } = payload;
    const response = await putRequest(
      `${endpoints.paymentMethod.list}/${paymentMethodId}`,
      data,
      defaultConfig()
    );

    return response.data;
  }
);

export const deletePaymentMethods = createAsyncThunk(
  'paymentMethod/delete',
  async (paymentMethodId: any) => {
    const response = await deleteRequest(
      `${endpoints.paymentMethod.list}/${paymentMethodId}`,
      defaultConfig()
    );

    return response.data;
  }
);

const paymentMethodsSlice = createSlice({
  name: 'paymentMthods',
  initialState: {
    list: [],
    paymentMethod: null as any,
    loading: false,
    error: null as string | null,
    status: 'idle',
  },
  reducers: {
    setPaymentMethod: (state, action: PayloadAction<any>) => {
      state.paymentMethod = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetAllReducers, (state) => {
        // Reset the state for the customers reducer
        state.status = 'idle';
        state.list = []; // Replace with your initial state
      })
      .addCase(fetchPaymentMethodsList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchPaymentMethodsList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.list = action.payload.data;
      })
      .addCase(fetchPaymentMethodsList.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(fetchOnePaymentMethods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOnePaymentMethods.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentMethod = action.payload;
      })
      .addCase(fetchOnePaymentMethods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(createPaymentMothod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentMothod.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createPaymentMothod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(editPaymentMethods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPaymentMethods.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editPaymentMethods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(deletePaymentMethods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePaymentMethods.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deletePaymentMethods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      });
  },
});
export const { setPaymentMethod } = paymentMethodsSlice.actions;
export default paymentMethodsSlice.reducer;
