import { useLoaderData } from 'react-router-dom';
import { productQuerySingle } from '../../../adapters/products';
import { PhotoModal } from '../../../components/PhotoModal';
import { useQuery } from '@tanstack/react-query';
import { productDetailsLoader } from './loader';
import { DivFadeIn } from '../../../components/DivFadeIn';

import { useShoppingCart } from '../../../context/ShopingCartContext';
import { toastCartItemAdd } from '../../../lib/notifications/toasts';

export const ProductDetails = () => {
  const initialData = useLoaderData() as Awaited<
    ReturnType<typeof productDetailsLoader>
  >;
  const { data: product } = useQuery({
    ...productQuerySingle(initialData.id),
    initialData,
  });

  const { increaseCartQuantity } = useShoppingCart();

  return (
    <DivFadeIn className='mx-auto mt-10 flex flex-col sm:min-h-[40rem] sm:max-w-screen-lg sm:flex-row'>
      <PhotoModal
        className='m-3 max-h-[20rem] cursor-pointer overflow-hidden object-contain transition-transform hover:scale-[1.02] sm:max-h-[40rem] sm:basis-3/4'
        src={product.image}
        alt={product.title}
      />
      <div className='m-3 flex basis-1/2 flex-col gap-3  '>
        <h1 className='text-center text-4xl font-bold'>{product.title}</h1>
        <div className='flex items-center justify-between'>
          <p className='ml-1 text-3xl font-bold text-red-700'>
            <span>$</span>
            {product.price.toFixed(2)}
          </p>
          <p className='text-sm'>
            {product.rating.rate.toFixed(1)}
            <span>⭐</span>
            <span className='ml-1 align-top text-xs text-gray-400'>
              {`(${product.rating.count} reviews)`}
            </span>
          </p>
        </div>
        <p className='text-xs text-gray-400'>
          <span className=' font-bold'>Category: </span>
          {product.category}
        </p>
        <p className=' grow font-sans leading-relaxed tracking-wide'>
          {product.description}
        </p>
        <div className='mb-5 flex flex-col justify-end gap-3'>
          <button
            onClick={() =>
              increaseCartQuantity(product.id) && toastCartItemAdd()
            }
            className=' rounded-full bg-red-500 p-4 font-semibold text-white transition-transform hover:scale-[1.01] '
          >
            ADD TO CART
          </button>
          <button className='rounded-full bg-gray-300 p-4 font-semibold transition-transform hover:scale-[1.01]'>
            ADD TO WISHLIST
          </button>
        </div>
      </div>
    </DivFadeIn>
  );
};
