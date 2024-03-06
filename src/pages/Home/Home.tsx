import { useNavigate } from 'react-router-dom';
import { DivFadeIn } from '../../components/DivFadeIn';
import { ROUTER_PATH } from '../../routes';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

// Mock data for featured products
const featuredProducts: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description for Product 1',
    price: 99.99,
    imageUrl: 'https://via.placeholder.com/200',
  },
  // ... more products
];

export const Home = () => {
  const navigate = useNavigate();

  return (
    <DivFadeIn className=''>
      {/* Hero Section */}
      <div className='relative flex min-h-[80vh] items-center px-3'>
        <div className='absolute inset-x-0 -top-40 bottom-0 -z-10 bg-hero-image bg-cover bg-left-bottom brightness-75' />
        <div className='mx-auto max-w-4xl text-center text-white sm:mx-12 sm:text-left'>
          <h2 className='text-5xl font-semibold sm:text-6xl md:text-7xl lg:text-8xl '>
            Welcome to MockStore
          </h2>
          <p className=' mt-7 text-xl sm:text-2xl'>
            Find the best fake products at unbeatable fake prices.
          </p>
          <div className='my-16 flex justify-center gap-6 font-semibold sm:mx-9 sm:justify-normal'>
            <button
              onClick={() => navigate({ pathname: ROUTER_PATH.PRODUCT_LIST })}
              className='rounded-2xl bg-cyan-600 px-5 py-3 transition hover:scale-[1.03]  active:scale-[0.98] active:brightness-95'
            >
              Shop Now
            </button>
            <button
              onClick={() => navigate({ pathname: ROUTER_PATH.SIGNUP })}
              className='rounded-2xl bg-lime-700 px-5 py-3 transition hover:scale-[1.03] active:scale-[0.98] active:brightness-95'
            >
              Create an account
            </button>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className='container mx-auto px-6 py-8'>
        <h3 className='text-2xl font-medium text-gray-700'>
          Featured Products
        </h3>
        <div className='mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className='mx-auto w-full max-w-sm overflow-hidden rounded-md shadow-md'
            >
              <div
                className='flex h-56 w-full items-end justify-end bg-cover'
                style={{ backgroundImage: `url(${product.imageUrl})` }}
              >
                {/* Add overlay here if needed */}
              </div>
              <div className='px-5 py-3'>
                <h3 className='uppercase text-gray-700'>{product.name}</h3>
                <span className='mt-2 text-gray-500'>${product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DivFadeIn>
  );
};
