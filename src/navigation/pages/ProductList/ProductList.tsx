import { useQuery } from '@tanstack/react-query';
import { type TProduct, productQueryAll } from '../../../api/products';
import { useLoaderData } from 'react-router-dom';
import { productListLoader } from './loader';
import { ProductTile } from './components/ProductTile';
import { DivFadeIn } from '../../../components/DivFadeIn';

export const ProductList = () => {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof productListLoader>>
  >;
  const { data: products } = useQuery({ ...productQueryAll(), initialData });
  return (
    <DivFadeIn
      className={`mx-3 my-8 flex max-w-screen-xl flex-col justify-center gap-x-10 gap-y-5 sm:mx-auto sm:my-20 sm:flex-row sm:flex-wrap sm:gap-y-20`}
    >
      {products.map((val: TProduct) => (
        <ProductTile key={`ProductTile_${val.id}`} data={val} />
      ))}
    </DivFadeIn>
  );
};
