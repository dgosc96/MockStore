import { ZodError, z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

/* TODO: make it env */
const API_URL = 'https://fakestoreapi.com';
/* TODO_END */

export const useProductList = () => {
  return useQuery<TProduct[], AxiosError | ZodError>(productQueryAll());
};

export const productQueryAll = () => ({
  queryKey: ['products'],
  queryFn: async (): Promise<TProduct[]> => {
    const data = await axios
      .get(`${API_URL}/products`)
      .then((response) => response.data);
    const products = ProductArraySchema.parse(
      Array.isArray(data) ? data : [data], // wrap in array if it's not
    );
    return Promise.resolve(products);
  },
  staleTime: 1000 * 60,
});

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

export const useProduct = (id: number) => {
  return useQuery<TProduct, AxiosError | ZodError>(productQuerySingle(id));
};

export const productQuerySingle = (id: number) => ({
  queryKey: ['products', id],
  queryFn: async (): Promise<TProduct> => {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return ProductSchema.parse(response.data);
  },
  staleTime: 1000 * 60,
});
