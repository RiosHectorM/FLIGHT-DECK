'use client';

import { User } from '@prisma/client';
import Container from '../AuxComponents/Container';
import Logo from './Logo';
import UserMenu from './UserMenu';

//Verifica sesion iniciada
import { useSession } from 'next-auth/react';


const Navbar = () => {
  const { data } = useSession();
  return (
    <div className='fixed w-full bg-blue-300 z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <Logo />
            <UserMenu currentUser={data?.user} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
