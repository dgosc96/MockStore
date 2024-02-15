import type { QueryClient } from '@tanstack/react-query';
import { productQueryAll } from '../../adapters/products';
import { preloadImage } from '../../utils/preloadImage';

export const productListLoader = async (queryClient: QueryClient) => {
  const imagePromises: Array<Promise<any>> = [];
  const products = await queryClient.fetchQuery(productQueryAll());

  products.forEach(({ image }) => imagePromises.push(preloadImage(image)));

  await Promise.all(imagePromises);

  return products;
};
