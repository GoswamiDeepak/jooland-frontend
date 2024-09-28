import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'product',
    initialState: {
        page: '',
        totalpage: '',
        totalDocument: '',
        product: [],
        priceRange: {},
    },
    reducers: {
        fetchProduct: (state, action) => {
            state.page = action.payload.currentPage;
            state.totalpage = action.payload.totalPages;
            state.totalDocument = action.payload.totalDocuments;
            state.product = action.payload.products;
            state.priceRange = action.payload.priceRange;
        },
    },
});

export const { fetchProduct } = productSlice.actions;

export default productSlice.reducer;
