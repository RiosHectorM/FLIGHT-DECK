import { FC } from 'react';
import { FaUser, FaBell, FaUsers, FaRegFileAlt, FaClipboardCheck } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import Calendar from './Calendar';
import Chat from './Chat';
import ProfileSection from './ProfileSection';

const DashboardInstructor: FC = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      {/* <nav className='bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16'>
            <div className='flex'>
            <div className='hidden md:flex md:ml-10 md:space-x-10' style={{ marginTop: '10px' }}>
                <Link href='/courses'>
                  <span className='font-medium text-gray-500 hover:text-gray-900'>Courses</span>
                </Link>
                <Link href='/students'>
                  <span className='font-medium text-gray-500 hover:text-gray-900'>Students</span>
                </Link>
                <Link href='/reports'>
                  <span className='font-medium text-gray-500 hover:text-gray-900'>Reports</span>
                </Link>
              </div>
            </div>
            <div className='flex items-center'>
            
            </div>
            <div className='ml-4 flex items-center md:ml-6'>
              <ProfileSection 
                name='John Doe'
                email='johndoe@example.com'
                avatarUrl='/images/profile.jpg'
              />
            </div>
          </div>
        </div>
      </nav> */}
      <main>
        <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
          <div className='px-4 py-6 sm:px-0'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='bg-white rounded-xl shadow-md'>
                <div className='px-4 py-5 sm:p-6'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0 bg-indigo-500 rounded-md p-3'>
                      <FaUsers className='text-white w-6 h-6' />
                    </div>
                    <div className='ml-5 w-0 flex-1'>
                      <dt className='text-sm font-medium text-gray-500 truncate'>Total Students</dt>
                      <dd>
                        <div className='text-lg font-medium text-gray-900'>425</div>
                      </dd>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-white rounded-xl shadow-md'>
                <div className='px-4 py-5 sm:p-6'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0 bg-indigo-500 rounded-md p-3'>
                      <FaRegFileAlt className='text-white w-6 h-6' />
                    </div>
                    <div className='ml-5 w-0 flex-1'>
                      <dt className='text-sm font-medium text-gray-500 truncate'>Total Courses</dt>
                      <dd>
                        <div className='text-lg font-medium text-gray-900'>32</div>
                      </dd>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-white rounded-xl shadow-md'>
                <div className='px-4 py-5 sm:p-6'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0 bg-indigo-500 rounded-md p-3'>
                      <FaClipboardCheck className='text-white w-6 h-6' />
                    </div>
                    <div className='ml-5 w-0 flex-1'>
                      <dt className='text-sm font-medium text-gray-500 truncate'>Pending Certifications</dt>
                      <dd>
                        <div className='text-lg font-medium text-gray-900'>12</div>
                      </dd>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardInstructor;
