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

export interface IBuilderForm extends IRequest {
  name: string;
  balance: number;
  // examples
}

export const fetchBuilderList = createAsyncThunk(
  'builder/fetchList',
  async (params: IRequest, { rejectWithValue }) => {
    try {
      const response = await getRequest(endpoints.builder.get, defaultConfig());
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createSocketRequest = createAsyncThunk(
  'builder/socket',
  async (data: any) => data
  // const response = await postRequest(endpoints.builder.list, data, defaultConfig());
  // return response.data;
);
export const createBuilderFun = createAsyncThunk('builder/create', async (data: any) => {
  let headersObj = defaultConfig();
  headersObj.headers['Content-Type'] = 'multipart/form-data';
  const response = await postRequest(endpoints.builder.list, data, headersObj);
  console.log('response', response);

  return response;
});

export const editDesignBuilder = createAsyncThunk('builder/editDesignBuilder', async () => {
  const response = await getRequest(endpoints.analytic.customers, defaultConfig());

  return response;
});

export const builderActivateWebsite = createAsyncThunk(
  'builder/builderActivateWebsite',
  async (builderId: number) => {
    const response = await getRequest(
      `${endpoints.analytic.summary}/${builderId}`,
      defaultConfig()
    );

    return response.data;
  }
);

export const saveBuilderSettings = createAsyncThunk(
  'builder/saveBuilderSettings',
  async (data: any) => {
    const response = await putRequest(endpoints?.builder?.save, data, defaultConfig());

    return response.data;
  }
);

export const saveLogo = createAsyncThunk('builder/saveLogo', async ({ builderId, data }: any) => {
  let headersObj = defaultConfig();
  headersObj.headers['Content-Type'] = 'multipart/form-data';
  const response = await putRequest(`${endpoints?.builder?.logo}/${builderId}`, data, headersObj);
  return response.data;
});
export const saveHeaderImage = createAsyncThunk(
  'builder/saveHeaderImage',
  async ({ builderId, data }: any) => {
    let headersObj = defaultConfig();
    headersObj.headers['Content-Type'] = 'multipart/form-data';
    const response = await putRequest(
      `${endpoints?.builder?.headerImage}/${builderId}`,
      data,
      headersObj
    );
    return response.data;
  }
);

export const builderActivateApplication = createAsyncThunk(
  'builder/builderActivateApplication',
  async (data: IBuilderForm) => {
    const response = await postRequest(endpoints.analytic.vouchers, data, defaultConfig());

    return response.data;
  }
);

export const builderSetObjectInDesign = createAsyncThunk(
  'builder/builderSetObjectInDesign',
  async ({ builderId, url, data }: any) => {
    if (url && builderId) {
      let headersObj = defaultConfig();
      headersObj.headers['x-tenant-id'] = url;
      headersObj.headers['Content-Type'] = 'multipart/form-data';
      const response = await putRequest(
        `${endpoints.builder.setObject}/${builderId}`,
        data,
        headersObj
      );
      return response.data;
    }
  }
);

// home Section
// Topbar > create ad appbar slider
export const createAdAppbarSlider = createAsyncThunk(
  'builder/createAdAppbarSlider',
  async ({ builderId, url, data }: any) => {
    if (url && builderId) {
      if (url.startsWith('https://')) {
        url = url.replace(/^https?:\/\//, '');
      }
      let headersObj = defaultConfig();
      headersObj.headers['x-tenant-id'] = url;
      headersObj.headers['Content-Type'] = 'multipart/form-data';
      const response = await postRequest(
        `${endpoints.builder.home.adAppBar.createSlider}/${builderId}`,
        data,
        headersObj
      );
      return response.data;
    }
  }
);

// Topbar > remove ad appbar slider
export const removeAdAppbarSlider = createAsyncThunk(
  'builder/removeAdAppbarSlider',
  async ({ builderId, url, data, itemId }: any) => {
    if (url && builderId) {
      if (url.startsWith('https://')) {
        url = url.replace(/^https?:\/\//, '');
      }
      let headersObj = defaultConfig();
      headersObj.headers['x-tenant-id'] = url;
      headersObj.headers['data'] = JSON.stringify(data);

      const response = await deleteRequest(
        `${endpoints.builder.home.adAppBar.removeSlider}/${builderId}/lists/${itemId}`,
        headersObj
      );
      return response.data;
    }
  }
);
export const updateBasicAdAppbar = createAsyncThunk(
  'builder/updateBasicAdAppbar',
  async ({ builderId, url, data }: any) => {
    if (url && builderId) {
      if (url.startsWith('https://')) {
        url = url.replace(/^https?:\/\//, '');
      }
      let headersObj = defaultConfig();
      headersObj.headers['x-tenant-id'] = url;
      // headersObj.headers['Content-Type'] = 'multipart/form-data';
      const response = await putRequest(
        `${endpoints.builder.home.adAppBar.updateBasicSlider}/${builderId}`,
        data,
        headersObj
      );
      return response.data;
    }
  }
);
export const updateBasicAppbar = createAsyncThunk(
  'builder/updateBasicAppbar',
  async ({ builderId, url, data }: any) => {
    if (url && builderId) {
      if (url.startsWith('https://')) {
        url = url.replace(/^https?:\/\//, '');
      }
      let headersObj = defaultConfig();
      headersObj.headers['x-tenant-id'] = url;
      headersObj.headers['Content-Type'] = 'multipart/form-data';
      const response = await putRequest(
        `${endpoints.builder.home.adAppBar.updateBasicAppBar}/${builderId}`,
        data,
        headersObj
      );
      return response.data;
    }
  }
);
export const getBuilderDetails = createAsyncThunk(
  'builder/getBuilderDetails',
  async ({ builderId, url }: any) => {
    if (url && builderId) {
      if (url.startsWith('https://')) {
        url = url.replace(/^https?:\/\//, '');
      }
      let headersObj = defaultConfig();
      headersObj.headers['x-tenant-id'] = url;
      headersObj.headers['Content-Type'] = 'multipart/form-data';
      const response = await getRequest(
        `${endpoints.builder.design}?domain=${url}&type=temporary`,
        headersObj
      );
      return response.data;
    }
  }
);
export const updateAdAppbarSlider = createAsyncThunk(
  'builder/updateAdAppbarSlider',
  async ({ builderId, url, data, itemId }: any) => {
    if (url && builderId) {
      if (url.startsWith('https://')) {
        url = url.replace(/^https?:\/\//, '');
      }
      let headersObj = defaultConfig();
      headersObj.headers['x-tenant-id'] = url;
      headersObj.headers['Content-Type'] = 'multipart/form-data';
      const response = await postRequest(
        `${endpoints.builder.home.adAppBar.updateSlider}/${builderId}/ad_app_bar/${itemId}`,
        data,
        headersObj
      );
      return response.data;
    }
  }
);

const builderSlice = createSlice({
  name: 'builder',
  initialState: {
    list: [],
    builder: null,
    loading: false,
    error: null as string | null,
    status: 'idle',
    builderDetails: null as any,
  },
  reducers: {
    setBuilder: (state, action: PayloadAction<any>) => {
      state.builder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchBuilderList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchBuilderList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.status = 'succeeded';
      })
      .addCase(fetchBuilderList.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })
      .addCase(saveBuilderSettings.pending, (state) => {})
      .addCase(saveBuilderSettings.fulfilled, (state, action) => {
        state.builder = action.payload;
      })
      .addCase(saveBuilderSettings.rejected, (state, action) => {})

      .addCase(createBuilderFun.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBuilderFun.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createBuilderFun.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(editDesignBuilder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editDesignBuilder.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(editDesignBuilder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(builderActivateWebsite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(builderActivateWebsite.fulfilled, (state, action) => {
        state.loading = false;
        state.builder = action.payload;
      })
      .addCase(builderActivateWebsite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(builderActivateApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(builderActivateApplication.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(builderActivateApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(getBuilderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })
      .addCase(getBuilderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBuilderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.builderDetails = action.payload;
      });
  },
});
export const { setBuilder } = builderSlice.actions;
export default builderSlice.reducer;
