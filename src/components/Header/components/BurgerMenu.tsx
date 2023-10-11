import { type PropsWithChildren, type ReactNode, useState } from 'react';

import { ROUTER_PATH } from '../../../navigation';
import { NavLinkWrapper as NavLink } from './NavLinkWrapper.tsx';

type BurgerMenuProps = {
  className?: string;
};

type BurgerIconProps = {
  shouldAnimate: boolean;
  size?: number;
  thickness?: number;
  length?: number;
  className?: string;
};

type BurgerSidebarProps = {
  shouldExpand: boolean;
  children?: ReactNode;
};

export const BurgerMenu = (props: PropsWithChildren<BurgerMenuProps>) => {
  const [isActive, setIsActive] = useState(false);

  const toggleSidebar = () => {
    setIsActive((current) => !current);
  };

  const collapseSidebar = () => {
    if (!isActive) return;
    setIsActive(false);
  };

  return (
    <div className={`flex items-center ${props.className}`}>
      <button className=' relative z-30' onClick={toggleSidebar}>
        <BurgerIcon shouldAnimate={isActive} />
      </button>
      <BurgerSidebar shouldExpand={isActive}>
        <NavLink onClick={collapseSidebar} to={ROUTER_PATH.HOME}>
          Home
        </NavLink>
        <NavLink onClick={collapseSidebar} to={ROUTER_PATH.PRODUCT_LIST}>
          Browse
        </NavLink>
        <NavLink onClick={collapseSidebar} to={ROUTER_PATH.LOGIN}>
          Login
        </NavLink>
        <NavLink onClick={collapseSidebar} to={ROUTER_PATH.CART}>
          Your Cart
        </NavLink>
      </BurgerSidebar>
      {isActive && (
        <div
          onClick={collapseSidebar}
          className='fixed left-0 top-0 z-10 h-screen w-screen bg-black opacity-20'
        />
      )}
    </div>
  );
};

const BurgerIcon = (props: BurgerIconProps) => {
  const { size = 36 } = props;
  const { length = 70 } = props;
  const { thickness = 8 } = props;

  const bar_rx = thickness / 2;
  const vb_size = 100;

  return (
    <svg
      className={props.className}
      viewBox={`0 0 ${vb_size} ${vb_size}`}
      width={size}
    >
      <rect
        className={`origin-center transition-all duration-[500ms] ${
          props.shouldAnimate &&
          'translate-x-[-17.5%] translate-y-[-17.5%] rotate-[135deg] scale-x-110'
        }`}
        width={length}
        height={thickness}
        x={(vb_size - length) / 2}
        y={vb_size * 0.25 - thickness / 2}
        rx={bar_rx}
      />
      <rect
        className={`origin-center transition-all duration-[500ms] 
        ${props.shouldAnimate && 'scale-0 opacity-0'}`}
        width={length}
        height={thickness}
        x={(vb_size - length) / 2}
        y={vb_size * 0.5 - thickness / 2}
        rx={bar_rx}
      />
      <rect
        className={`origin-center transition-all duration-[500ms] ${
          props.shouldAnimate &&
          'translate-x-[-17.5px] translate-y-[17.5px] rotate-[225deg] scale-x-110'
        }`}
        width={length}
        height={thickness}
        x={(vb_size - length) / 2}
        y={vb_size * 0.75 - thickness / 2}
        rx={bar_rx}
      />
    </svg>
  );
};

const BurgerSidebar = (props: BurgerSidebarProps) => {
  return (
    <aside
      className={`0 absolute right-0 top-0 z-20 min-h-screen bg-neutral-100 pt-16 duration-[500ms] ${
        props.shouldExpand ? 'w-2/3 md:w-1/3' : 'w-0 shadow-none '
      }`}
    >
      <div className='mx-1 flex flex-col items-center gap-3 overflow-hidden'>
        {props.children}
      </div>
    </aside>
  );
};
