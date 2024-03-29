import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './Layout';
import { ROUTER_PATH } from '.';
import type { QueryClient } from '@tanstack/react-query';
import { productListLoader } from '../pages/ProductList/loader';
import { productDetailsLoader } from '../pages/ProductDetails/loader';

export const createRouterWithTSQueryClRef = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: ROUTER_PATH.HOME,
      element: <RootLayout />,
      children: [
        {
          index: true,
          async lazy() {
            const { Home } = await import('../pages');
            return { Component: Home };
          },
        },
        {
          path: ROUTER_PATH.CART,
          async lazy() {
            const { Cart } = await import('../pages');
            return { Component: Cart };
          },
        },
        {
          path: `${ROUTER_PATH.PRODUCT_LIST}`,
          async lazy() {
            const { ProductList } = await import(
              '../pages/ProductList/ProductList'
            );
            return { Component: ProductList };
          },
          loader: () => productListLoader(queryClient),
        },
        {
          path: `${ROUTER_PATH.PRODUCT_DETAILS}/:productId`,
          async lazy() {
            const { ProductDetails } = await import(
              '../pages/ProductDetails/ProductDetails'
            );
            return { Component: ProductDetails };
          },
          loader: ({ params }) => productDetailsLoader(queryClient, params),
        },
        {
          path: ROUTER_PATH.LOGIN,
          async lazy() {
            const { Login } = await import('../pages');
            return { Component: Login };
          },
        },
        {
          path: ROUTER_PATH.SIGNUP,
          async lazy() {
            const { Signup } = await import('../pages');
            return { Component: Signup };
          },
        },
        {
          path: ROUTER_PATH.PROFILE,
          async lazy() {
            const { Profile } = await import('../pages');
            return { Component: Profile };
          },
        },
        {
          path: ROUTER_PATH.CHECKOUT,
          async lazy() {
            const { Checkout } = await import('../pages');
            return { Component: Checkout };
          },
        },
        {
          path: ROUTER_PATH.NOT_FOUND,
          async lazy() {
            const { PageNotFound } = await import('../pages');
            return { Component: PageNotFound };
          },
        },
      ],
    },
  ]);
