'use client';

import { useCallback, useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import useLoginModal from '@/pages/hooks/useLoginModal';
import useRegisterModal from '@/pages/hooks/useRegisterModal';

import MenuItem from './MenuItem';
import Avatar from '../AuxComponents/Avatar';

import useAddHoursModal from '@/pages/hooks/useAddHoursModal';
import useSearchFlightInstructorModal from '@/pages/hooks/useSearchFlightInstructorModal';

import axios from 'axios';

interface UserMenuProps {
  currentUser:
    | {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      }
    | undefined;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const addHoursModal = useAddHoursModal();
  const searchFlightInstructorModal = useSearchFlightInstructorModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const [role, setRole] = useState('');

  useEffect(() => {
    if (currentUser?.email !== undefined) {
      axios
        .get(`/api/getUserByEmail/${currentUser.email}`)
        .then((result) => {
          if (result && result.data && result.data.role) {
            setRole(result.data.role);
          } else {
            console.error('Invalid User');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [currentUser?.email]);

  const handlerMains = () => {
    if (role === 'PILOT') router.push('/mainPilot');
    else if (role === 'INSTRUCTOR') router.push('/mainInstructor');
    else if (role === 'COMPANY') router.push('/mainCompany');
  };

  const handlerProfiles = () => {
    if (role === 'PILOT') router.push('/dashboardPilot');
    else if (role === 'INSTRUCTOR')
      router.push('/mainInstructor/DashboardInstructor');
    else if (role === 'COMPANY') router.push('/mainCompany/DashBoardCompany');
  };

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          onClick={() => {
            currentUser ? null : loginModal.onOpen();
          }}
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

        {currentUser ? (
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
        ) : null}
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
                  label='Home'
                  onClick={() => {
                    router.push('/home');
                    toggleOpen();
                  }}
                />
                <MenuItem
                  label='Main Role'
                  onClick={() => {
                    handlerMains();
                    toggleOpen();
                  }}
                />
                <MenuItem
                  label='My Profile'
                  onClick={() => {
                    handlerProfiles();
                    toggleOpen();
                  }}
                />

                {role === 'PILOT' && (
                  <MenuItem
                    label='Search Instructor'
                    onClick={() => {
                      searchFlightInstructorModal.onOpen();
                      toggleOpen();
                    }}
                  />
                )}
                <hr />
                <MenuItem
                  label='About Flight Deck'
                  onClick={() => {
                    router.push('/about');
                    toggleOpen();
                  }}
                />
                <hr />
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
