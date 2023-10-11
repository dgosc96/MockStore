import type { QueryClient } from '@tanstack/react-query';
import { productListQuery } from '../../../api/products';

export const productListLoader = (queryClient: QueryClient) => async () =>
  queryClient.fetchQuery(productListQuery());
