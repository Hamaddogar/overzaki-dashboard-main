import { configureStore } from '@reduxjs/toolkit';
import customersReducer from './thunks/customers';
import categoryReducer from './thunks/category';


const store = configureStore({
  reducer: {
    customers: customersReducer,
    category: categoryReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
