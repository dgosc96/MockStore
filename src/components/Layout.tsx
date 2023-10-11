import { Header, Footer } from './';
import { Outlet, ScrollRestoration } from 'react-router-dom';

export default function Layout() {
  return (
    <div className=' font-sans text-neutral-800'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
