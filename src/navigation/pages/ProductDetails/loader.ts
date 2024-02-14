import type { QueryClient } from '@tanstack/react-query';
import { productQuerySingle } from '../../../adapters/products';
import type { Params } from 'react-router-dom';

export const productDetailsLoader = async (
  queryClient: QueryClient,
  params: Params<string>,
) => {
  if (!params.productId)
    throw new Error('productDetailsLoader: productId param is undefined');
  const id = parseInt(params.productId);
  return queryClient.fetchQuery(productQuerySingle(id));
};
