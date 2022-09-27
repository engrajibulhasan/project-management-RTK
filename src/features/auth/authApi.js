import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // .mutation is used for POST request
        register: builder.mutation({
            query: (data) => ({
                url: "/register",
                method: "POST",
                body: data
            }),
            // Another action will occur after this query success
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    const payload = {
                        accessToken: result.data.accessToken,
                        user: result.data.user
                    }
                    // Local Storage Save
                    localStorage.setItem('auth', JSON.stringify(payload))
                    // Dispatch another action for local store
                    dispatch(userLoggedIn(payload))
                } catch (error) {

                }
            }
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data
            }),
            // Another action will occur after this query success
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    const payload = {
                        accessToken: result.data.accessToken,
                        user: result.data.user
                    }
                    // Local Storage Save
                    localStorage.setItem('auth', JSON.stringify(payload))
                    // Dispatch another action for local store
                    dispatch(userLoggedIn(payload))
                } catch (error) {

                }
            }
        })
    })
})

export const { useRegisterMutation, useLoginMutation } = authApi;