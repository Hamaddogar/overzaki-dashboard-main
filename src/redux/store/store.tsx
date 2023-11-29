import { configureStore } from '@reduxjs/toolkit';
import customersReducer from './thunks/customers';
import categoryReducer from './thunks/category';
import productReducer from './thunks/products';
import voucherReducer from './thunks/defaultVouchers';


const store = configureStore({
  reducer: {
    customers: customersReducer,
    category: categoryReducer,
    products: productReducer,
    vouchers: voucherReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
