import { BsCart2 } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { ROUTER_PATH } from '../navigation';
import { useShoppingCart } from '../context/ShopingCartContext';

export const ShoppingCart = () => {
  const { cartQuantity } = useShoppingCart();
  return (
    <>
      {cartQuantity !== 0 && (
        <NavLink
          className='transition-rounded, fixed bottom-20 right-[1%] rounded-3xl border bg-neutral-50 p-2 shadow-lg duration-300 hover:-translate-y-1 hover:rounded-xl'
          to={ROUTER_PATH.CART}
        >
          <BsCart2 size='2rem' className='h-full ' />
          <div className=' absolute -right-1 -top-1 h-5 min-w-[1.25rem]  rounded-full bg-red-600 px-1 text-center '>
            <span className=' border-black align-text-top text-xs font-bold text-white'>
              {cartQuantity}
            </span>
          </div>
        </NavLink>
      )}
    </>
  );
};
