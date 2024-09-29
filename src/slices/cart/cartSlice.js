import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
    },

    reducers: {
        fetchCart: (state, action) => {
            state.cart = action.payload;
        },
    },
});

export const { fetchCart } = cartSlice.actions;

export default cartSlice.reducer;
