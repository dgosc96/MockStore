import type { QueryClient } from '@tanstack/react-query';
import { productQueryAll } from '../../../api/products';
import { preloadImage } from '../../../utils/preloadImage';

export const productListLoader = (queryClient: QueryClient) => async () => {
  const imagePromises: Array<Promise<any>> = [];
  const products = await queryClient.fetchQuery(productQueryAll());

  products.forEach(({ image }) => imagePromises.push(preloadImage(image)));

  await Promise.all(imagePromises);
  return products;
};
