import { Route, Routes } from "react-router-dom";

import { PAGES } from "./CONSTANTS";

import {
  Home,
  Cart,
  ProductListing,
  ProductDetails,
  Login,
  Signup,
  Profile,
  Checkout,
  PageNotFound,
} from "../pages";

export const NavRoutes = () => {
  return (
    <Routes>
      <Route path={PAGES.HOME} element={<Home />} />
      <Route path={PAGES.CART} element={<Cart />} />
      <Route path={PAGES.PRODUCT_LISTING} element={<ProductListing />} />
      <Route path={PAGES.PRODUCT_DETAILS} element={<ProductDetails />} />
      <Route path={PAGES.LOGIN} element={<Login />} />
      <Route path={PAGES.SIGNUP} element={<Signup />} />
      <Route path={PAGES.PROFILE} element={<Profile />} />
      <Route path={PAGES.CHECKOUT} element={<Checkout />} />
      <Route path={PAGES.NOT_FOUND} element={<PageNotFound />} />
    </Routes>
  );
};
