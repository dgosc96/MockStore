import { Header, Footer } from '../components';
import { Outlet, ScrollRestoration, useNavigation } from 'react-router-dom';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { DivFadeIn } from '../components/DivFadeIn';

export default function RootLayout() {
  const navigation = useNavigation();

  return (
    <DivFadeIn className=' flex min-h-screen flex-col bg-white font-sans text-neutral-800'>
      <Header />
      <main className='grow'>
        {navigation.state === 'loading' && <LoadingIndicator />}
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </DivFadeIn>
  );
}
