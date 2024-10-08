import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {},
    isLogged: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loggedIn: (state, action) => {
            state.user = { ...action.payload };
            state.isLogged = true;
        },
        loggedOut: (state) => {
            state.user = '';
            state.isLogged = false;
        },
    },
});

export const { loggedIn, loggedOut } = userSlice.actions;

export default userSlice.reducer;
