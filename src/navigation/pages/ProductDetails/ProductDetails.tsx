import { useParams } from 'react-router-dom';
import { useProductList } from '../..//../api/products';
import { ModalImage } from '../../../components/ModalImage';

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
    <div className='mx-auto mt-10 flex flex-col border-red-400 sm:min-h-[40rem] sm:max-w-screen-lg sm:flex-row '>
      <ModalImage
        className='max-h-[20rem] cursor-pointer overflow-hidden object-contain p-9 transition-transform hover:scale-[1.03] sm:max-h-full sm:basis-1/2'
        src={product.thumbnail}
        alt={product.title}
      />
      <div className='m-3 flex basis-1/2 flex-col gap-3 '>
        <h1 className='text-center text-4xl font-bold'>{product.title}</h1>
        <div className='flex items-center justify-between'>
          <p className='ml-1 text-3xl font-bold text-red-700'>
            <span>$</span>
            {product.price.toFixed(2)}
          </p>
          <p className='text-sm'>
            {product.rating}
            <span>⭐</span>
          </p>
        </div>
        <p className='text-xs text-gray-500'>
          <span className=' font-bold'>Category: </span>
          {product.category}
        </p>
        <p className='mx-2 grow font-sans leading-relaxed tracking-wide'>
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
    </div>
  );
};
