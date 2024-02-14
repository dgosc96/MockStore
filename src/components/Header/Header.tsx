import { useMediaQuery } from 'react-responsive';

import { ROUTER_PATH } from '../../navigation';
import { SearchBar } from './components/SearchBar.tsx';
import { BurgerMenu } from './components/BurgerMenu.tsx';
import { screens as TWScreens } from '../../../generated/tailwind-config-objs.ts';
import { CartIcon } from './components/CartIcon.tsx';
import { ProfileButton } from './components/ProfileButton.tsx';
import { NavLink } from 'react-router-dom';
import { useScrollDirection } from '../../utils/hooks/useScrollDirection.ts';
import { useState } from 'react';

import { appLogoImagePath } from '../../assets/paths.ts';

export const Header = () => {
  const [isBurgerActive, setIsBurgerActive] = useState<boolean>(false);

  const isMobile = useMediaQuery({ maxWidth: TWScreens.sm });
  const scrollDir = useScrollDirection();

  return (
    <header
      className={`sticky inset-x-0 ${
        scrollDir === 'down' && !isBurgerActive
          ? ' -top-20 delay-1000'
          : 'top-0'
      } z-20 h-16 bg-stone-300/60 shadow-light backdrop-blur-3xl transition-all duration-300 hover:top-0 `}
    >
      <nav className='m-auto flex h-full items-center justify-between gap-1 py-2 pl-1 pr-1 text-neutral-800'>
        {/* Home button */}
        <NavLink
          to={ROUTER_PATH.HOME}
          className={
            'inline-flex h-full items-center rounded-lg p-1 font-semibold transition-colors hover:bg-neutral-50/40'
          }
        >
          <img className='h-full' src={appLogoImagePath} />
          <span
            key={'logo'}
            className={`hidden font-ysabeau text-xl sm:inline`}
          >
            MockStore
          </span>
        </NavLink>
        <SearchBar />
        {/* Navigation */}
        <div className='flex h-10 gap-2 fill-neutral-800 text-sm'>
          {isMobile ? (
            <>
              <CartIcon />
              <BurgerMenu
                onStateChange={(isActive) => setIsBurgerActive(isActive)}
                className='fill-inherit'
              />
            </>
          ) : (
            <>
              <NavLink
                className={({ isActive }) =>
                  `table rounded-xl px-3 font-medium transition-colors hover:bg-neutral-100/60 active:bg-transparent ${
                    isActive && ' bg-neutral-100/50'
                  }`
                }
                to={ROUTER_PATH.PRODUCT_LIST}
              >
                <span className=' table-cell align-middle '>Browse</span>
              </NavLink>
              <CartIcon />
              <ProfileButton />
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
