import { useQuery } from '@tanstack/react-query';
import { type TProduct, productQueryAll } from '../../adapters/products';
import { useLoaderData, useLocation } from 'react-router-dom';
import { productListLoader } from './loader';
import { ProductTile } from './components/ProductTile';
import { DivFadeIn } from '../../components/DivFadeIn';
import { searchProducts, processSearchTerm } from '../../lib/search/search';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';

export const ProductList = () => {
  const initialData = useLoaderData() as Awaited<
    ReturnType<typeof productListLoader>
  >;
  const { data: products, error } = useQuery({
    ...productQueryAll(),
    initialData,
  });
  const location = useLocation();
  const URLParams = new URLSearchParams(location.search);

  const searchTermParam = URLParams.get('search');
  const categoryParam = URLParams.get('category');

  const filterProductsBySearchParams = () => {
    let filteredProducts = products;
    if (searchTermParam)
      filteredProducts = searchProducts(
        products,
        processSearchTerm(searchTermParam),
      );
    if (categoryParam)
      filteredProducts = filteredProducts.filter(
        (product) => product.category === categoryParam,
      );
    return filteredProducts;
  };

  if (error) return 'An error has occurred: ' + error.message;
  return (
    <DivFadeIn>
      {categoryParam && (
        <h1 className='mx-auto mt-5 w-fit font-ysabeau text-5xl text-neutral-600'>
          {capitalizeFirstLetter(categoryParam)}
        </h1>
      )}
      <div
        className={`my-8 flex max-w-screen-xl flex-col justify-center gap-x-8 gap-y-5 px-3 sm:mx-auto sm:my-10 sm:flex-row sm:flex-wrap sm:gap-y-14`}
      >
        {filterProductsBySearchParams().map((val: TProduct) => (
          <ProductTile key={`ProductTile_${val.id}`} data={val} />
        ))}
      </div>
    </DivFadeIn>
  );
};
