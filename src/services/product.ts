import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/product"
    }),
    tagTypes: ["product"],
    endpoints: (builder) => ({
        getAllProducts: builder.query<any, any>({
            query: () => ({
                url: "/"
            })
        })
    })
})

export const {useGetAllProductsQuery} = productApi