import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: [],
    },
    reducers: {
        fetchProduct: (state, action) => {
            console.log('action', action);
            state.product.push(...action.payload);
        },
    },
});

export const { fetchProduct } = productSlice.actions;

export default productSlice.reducer;
