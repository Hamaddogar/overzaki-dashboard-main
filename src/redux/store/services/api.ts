// apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'overzaki',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://www.overzaki.io/api',
        prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', `Bearer ${sessionStorage.getItem('accessToken')}`);
            return headers;
        }
    }),
    tagTypes: ['Theme', 'Style', 'Icon'],
    endpoints: (builder) => ({
        getThemeById: builder.query({
            query: (themeId) => `/app-theme/${themeId}`,
            providesTags: ['Theme'],
        }),
        addNewTheme: builder.mutation({
            query: (theme) => ({
                url: '/app-theme',
                body: theme,
                method: "POST"
            }),
            invalidatesTags: ['Theme'],
        }),
        getAllThemes: builder.query({
            query: (type) => type ? `/app-theme/all?filter=${type}` : `/app-theme/all`,
            providesTags: ['Theme'],
        }),
        updateTheme: builder.mutation({
            query: ({ id, theme }) => ({
                url: `/app-theme/${id}`,
                method: 'PUT',
                body: theme,
            }),
            invalidatesTags: ['Theme'],
        }),
        deleteTheme: builder.mutation({
            query: (themeId) => ({
                url: `/app-theme/${themeId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Theme'],
        }),
        // Style Endpoints
        getStyleById: builder.query({
            query: (styleId) => `/app-style/${styleId}`,
            providesTags: ['Style'],
        }),
        addNewStyle: builder.mutation({
            query: (style) => ({
                url: '/app-style',
                body: style,
                method: "POST"
            }),
            invalidatesTags: ['Style'],
        }),
        getAllStyles: builder.query({
            query: (type) => type ? `/app-style/all?filter=${type}` : `/app-style/all`,
            providesTags: ['Style'],
        }),
        updateStyle: builder.mutation({
            query: ({ id, ...style }) => ({
                url: `/app-style/${id}`,
                method: 'PUT',
                body: style,
            }),
            invalidatesTags: ['Style'],
        }),
        deleteStyle: builder.mutation({
            query: (styleId) => ({
                url: `/app-style/${styleId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Style'],
        }),
        // Icon Endpoints
        getIconById: builder.query({
            query: (iconId) => `/app-icon/${iconId}`,
            providesTags: ['Icon'],
        }),
        addNewIcon: builder.mutation({
            query: (icon) => ({
                url: '/app-icon',
                body: icon,
                method: "POST"
            }),
            invalidatesTags: ['Icon'],
        }),
        getAllIcons: builder.query({
            query: (type) => type ? `/app-icon/all?filter=${type}` : '/app-icon/all',
            providesTags: ['Icon'],
        }),
        updateIcon: builder.mutation({
            query: ({ id, ...icon }) => ({
                url: `/app-icon/${id}`,
                method: 'PUT',
                body: icon,
            }),
            invalidatesTags: ['Icon'],
        }),
        deleteIcon: builder.mutation({
            query: (iconId) => ({
                url: `/app-icon/${iconId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Icon'],
        }),
    }),
});

export type Api = typeof api;


export const {
    useAddNewThemeMutation,
    useGetAllThemesQuery,
    useDeleteThemeMutation,
    useGetThemeByIdQuery,
    useUpdateThemeMutation,
    useAddNewStyleMutation,
    useGetAllStylesQuery,
    useDeleteStyleMutation,
    useGetStyleByIdQuery,
    useUpdateStyleMutation,
    useAddNewIconMutation,
    useGetAllIconsQuery,
    useDeleteIconMutation,
    useGetIconByIdQuery,
    useUpdateIconMutation
} = api;
