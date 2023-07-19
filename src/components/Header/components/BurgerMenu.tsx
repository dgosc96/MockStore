import { PropsWithChildren, ReactNode, useState } from 'react';

import { PAGES } from '../../../navigation';
import { NavLinkWrapperComponent as NavLink } from './NavLinkWrapperComponent.tsx';

type BurgerMenuProps = {
    className?: string;
};

type BurgerIconProps = {
    shouldAnimate: boolean;
    size?: number;
    thickness?: number;
    length?: number;
    color?: string;
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
                <NavLink onClick={collapseSidebar} to={PAGES.HOME}>
                    Home
                </NavLink>
                <NavLink onClick={collapseSidebar} to={PAGES.PRODUCT_LISTING}>
                    Browse
                </NavLink>
                <NavLink onClick={collapseSidebar} to={PAGES.LOGIN}>
                    Login
                </NavLink>
                <NavLink onClick={collapseSidebar} to={PAGES.CART}>
                    Your Cart
                </NavLink>
            </BurgerSidebar>
            {isActive && (
                <div
                    onClick={collapseSidebar}
                    className='fixed top-0 left-0 w-screen h-screen z-10'
                />
            )}
        </div>
    );
};

const BurgerIcon = (props: BurgerIconProps) => {
    const { size = 36 } = props;
    const { length = 70 } = props;
    const { thickness = 8 } = props;
    const { color = 'white' } = props;

    const bar_rx = thickness / 2;
    const vb_size = 100;

    return (
        <svg
            className={props.className}
            viewBox={`0 0 ${vb_size} ${vb_size}`}
            width={size}
            fill={color}>
            <rect
                className={`transition-all origin-center duration-[500ms] ${
                    props.shouldAnimate &&
                    'translate-y-[-17.5%] translate-x-[-17.5%] rotate-[135deg] scale-x-110'
                }`}
                width={length}
                height={thickness}
                x={(vb_size - length) / 2}
                y={vb_size * 0.25 - thickness / 2}
                rx={bar_rx}
            />
            <rect
                className={`transition-all origin-center duration-[500ms] 
        ${props.shouldAnimate && 'opacity-0 scale-0'}`}
                width={length}
                height={thickness}
                x={(vb_size - length) / 2}
                y={vb_size * 0.5 - thickness / 2}
                rx={bar_rx}
            />
            <rect
                className={`transition-all origin-center duration-[500ms] ${
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
            className={`absolute top-0 right-0 duration-[500ms] bg-slate-500 pt-16 min-h-screen z-20 ${
                props.shouldExpand ? 'w-2/3 md:w-1/3 ' : 'w-0 '
            }`}>
            <div className='flex flex-col gap-3 items-center mx-1 overflow-hidden'>
                {props.children}
            </div>
        </aside>
    );
};
