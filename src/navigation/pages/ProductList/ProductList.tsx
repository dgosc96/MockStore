import { useQuery } from '@tanstack/react-query';
import { type TProduct, productListQuery } from '../../../api/products';
import { useLoaderData } from 'react-router-dom';
import { productListLoader } from './loader';
import { useRef, useState } from 'react';
import { ProductTile } from './components/ProductTile';

export const ProductList = () => {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof productListLoader>>
  >;
  const { data: products } = useQuery({ ...productListQuery(), initialData });

  const tileLoadCount = useRef<number>(0);
  const [areTilesLoaded, setAreTilesLoaded] = useState<boolean>(false);

  const onTileLoad = () => {
    tileLoadCount.current++;
    console.log(tileLoadCount, products.length);
    if (tileLoadCount.current == products.length - 1) {
      setAreTilesLoaded(true);
    }
  };

  return (
    <main
      className={`mx-3 my-6 flex max-w-screen-xl flex-col justify-center gap-x-6 gap-y-4 transition-opacity duration-100 ease-linear sm:mx-auto sm:flex-row sm:flex-wrap sm:gap-y-8 ${
        !areTilesLoaded && ' invisible opacity-0'
      }`}
    >
      {products.map((val: TProduct) => (
        <ProductTile key={val.id} data={val} onLoad={onTileLoad} />
      ))}
    </main>
  );
};
