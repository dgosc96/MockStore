import { PAGES } from '../../navigation';
import { NavLinkWrapperComponent as NavLink } from './components/NavLinkWrapperComponent.tsx';
import { SearchBar } from './components/SearchBar.tsx';

export const Header = () => {
    return (
        <header className=' bg-slate-700 sticky top-0'>
            <nav className=' m-auto flex justify-between items-center h-fit p-2 md:w-2/3 text-white'>
                <NavLink to={PAGES.HOME} className={''}>
                    <p>YourStore</p>
                </NavLink>
                <SearchBar />
                <div className=' space-x-7'>
                    <NavLink to={PAGES.PRODUCT_LISTING}>Browse</NavLink>
                    <NavLink to={PAGES.LOGIN}>Login</NavLink>
                    <NavLink to={PAGES.CART}>Cart</NavLink>
                </div>
            </nav>
        </header>
    );
};
