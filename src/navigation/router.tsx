import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import { ROUTER_PATH } from '.';
import type { QueryClient } from '@tanstack/react-query';
import { productListLoader } from './pages/ProductList/loader';

export const createRouterWithTSQueryClRef = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: ROUTER_PATH.HOME,
      element: <Layout />,
      children: [
        {
          index: true,
          async lazy() {
            let { Home } = await import('./pages');
            return { Component: Home };
          },
        },
        {
          path: ROUTER_PATH.CART,
          async lazy() {
            let { Cart } = await import('./pages');
            return { Component: Cart };
          },
        },
        {
          path: ROUTER_PATH.PRODUCT_LIST,
          async lazy() {
            let { ProductList } = await import(
              './pages/ProductList/ProductList'
            );
            return { Component: ProductList };
          },
          loader: productListLoader(queryClient),
        },
        {
          path: `${ROUTER_PATH.PRODUCT_DETAILS}/:productId`,
          async lazy() {
            let { ProductDetails } = await import('./pages');
            return { Component: ProductDetails };
          },
        },
        {
          path: ROUTER_PATH.LOGIN,
          async lazy() {
            let { Login } = await import('./pages');
            return { Component: Login };
          },
        },
        {
          path: ROUTER_PATH.SIGNUP,
          async lazy() {
            let { Signup } = await import('./pages');
            return { Component: Signup };
          },
        },
        {
          path: ROUTER_PATH.PROFILE,
          async lazy() {
            let { Profile } = await import('./pages');
            return { Component: Profile };
          },
        },
        {
          path: ROUTER_PATH.CHECKOUT,
          async lazy() {
            let { Checkout } = await import('./pages');
            return { Component: Checkout };
          },
        },
        {
          path: ROUTER_PATH.NOT_FOUND,
          async lazy() {
            let { PageNotFound } = await import('./pages');
            return { Component: PageNotFound };
          },
        },
      ],
    },
  ]);
