import { useParams } from 'react-router-dom';
import { useProductList } from '../..//../api/products';
import { Lightbox } from '../../../components/Lightbox';

export const ProductDetails = () => {
  const productId = useParams().productId;
  const { status, data: products } = useProductList();

  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }
  if (status === 'error' || productId === undefined) {
    return <h1>Upps, something went wrong </h1>;
  }

  const product = products[parseInt(productId) - 1];
  if (!product) {
    return;
  }

  return (
    <main className='mx-auto mt-10 flex flex-col sm:min-h-[40rem] sm:max-w-screen-lg sm:flex-row'>
      <Lightbox
        className='m-3 max-h-[20rem] cursor-pointer overflow-hidden object-contain transition-transform hover:scale-[1.02] sm:max-h-[40rem] sm:basis-3/4'
        src={product.image}
        alt={product.title}
      />
      <div className='m-3  flex basis-1/2 flex-col gap-3  '>
        <h1 className='text-center text-4xl font-bold'>{product.title}</h1>
        <div className='flex items-center justify-between'>
          <p className='ml-1 text-3xl font-bold text-red-700'>
            <span>$</span>
            {product.price.toFixed(2)}
          </p>
          <p className='text-sm'>
            {product.rating.rate}
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
          <button className=' rounded-full bg-red-500 p-4 font-semibold text-white transition-transform hover:scale-[1.01] '>
            ADD TO CART
          </button>
          <button className='rounded-full bg-gray-300 p-4 font-semibold transition-transform hover:scale-[1.01]'>
            ADD TO WISHLIST
          </button>
        </div>
      </div>
    </main>
  );
};
