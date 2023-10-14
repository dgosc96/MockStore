import { ZodError, z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

/* TODO: make it env */
const API_URL = 'https://fakestoreapi.com';
/* TODO_END */

export const useProductList = () => {
  return useQuery<TProduct[], AxiosError | ZodError>(productListQuery());
};

export const productListQuery = () => ({
  queryKey: ['products'],
  queryFn: async (): Promise<TProduct[]> => {
    const data = await fetchProducts();
    console.log(data);
    const products = validateProducts(data);
    return Promise.resolve(products);
  },
  staleTime: 1000 * 60,
});

const fetchProducts = async (): Promise<unknown> => {
  return axios.get(`${API_URL}/products`).then((response) => response.data);
};

const validateProducts = (data: unknown) => {
  return ProductArraySchema.parse(Array.isArray(data) ? data : [data]);
};

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

const ProductArraySchema = ProductSchema.array();

export type TProduct = z.infer<typeof ProductSchema>;
