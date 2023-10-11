import { useMediaQuery } from 'react-responsive';
import { CiShoppingBasket } from 'react-icons/ci';
import { BsCart2 } from 'react-icons/bs';

import { ROUTER_PATH } from '../../navigation';
import { NavLinkWrapper as NavLink } from './components/NavLinkWrapper.tsx';
import { SearchBar } from './components/SearchBar.tsx';
import { BurgerMenu } from './components/BurgerMenu.tsx';
import { screens as TWScreens } from '../../generated/tailwind-config-objs.ts';

export const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: TWScreens.sm });

  return (
    <header className='sticky top-0 z-10 bg-white shadow-light '>
      <nav className='m-auto flex h-fit max-w-screen-xl items-center justify-between gap-4 p-2 text-neutral-800'>
        <NavLink
          to={ROUTER_PATH.HOME}
          className={'flex items-center font-semibold hover:no-underline'}
        >
          <CiShoppingBasket size='34px' className='fill-inherit' />
          <span key={'logo'} className={`hidden font-ysabeau sm:inline`}>
            YourStore
          </span>
        </NavLink>
        <SearchBar />
        {isMobile ? (
          <BurgerMenu className=' fill-inherit' />
        ) : (
          <div className='flex space-x-3'>
            <NavLink to={ROUTER_PATH.PRODUCT_LIST}>Browse</NavLink>
            <NavLink to={ROUTER_PATH.LOGIN}>Login</NavLink>
            <NavLink to={ROUTER_PATH.CART}>
              <BsCart2 size='1.5rem' className=' h-full ' />
            </NavLink>
          </div>
        )}
      </nav>
    </header>
  );
};
