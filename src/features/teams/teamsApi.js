import { apiSlice } from "../api/apiSlice";

export const teamsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTeams: builder.query({
            query: (email) => ({
                url: `/teams?members_like=${email}`,
                method: "GET"
            }),
            keepUnusedDataFor: 600,
            providesTags: ["Teams"]
        }),
        getTeam: builder.query({
            query: (teamName) => ({
                url: `/teams?name=${teamName}`,
                method: "GET"
            })
        }),
        createTeam: builder.mutation({
            query: (data) => ({
                url: "/teams",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Teams"]
        }),
        updateTeam: builder.mutation({
            query: ({ id, data }) => ({
                url: `/teams/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["Teams"]
        })
    })
})

export const { useGetTeamsQuery, useCreateTeamMutation, useGetTeamQuery, useUpdateTeamMutation } = teamsApi;