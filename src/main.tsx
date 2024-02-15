import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { createRouterWithTSQueryClRef } from './routes/router';
import { ShoppingCartProvider } from './context/ShopingCartContext';
import { ToasterWrapper } from './lib/notifications/ToasterWrapper';
import { AuthProvider } from './context/AuthContext';

const queryClient = new QueryClient();
const router = createRouterWithTSQueryClRef(queryClient);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ShoppingCartProvider>
          <ToasterWrapper />
          <RouterProvider router={router} />
          <ReactQueryDevtools />
        </ShoppingCartProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
);
