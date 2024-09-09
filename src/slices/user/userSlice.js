import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLogged: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loggedIn: (state, payload) => {
            state.isLogged = true;
        },
        loggedOut: (state) => {
            state.isLogged = false;
        },
    },
});

export const { loggedIn, loggedOut } = userSlice.actions;

export default userSlice.reducer;
