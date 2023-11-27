import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { IAccountDetailsRequest } from 'src/types/request/accountDetails';
import {
  getRequest,
  endpoints,
  defaultConfig,
  postRequest,
  putRequest,
  deleteRequest,
} from 'src/utils/axios';

export const fetchAccountDetailssList = createAsyncThunk('accountDetails/fetchList', async () => {
  const response = await getRequest(`${endpoints.accountDetails.list}`, defaultConfig);

  return response;
});

export const fetchOneAccountDetails = createAsyncThunk(
  'accountDetails/fetchOne',
  async (accountDetailsId: number) => {
    const response = await getRequest(
      `${endpoints.accountDetails.list}/${accountDetailsId}`,
      defaultConfig
    );

    return response.data;
  }
);

export const createAccountDetails = createAsyncThunk('accountDetails/create', async (data: any) => {
  const response = await postRequest(endpoints.accountDetails.list, data, defaultConfig);

  return response.data;
});

export const editAccountDetails = createAsyncThunk(
  'accountDetails/edit',
  async (payload: { accountDetailsId: number; data: any }) => {
    const { accountDetailsId, data } = payload;
    const response = await putRequest(
      `${endpoints.accountDetails.list}/${accountDetailsId}`,
      data,
      defaultConfig
    );

    return response.data;
  }
);

export const deleteAccountDetails = createAsyncThunk(
  'accountDetails/delete',
  async (accountDetailsId: number) => {
    const response = await deleteRequest(
      `${endpoints.accountDetails.list}/${accountDetailsId}`,
      defaultConfig
    );

    return response.data;
  }
);

const accountDetailsSlice = createSlice({
  name: 'accountDetails',
  initialState: {
    list: [],
    accountDetails: null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setAccountDetails: (state, action: PayloadAction<any>) => {
      state.accountDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchAccountDetailssList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccountDetailssList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAccountDetailssList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(fetchOneAccountDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneAccountDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.accountDetails = action.payload;
      })
      .addCase(fetchOneAccountDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(createAccountDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccountDetails.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createAccountDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(editAccountDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editAccountDetails.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editAccountDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(deleteAccountDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccountDetails.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteAccountDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      });
  },
});
export const { setAccountDetails } = accountDetailsSlice.actions;
export default accountDetailsSlice.reducer;
