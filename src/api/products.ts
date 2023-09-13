import { ZodError, z } from "zod";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

/* TODO: make it env */
const API_URL = "https://fakestoreapi.com";
/* TODO_END */

export const useProductList = () => {
  return useQuery<TProduct[], AxiosError | ZodError>({
    queryKey: ["products"],
    queryFn: async () => {
      const data = await fetchProducts();
      const products = validateProducts(data);
      return products;
    },
  });
};

const fetchProducts = async () => {
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
