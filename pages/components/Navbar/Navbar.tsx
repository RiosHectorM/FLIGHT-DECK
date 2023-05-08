import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Container from '../AuxComponents/Container';
import Logo from './Logo';
import UserMenu from './UserMenu';
import Notification from '../../mainInstructor/Notification';
import Link from 'next/link';


const Navbar = () => {
  const { data } = useSession();
  const [scrollPos, setScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsVisible(
        (scrollPos > currentScrollPos && scrollPos - currentScrollPos > 70) ||
          currentScrollPos < 10
      );
      setScrollPos(currentScrollPos);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollPos]);

  return (
    <div
      className={`fixed w-full z-10 transition-all duration-300 ${
        isVisible ? 'bg-black bg-opacity-60' : 'bg-opacity-0'
      }`}
    >
      <div
        className={`py-0 ${
          isVisible ? '' : 'border-b-0'
        }`}
      >
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <div className='flex items-center'>
              <Logo />
              <div className='ml-4'>
                <Link href='/about'>
                  <span className='hidden md:block text-lm font-bold py-4 px-5 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
                    About
                  </span>
                </Link>
              </div>
              <div className='ml-4'>
              <Link href='/membership'>
                  <span className='hidden md:block text-lm font-bold py-4 px-5 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
                    Pricing
                  </span>
                </Link>
              </div>
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
