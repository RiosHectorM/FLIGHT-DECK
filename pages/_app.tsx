import '@/styles/globals.css';

import { useRouter } from 'next/navigation';

import { SessionProvider } from 'next-auth/react';

import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import LoginModal from './components/Modals/LoguinRegister/LoginModal';
import RegisterModal from './components/Modals/LoguinRegister/RegisterModal';
import Navbar from './components/Navbar/Navbar';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  const router = useRouter();

  // Verifica si la ruta actual es igual a la ruta de la página de inicio ("/")
  const showNavbar = router.pathname !== '/';

  return (
    <SessionProvider session={session}>
      <LoginModal />
      <RegisterModal />
      {showNavbar && (
        <nav className='flex items-center justify-between bg-white shadow-sm h-16 w-full'>
          <div className='flex items-center w-full justify-between'>
            <Navbar />
          </div>
        </nav>
      )}
      <Component {...pageProps} />
    </SessionProvider>
  );
}
