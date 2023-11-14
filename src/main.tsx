import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { createRouterWithTSQueryClRef } from './navigation/router';
import { ShoppingCartProvider } from './context/ShopingCartContext';
import { ToasterWrapper } from './notifications/ToasterWrapper';

const queryClient = new QueryClient();
const router = createRouterWithTSQueryClRef(queryClient);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ShoppingCartProvider>
        <ToasterWrapper />
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </ShoppingCartProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
