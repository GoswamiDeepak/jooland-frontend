import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from '../slices/user/userSlice';


export const store = configureStore({
    reducer: {
        user: userSliceReducer,
    },
});
