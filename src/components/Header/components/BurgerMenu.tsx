import {
  type PropsWithChildren,
  type ReactNode,
  useState,
  useEffect,
  useRef,
} from 'react';

import { ROUTER_PATH } from '../../../routes/index.ts';
import { NavLink, useLocation } from 'react-router-dom';
import { DivFadeIn } from '../../DivFadeIn.tsx';

type BurgerMenuProps = {
  className?: string;
  onExpand?: () => void;
  onCollapse?: () => void;
};

export const BurgerMenu = (props: PropsWithChildren<BurgerMenuProps>) => {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsActive((current) => !current);
  };

  const collapseSidebar = () => {
    if (!isActive) return;
    setIsActive(false);
  };

  useEffect(() => {
    if (isActive && props.onExpand) props.onExpand();
    else if (props.onCollapse) props.onCollapse();
  }, [isActive]);

  useEffect(() => collapseSidebar(), [location]);

  return (
    <div
      className={`flex aspect-square items-center rounded-xl hover:bg-neutral-100/60 ${props.className}`}
    >
      <button
        className={`relative z-40 m-auto h-full `}
        onClick={toggleSidebar}
      >
        <BurgerIcon
          shouldAnimate={isActive}
          className='overflow-visible fill-inherit'
        />
      </button>
      <BurgerSidebar shouldExpand={isActive}>
        <NavLink to={ROUTER_PATH.HOME}>Home</NavLink>
        <NavLink to={ROUTER_PATH.PRODUCT_LIST}>Browse</NavLink>
        <NavLink to={ROUTER_PATH.LOGIN}>Login</NavLink>
        <NavLink to={ROUTER_PATH.CART}>Your Cart</NavLink>
      </BurgerSidebar>
      {isActive && (
        <DivFadeIn
          onClick={collapseSidebar}
          className='fixed inset-0 z-20 h-screen  bg-black/20 duration-500 '
        />
      )}
    </div>
  );
};

type BurgerIconProps = {
  shouldAnimate: boolean;
  size?: number;
  thickness?: number;
  length?: number;
  className?: string;
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

type BurgerSidebarProps = {
  shouldExpand: boolean;
  children?: ReactNode;
};

const BurgerSidebar = (props: BurgerSidebarProps) => {
  const sidebarRef = useRef<HTMLElement>(null);

  return (
    <aside
      ref={sidebarRef}
      className={`fixed right-0 top-0 z-30 min-h-screen bg-neutral-100 pt-16 duration-[500ms] ${
        props.shouldExpand ? 'w-2/3 md:w-1/3' : 'w-0 shadow-none '
      }`}
    >
      <div className='mx-1 flex flex-col items-center gap-3 overflow-hidden'>
        {props.children}
      </div>
    </aside>
  );
};
