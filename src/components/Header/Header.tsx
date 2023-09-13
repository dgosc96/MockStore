import { isMobile } from "react-device-detect";
import { CiShoppingBasket } from "react-icons/ci";
import { BsCart2 } from "react-icons/bs";

import { ROUTER_PATH } from "../../navigation";
import { NavLinkWrapperComponent as NavLink } from "./components/NavLinkWrapperComponent.tsx";
import { SearchBar } from "./components/SearchBar.tsx";
import { BurgerMenu } from "./components/BurgerMenu.tsx";

export const Header = () => {
  return (
    <header className="sticky top-0 bg-slate-700 ">
      <nav className="m-auto flex h-fit items-center justify-between gap-4 p-2 text-white lg:w-2/3">
        <NavLink
          to={ROUTER_PATH.HOME}
          className={"flex items-center font-semibold hover:no-underline"}
        >
          <CiShoppingBasket size="34px" color="yellow" />
          <span key={"logo"} className={`hidden font-ysabeau sm:inline`}>
            YourStore
          </span>
        </NavLink>
        <SearchBar />
        {isMobile ? (
          <BurgerMenu />
        ) : (
          <div className="flex space-x-3">
            <NavLink to={ROUTER_PATH.PRODUCT_LIST}>Browse</NavLink>
            <NavLink to={ROUTER_PATH.LOGIN}>Login</NavLink>
            <NavLink to={ROUTER_PATH.CART}>
              <BsCart2 size="1.5rem" className=" h-full " />
            </NavLink>
          </div>
        )}
      </nav>
    </header>
  );
};
