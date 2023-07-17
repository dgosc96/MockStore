import { PAGES } from '../../navigation';
import { NavLinkWrapperComponent as NavLink } from './components/NavLinkWrapperComponent.tsx';
import { SearchBar } from './components/SearchBar.tsx';
import { CiShoppingBasket } from 'react-icons/ci';
import { BsCart2 } from 'react-icons/bs';
import { BurgerMenu } from './components/BurgerMenu.tsx';

export const Header = () => {
    return (
        <header className='bg-slate-700 sticky top-0 '>
            <nav className='m-auto flex gap-4 justify-between items-center h-fit p-2 lg:w-2/3 text-white'>
                <NavLink
                    to={PAGES.HOME}
                    className={
                        'flex items-center font-semibold hover:no-underline'
                    }>
                    <CiShoppingBasket size='34px' color='yellow' />
                    <span
                        key={'logo'}
                        className={`font-ysabeau hidden sm:inline`}>
                        YourStore
                    </span>
                </NavLink>
                <SearchBar />
                <div className='space-x-3 hidden lg:flex'>
                    <NavLink to={PAGES.PRODUCT_LISTING}>Browse</NavLink>
                    <NavLink to={PAGES.LOGIN}>Login</NavLink>
                    <NavLink to={PAGES.CART}>
                        <BsCart2 size='1.5rem' className=' h-full ' />
                    </NavLink>
                </div>
                <BurgerMenu className='lg:hidden flex items-center'>
                    <NavLink to={PAGES.HOME}>Home</NavLink>
                    <NavLink to={PAGES.PRODUCT_LISTING}>Browse</NavLink>
                    <NavLink to={PAGES.LOGIN}>Login</NavLink>
                    <NavLink to={PAGES.CART}>Your Cart</NavLink>
                </BurgerMenu>
            </nav>
        </header>
    );
};
