import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {}

const Logo = (props: LogoProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push('/')}
      className={`${props.className} cursor-pointer rounded-full shadow-md`}
      {...props}
    >
      <Image src='/images/flight-logo.svg' alt='Logo' layout='fill' objectFit='contain' />
    </div>
  );
};

export default Logo;
