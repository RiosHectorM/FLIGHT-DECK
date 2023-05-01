import { FC, useState } from 'react';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

type ProfileSectionProps = {
  name: string;
  email: string;
  avatarUrl: string;
};

const ProfileSection: FC<ProfileSectionProps> = ({ name, email, avatarUrl }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='flex items-center'>
      <div className='relative w-10 h-10 rounded-full mr-2'>
        <Image src={avatarUrl} alt='Profile' layout='fill' objectFit='cover' />
      </div>
      <div>
        <p className='text-sm font-medium text-gray-900'>{name}</p>
        <p className='text-sm text-gray-500'>{email}</p>
      </div>
      <div className='ml-4'>
        <button
          className='text-gray-600 focus:outline-none'
          onClick={handleDropdownClick}
          aria-label='Open user menu'
        >
          <FaUser className='w-6 h-6' />
        </button>
        {isDropdownOpen && (
          <div className='absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-md z-10'>
            <Link href='/DashboardInstructor'>
              <div className='cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100'>
                <div className='flex items-center'>
                  <FaCog className='w-4 h-4 mr-2' />
                  Dashboard
                </div>
              </div>
            </Link>
            <Link href='/settings'>
              <div className='cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100'>
                <div className='flex items-center'>
                  <FaCog className='w-4 h-4 mr-2' />
                  Settings
                </div>
              </div>
            </Link>
            <div className='border-t border-gray-200'>
              <Link href='/'>
                <button className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100'>
                  <div className='flex items-center'>
                    <FaSignOutAlt className='w-4 h-4 mr-2' />
                    Logout
                  </div>
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
