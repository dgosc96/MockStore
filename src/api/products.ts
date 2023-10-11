import { ZodError, z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

/* TODO: make it env */
const API_URL = 'https://dummyjson.com';
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
    return Promise.resolve(products.products);
  },
  staleTime: 1000 * 60,
});

const fetchProducts = async (): Promise<unknown> => {
  return axios.get(`${API_URL}/products`).then((response) => response.data);
};

const validateProducts = (data: unknown) => {
  return ProductArraySchema.parse(data);
};

const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  brand: z.string(),
  category: z.string(),
  thumbnail: z.string(),
  images: z.array(z.string()),
});

const ProductArraySchema = z.object({
  products: z.array(ProductSchema),
  skip: z.number(),
  total: z.number(),
  limit: z.number(),
});

export type TProduct = z.infer<typeof ProductSchema>;
