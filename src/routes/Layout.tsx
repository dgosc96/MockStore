import { Header, Footer } from '../components';
import { Outlet, ScrollRestoration, useNavigation } from 'react-router-dom';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { DivFadeIn } from '../components/DivFadeIn';

export default function RootLayout() {
  const navigation = useNavigation();

  return (
    <DivFadeIn className=' flex min-h-screen flex-col fill-neutral-800 font-sans text-neutral-800'>
      {navigation.state === 'loading' && <LoadingIndicator />}
      <Header />
      <main className='grow'>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </DivFadeIn>
  );
}
