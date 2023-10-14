import { Header, Footer } from '../components';
import { Outlet, ScrollRestoration } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className=' flex min-h-screen flex-col font-sans text-neutral-800'>
      <Header />
      <div className='grow'>
        <Outlet />
      </div>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
