import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../components/Layout";
import {
  Cart,
  Checkout,
  Home,
  Login,
  PageNotFound,
  ProductDetails,
  Profile,
  Signup,
} from "./pages";
import { ROUTER_PATH } from ".";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTER_PATH.HOME} element={<Layout />}>
      <Route index element={<Home />} />
      <Route path={ROUTER_PATH.CART} element={<Cart />} />
      <Route
        path={ROUTER_PATH.PRODUCT_LIST}
        lazy={() => import("./pages/ProductList/ProductList")}
      />
      <Route
        path={`${ROUTER_PATH.PRODUCT_DETAILS}/:productId/:title`}
        element={<ProductDetails />}
      />
      <Route path={ROUTER_PATH.LOGIN} element={<Login />} />
      <Route path={ROUTER_PATH.SIGNUP} element={<Signup />} />
      <Route path={ROUTER_PATH.PROFILE} element={<Profile />} />
      <Route path={ROUTER_PATH.CHECKOUT} element={<Checkout />} />
      <Route path={ROUTER_PATH.NOT_FOUND} element={<PageNotFound />} />
    </Route>,
  ),
);
