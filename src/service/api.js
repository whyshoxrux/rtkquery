import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// RTK Query API ob'ektini yaratish
export const articlesApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mustafocoder.pythonanywhere.com",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // Maqolalar ro'yxatini olish
    getArticles: builder.query({
      query: () => "api/articles/",
    }),

    // Bitta maqolani olish
    getSingleArticle: builder.query({
      query: (id) => `api/article/${id}/`,
    }),

    // Maqola yaratish
    createArticle: builder.mutation({
      query: ({ body, token }) => ({
        url: "api/articles/create/",
        method: "POST",
        body,
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }),
    }),

    // Maqolani o'chirish
    deleteArticle: builder.mutation({
      query: (id) => ({
        url: `api/articles/${id}/delete/`,
        method: "DELETE",
      }),
    }),

    // Maqolani yangilash
    updateArticle: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/articles/${id}/update/`,
        method: "PUT",
        body,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    }),

    // Foydalanuvchi ma'lumotlarini olish
    getUser: builder.query({
      query: (token) => ({
        url: "/auth/user/",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }),
    }),

    // Login qilish
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login/",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    // Ro'yxatdan o'tish
    signup: builder.mutation({
      query: (body) => ({
        url: "/auth/signup/",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

// Hooklarni eksport qilish
export const {
  useGetArticlesQuery,
  useGetSingleArticleQuery,
  useCreateArticleMutation,
  useDeleteArticleMutation,
  useUpdateArticleMutation,
  useGetUserQuery,
  useLoginMutation,
  useSignupMutation,
} = articlesApi;
