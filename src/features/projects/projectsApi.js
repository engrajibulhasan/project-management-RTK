import { apiSlice } from "../api/apiSlice";

export const projectsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: (email) => ({
                url: `/projects?participants_like=${email}&_sort=timestamp&_order=desc`,
                method: "GET"
            }),
            keepUnusedDataFor: 600,
            providesTags: ["Projects"]
        }),
        getProject: builder.query({
            // here name is team name
            query: (id) => ({
                url: `/teams?id=${id}`,
                method: "GET"
            })
        }),
        createProject: builder.mutation({
            query: (data) => ({
                url: "/projects",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Projects"]
        }),
        updateProject: builder.mutation({
            query: ({ id, data }) => ({
                url: `/projects/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["Projects"]
        }),
        removeProject: builder.mutation({
            query: (id) => ({
                url: `/projects/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Projects"]
        })

    })
})

export const { useGetProjectsQuery, useGetProjectQuery, useCreateProjectMutation, useUpdateProjectMutation, useRemoveProjectMutation } = projectsApi;