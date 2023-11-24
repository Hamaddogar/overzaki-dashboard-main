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

export interface ICategoryForm extends IRequest {
  name: string;
  balance?: number;
  // examples
}

export const fetchCategorysList = createAsyncThunk(
  'category/fetchList',
  async (params: IRequest, { rejectWithValue }) => {
    try {
      const response = await getRequest(`${endpoints.category.list}`, defaultConfig);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSubCategorysList = createAsyncThunk(
  'category/fetchSubCatList',
  async (params: IRequest, { rejectWithValue }) => {
    try {
      const response = await getRequest(`${endpoints.subCategory.list}`, defaultConfig);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOneCategory = createAsyncThunk(
  'category/fetchOne',
  async (categoryId: number) => {
    const response = await getRequest(
      `${endpoints.category._list}/${categoryId}?lang=fr`,
      defaultConfig
    );

    return response.data;
  }
);
export const fetchOneSubCategory = createAsyncThunk(
  'category/fetchOneSubcat',
  async (subCategoryId: number) => {
    const response = await getRequest(
      `${endpoints.subCategory._list}/${subCategoryId}`,
      defaultConfig
    );

    return response.data;
  }
);

export const createCategory = createAsyncThunk('category/create', async (data: ICategoryForm) => {
  defaultConfig.headers['Content-Type'] = 'multipart/form-data';
  const response = await postRequest(endpoints.category.create, data, defaultConfig);

  return response.data;
});

export const createSubCategory = createAsyncThunk(
  'category/createSubCat',
  async (data: ICategoryForm) => {
    defaultConfig.headers['Content-Type'] = 'multipart/form-data';
    const response = await postRequest(endpoints.subCategory.create, data, defaultConfig);

    return response.data;
  }
);

export const editCategory = createAsyncThunk(
  'category/edit',
  async (payload: { categoryId: number; data: ICategoryForm }) => {
    defaultConfig.headers['Content-Type'] = 'multipart/form-data';

    const { categoryId, data } = payload;
    const response = await putRequest(
      `${endpoints.category._list}/${categoryId}`,
      data,
      defaultConfig
    );

    return response.data;
  }
);
export const editSubCategory = createAsyncThunk(
  'category/editSubcat',
  async (payload: { subcategoryId: number; data: ICategoryForm }) => {
    defaultConfig.headers['Content-Type'] = 'multipart/form-data';

    const { subcategoryId, data } = payload;
    const response = await putRequest(
      `${endpoints.subCategory._list}/${subcategoryId}`,
      data,
      defaultConfig
    );

    return response.data;
  }
);

export const deleteCategory = createAsyncThunk('category/delete', async (categoryId: number) => {
  const response = await deleteRequest(`${endpoints.category._list}/${categoryId}`, defaultConfig);

  return response.data;
});
export const deleteSubCategory = createAsyncThunk(
  'category/deleteSubcat',
  async (subCategoryId: number) => {
    const response = await deleteRequest(
      `${endpoints.subCategory._list}/${subCategoryId}`,
      defaultConfig
    );

    return response.data;
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    list: [] as any,
    category: null as any,
    subCatList: [] as any,
    subCategory: null as any,
    loading: false,
    error: null as string | null,
    status: 'idle',
  },
  reducers: {
    setCategory: (state, action: PayloadAction<any>) => {
      state.category = action.payload;
    },
    setSubCategory: (state, action: PayloadAction<any>) => {
      console.log('action', action);
      state.subCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchCategorysList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchCategorysList.fulfilled, (state, action: any) => {
        state.status = 'succeeded';
        state.loading = false;
        state.list = action.payload.data.data;
      })
      .addCase(fetchCategorysList.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(fetchOneCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(fetchOneCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(fetchOneSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneSubCategory.fulfilled, (state, action) => {
        const subCategoryObj: any = {
          ...action.payload,
          category: action.payload.category.id,
          name: {
            en: action.payload.name,
            ar: '',
          },
        };
        state.loading = false;
        // state.subCategory = action.payload;
        state.subCategory = subCategoryObj;
      })
      .addCase(fetchOneSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action: any) => {
        state.loading = false;
        state.list.unshift(action.payload);
        // state.list = [...state.list , newData]
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(editCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })
      .addCase(editSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editSubCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })

      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })
      .addCase(deleteSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubCategory.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })
      .addCase(fetchSubCategorysList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchSubCategorysList.fulfilled, (state, action: any) => {
        state.status = 'succeeded';
        state.loading = false;
        state.subCatList = action.payload.data.data;
      })
      .addCase(fetchSubCategorysList.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      })
      .addCase(createSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubCategory.fulfilled, (state, action: any) => {
        state.loading = false;
        // state.subCatList.unshift(action.payload);
      })
      .addCase(createSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : null;
      });
  },
});
export const { setCategory, setSubCategory } = categorySlice.actions;
export default categorySlice.reducer;
