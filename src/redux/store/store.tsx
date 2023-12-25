import { configureStore } from '@reduxjs/toolkit';
import customersReducer from './thunks/customers';
import categoryReducer from './thunks/category';
import productReducer from './thunks/products';
import voucherReducer from './thunks/defaultVouchers';
import locationReducer from './thunks/location';
import ordersReducer from './thunks/defaultOrders';


const store = configureStore({
  reducer: {
    customers: customersReducer,
    category: categoryReducer,
    products: productReducer,
    vouchers: voucherReducer,
    locations: locationReducer,
    orders: ordersReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
