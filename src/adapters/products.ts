import { ZodError, z } from 'zod';
import { queryOptions, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

/* TODO: make it env */
const API_URL = 'https://fakestoreapi.com';
/* TODO_END */

const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string(),
  rating: z.object({
    rate: z.number(),
    count: z.number(),
  }),
});

export type TProduct = z.infer<typeof ProductSchema>;

export const useProduct = (id: number) => {
  return useQuery<TProduct, AxiosError | ZodError>(productQuerySingle(id));
};

export const productQuerySingle = (id: number) => ({
  queryKey: ['products', id],
  queryFn: async (): Promise<TProduct> =>
    axios
      .get(`${API_URL}/products/${id}`)
      .then((response) => ProductSchema.parse(response.data)),
  staleTime: Infinity,
});

const ProductArraySchema = ProductSchema.array();

export const productQueryAll = () =>
  queryOptions({
    queryKey: ['products'],
    queryFn: async (): Promise<TProduct[]> =>
      axios.get(`${API_URL}/products`).then((response) =>
        ProductArraySchema.parse(
          // wrap inside array if it's not
          Array.isArray(response.data) ? response.data : [response.data],
        ),
      ),
    staleTime: Infinity,
  });

export const useProductList = () => useQuery(productQueryAll());

const CategoriesSchema = z.array(z.string());

export const categoriesQueryOptions = () =>
  queryOptions({
    queryKey: ['categories'],
    queryFn: async (): Promise<string[]> =>
      axios
        .get(`${API_URL}/products/categories`)
        .then((response) => CategoriesSchema.parse(response.data)),
    staleTime: Infinity,
  });

export const useCategories = () => useQuery(categoriesQueryOptions());
