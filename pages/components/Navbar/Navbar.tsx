import { useState, useEffect, useContext } from 'react';
import { useSession } from 'next-auth/react';
import Container from '../AuxComponents/Container';
import Logo from './Logo';
import UserMenu from './UserMenu';
import Link from 'next/link';
import { MdWorkspacePremium } from 'react-icons/md';
import { useUserStore } from '@/store/userStore';

//import { ThemeContext } from '../../theme/themeContext'----------------------> thema oscuro

const Navbar = () => {
  const { data } = useSession();
  const [scrollPos, setScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  //const { isDarkTheme, toggleTheme } = useContext(ThemeContext);-------------------------> thema oscuro

  /*  const handleToggleTheme = () => {
     toggleTheme();--------------------------------------------------------------------> tema oscuro
     document.body.classList.toggle('dark');
   }; */
  const { user }= useUserStore()
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

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`fixed w-full z-10 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className={`py-0 ${isVisible ? '' : 'border-b-0'}`}>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <div className='flex items-center'>
              <Logo />
              <div className='ml-4'>
                <Link href='/home'>
                  <span className='hidden md:block text-lm font-bold py-4 px-5 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
                    Home
                  </span>
                </Link>
              </div>
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
              {/* <div className='ml-4'>
                <button
                  className="px-4 py-2 rounded-md text-white bg-accent"
                  onClick={handleToggleTheme}
                >--------------------------------------------------------------------------------------> thema oscuro
                  {isDarkTheme ? 'Light mode' : 'Dark mode'}
                </button>
              </div> */}
            </div>
            <div className='flex items-end'>
              {data?.user && user?.premium ? (
                <div className='relative flex justify-center'>
                  {isHovered && (
                    <div className='absolute  top-12 bg-yellow-500 text-white px-2 py-1 rounded-md text-xs'>
                      Premium
                    </div>
                  )}
                  <MdWorkspacePremium
                    className='text-black hover:text-yellow-500'
                    size={48}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  />
                </div>
              ) : null}
              <div>
                <UserMenu currentUser={data?.user} />
              </div>
              {/* <div className='flex items-center'>
              {data?.user && <Notification />}
              <UserMenu currentUser={data?.user} />
            </div> */}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
