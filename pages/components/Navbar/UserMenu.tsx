'use client';

import { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import useLoginModal from '@/pages/hooks/useLoginModal';
import useRegisterModal from '@/pages/hooks/useRegisterModal';

import MenuItem from './MenuItem';
import Avatar from '../AuxComponents/Avatar';
import useAddHoursModal from '@/pages/hooks/useAddHoursModal';
interface UserMenuProps {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const addHoursModal = useAddHoursModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          onClick={() => {}}
          className='
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          '
        >
          {currentUser
            ? `Welcome ${currentUser.name?.toLocaleUpperCase()}`
            : 'Go to Login'}
        </div>
        <div
          onClick={toggleOpen}
          className='
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          '
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className='
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          '
        >
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
                <MenuItem
                  label='My Profile'
                  onClick={() => {
                    router.push('/dashboardPilot');
                    toggleOpen();
                  }}
                />
                <MenuItem label='Add Hours' onClick={addHoursModal.onOpen} />
                <MenuItem
                  label='Search Instructor'
                  onClick={() => {
                    router.push('/reservations');
                    toggleOpen();
                  }}
                />
                <hr />
                <MenuItem
                  label='Logout'
                  onClick={() => {
                    signOut({ redirect: false });
                    router.push('/');
                    toggleOpen();
                  }}
                />
              </>
            ) : (
              <>
                <MenuItem label='Home' onClick={() => router.push('/home')} />
                <MenuItem label='Login' onClick={loginModal.onOpen} />
                <MenuItem label='Sign up' onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
