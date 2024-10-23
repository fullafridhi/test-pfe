import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
        state.user = action.payload;
        },
    },
});


export const { setAuthUser,logout } = authSlice.actions;
export default authSlice.reducer;
