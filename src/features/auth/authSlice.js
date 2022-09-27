import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: undefined,
    user: undefined
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            return action.payload;
        },
        userLoggedOut: (state, action) => {
            state.accessToken = undefined
            state.user = undefined
        }
    }
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;