import { useState, useEffect } from 'react';
import { User } from '@prisma/client';
import Container from '../AuxComponents/Container';
import Logo from './Logo';
import UserMenu from './UserMenu';
import Notification from '../../mainInstructor/Notification';

// Verifica sesión iniciada
import { useSession } from 'next-auth/react';

const Navbar = () => {
  const { data } = useSession();
  const [scrollPos, setScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      // Muestra la Navbar al hacer scroll hacia arriba
      setIsVisible(
        (scrollPos > currentScrollPos && scrollPos - currentScrollPos > 70) ||
          currentScrollPos < 10
      );

      // Guarda la posición de scroll actual
      setScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollPos]);

  return (
    <div
      className={`fixed w-full z-10 shadow-md transition-all duration-300 ${
        isVisible ? 'bg-gradient-to-r from-white to-gray-100' : 'bg-opacity-0'
      }`}
    >
      <div
        className={`py-4 ${
          isVisible ? 'border-b-[1px] border-secondary' : 'border-b-0'
        }`}
      >
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <div className='transition duration-300 ease-in-out transform hover:scale-110'>
              <Logo className='w-20 h-20' />
            </div>
            <div className='flex items-center'>
              {data?.user && <Notification />}
              <UserMenu currentUser={data?.user} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
