import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from '../slices/user/userSlice';
import productReducer from '../slices/Product/productSlice';

export const store = configureStore({
    reducer: {
        user: userSliceReducer,
        product: productReducer,
    },
});
