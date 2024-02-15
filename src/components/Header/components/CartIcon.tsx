import { BsCart2 } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { ROUTER_PATH } from '../../../routes';
import { useShoppingCart } from '../../../context/ShopingCartContext';

export const CartIcon = () => {
  const { cartQuantity } = useShoppingCart();
  return (
    <>
      {cartQuantity !== 0 && (
        <NavLink
          className={({ isActive }) =>
            `relative aspect-square rounded-xl transition duration-300 hover:bg-neutral-100/60 ${
              isActive && 'bg-neutral-100/50'
            }`
          }
          to={ROUTER_PATH.CART}
        >
          <BsCart2 size='1.75rem' className='m-auto h-full' />
          <div className='absolute -top-2 left-[60%] z-10 rounded-full bg-red-600 px-1.5 py-0.5 text-center leading-none'>
            <span className='align-top text-xs font-bold leading-none text-white'>
              {cartQuantity}
            </span>
          </div>
        </NavLink>
      )}
    </>
  );
};
