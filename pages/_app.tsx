import '@/styles/globals.css';

import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import { SessionProvider } from 'next-auth/react';

import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import useLoginModal from './hooks/useLoginModal';
import LoginModal from './components/Modals/LoguinRegister/LoginModal';
import useRegisterModal from './hooks/useRegisterModal';
import RegisterModal from './components/Modals/LoguinRegister/RegisterModal';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
  };

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  // Verifica si la ruta actual es igual a la ruta de la página de inicio ("/")
  const showNavbar = router.pathname !== '/';

  return (
    <SessionProvider session={session}>
      <LoginModal />
      <RegisterModal />
      {showNavbar && (
        <nav className='flex items-center justify-between bg-white shadow-sm h-16 w-full'>
          <div className='flex items-center w-full justify-between'>
            <div className='mr-6 cursor-pointer' onClick={handleLogoClick}>
              <Image
                src='/images/flight-logo.png'
                alt='Logo'
                width={40}
                height={40}
              />
            </div>
            <ul className='flex items-center space-x-4'>
              <li>
                <Link href='/home'>
                  <span className='hover:text-gray-700 cursor-pointer'>
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <span
                  onClick={loginModal.onOpen}
                  className='hover:text-gray-700 cursor-pointer'
                >
                  Login
                </span>
              </li>
              <li>
                <span
                  onClick={registerModal.onOpen}
                  className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 cursor-pointer'
                >
                  Sign up
                </span>
              </li>
            </ul>
          </div>
        </nav>
      )}
      <Component {...pageProps} />
    </SessionProvider>
  );
}
