import { useQuery } from '@tanstack/react-query';
import { type TProduct, productQueryAll } from '../../adapters/products';
import { useLoaderData, useLocation } from 'react-router-dom';
import { productListLoader } from './loader';
import { ProductTile } from './components/ProductTile';
import { DivFadeIn } from '../../components/DivFadeIn';
import { searchProducts, processSearchTerm } from '../../lib/search/search';

export const ProductList = () => {
  const initialData = useLoaderData() as Awaited<
    ReturnType<typeof productListLoader>
  >;
  const { data: products, error } = useQuery({
    ...productQueryAll(),
    initialData,
  });

  const filterProductsBySearchParams = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search).get('search');

    if (searchParams === null) {
      return products;
    }
    return searchProducts(products, processSearchTerm(searchParams));
  };
  if (error) return 'An error has occurred: ' + error.message;
  return (
    <DivFadeIn
      className={`mx-3 my-8 flex max-w-screen-xl flex-col justify-center gap-x-10 gap-y-5 sm:mx-auto sm:my-20 sm:flex-row sm:flex-wrap sm:gap-y-20`}
    >
      {filterProductsBySearchParams().map((val: TProduct) => (
        <ProductTile key={`ProductTile_${val.id}`} data={val} />
      ))}
    </DivFadeIn>
  );
};
