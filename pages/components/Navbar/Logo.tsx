import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {}

const Logo = (props: LogoProps) => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
  onClick={() => router.push('/')}
  className={`${
    scrolled ? 'bg-transparent' : 'bg-white'
  } cursor-pointer rounded-full p-2 w-16 h-16 relative transition-all duration-300 transform hover:scale-110  md:ml-0`}
  {...props}
>
  <Image
    src='/images/flight-logo.svg'
    alt='Logo'
    fill
    className="w-full h-full object-contain"
  />
</div>

  );
};

export default Logo;
