import { type TProduct } from '../../../../adapters/products';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTER_PATH } from '../../../';
import { useShoppingCart } from '../../../../context/ShopingCartContext';
import { HiOutlineHeart } from 'react-icons/hi';
import { LiaCartPlusSolid } from 'react-icons/lia';
import { toastCartItemAdd } from '../../../../lib/notifications/toasts';

export const ProductTile = (props: { data: TProduct }) => {
  const detailsLinkPath = `${ROUTER_PATH.PRODUCT_DETAILS}/${props.data.id}`;
  const navigate = useNavigate();

  return (
    <div className='group/ptile relative flex h-44 overflow-hidden rounded-xl shadow-tile transition-all duration-150 ease-out  hover:shadow-tile-up sm:h-[27rem] sm:w-[18rem] sm:flex-col '>
      <div className='w-[45%] flex-none bg-white brightness-[0.98] transition duration-300 group-hover/ptile:brightness-95 sm:h-3/4 sm:w-full'>
        <img
          alt={props.data.title}
          className={`h-full w-full scale-90 cursor-pointer bg-white object-contain p-1 transition duration-200 group-hover/ptile:scale-100 `}
          src={props.data.image}
          onClick={() => navigate(detailsLinkPath)}
        />
      </div>
      <div className='mx-2 my-4 flex grow flex-col justify-between text-sm font-semibold uppercase tracking-wider sm:mx-3 sm:my-3 sm:basis-1/4'>
        <Link
          to={detailsLinkPath}
          className='line-clamp-4  underline-offset-2 hover:underline sm:line-clamp-2 '
        >
          {props.data.title}
        </Link>
        <div className='flex justify-between text-lg font-bold text-red-700'>
          <span>${props.data.price.toFixed(2)}</span>{' '}
        </div>
      </div>
      <AddToWishlistButton
        className=' absolute left-2 top-2 origin-top-left scale-[0.8] sm:scale-90 '
        id={props.data.id}
      />
      <AddToCartButton
        className='absolute bottom-2 right-3  '
        id={props.data.id}
      />
    </div>
  );
};

type AddButtonProps = {
  id: number;
  className?: string;
};
const AddToCartButton = (props: AddButtonProps) => {
  const { increaseCartQuantity } = useShoppingCart();

  const handleOnClick = () => {
    if (increaseCartQuantity(props.id)) toastCartItemAdd();
  };

  return (
    <button
      onClick={handleOnClick}
      className={`group/add-cart-btn inline-flex max-h-fit w-[3rem] items-center justify-end gap-2 overflow-hidden rounded-3xl bg-red-600 bg-opacity-90 p-2 text-neutral-50 shadow-lg transition-all delay-100 hover:z-10 hover:w-[9.4rem] active:bg-red-700 active:bg-opacity-90 active:delay-0 active:duration-100 ${props.className} `}
    >
      <span className='flex-none text-lg font-semibold '>Add to cart </span>
      <LiaCartPlusSolid
        className=' flex-none scale-125 transition-transform delay-75 duration-300 group-hover/add-cart-btn:scale-[1.4] group-active/add-cart-btn:scale-125 group-active/add-cart-btn:delay-0  group-active/add-cart-btn:duration-0 '
        size='2rem'
      />
    </button>
  );
};
const AddToWishlistButton = (props: AddButtonProps) => {
  const handleOnClick = () => {};

  return (
    <button
      onClick={handleOnClick}
      className={`group/add-wlist-b inline-flex max-h-fit w-[3rem] items-center gap-2 overflow-hidden rounded-3xl bg-neutral-200 bg-opacity-70 p-2 text-neutral-800 shadow-lg transition-all delay-100 hover:z-10 hover:w-[11.4rem] hover:bg-opacity-80 active:bg-neutral-300 active:bg-opacity-90 active:delay-0 active:duration-100 sm:scale-100 ${props.className} `}
    >
      <HiOutlineHeart
        className='flex-none stroke-[1.5] transition-transform delay-75 duration-300 group-hover/add-wlist-b:scale-[1.12] group-active/add-wlist-b:scale-100 group-active/add-wlist-b:delay-0  group-active/add-wlist-b:duration-0'
        size='2rem'
      />
      <span className='flex-none text-lg font-semibold'>Add to wishlist </span>
    </button>
  );
};
