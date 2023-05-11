import { FC, useEffect } from 'react';
import {
  FaUser,
  FaBell,
  FaUsers,
  FaRegFileAlt,
  FaClipboardCheck,
} from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import Calendar from './Calendar';
import Chat from './Chat';
import ProfileSection from './ProfileSection';
import FormPhoto from './form/formphoto';
import { FromInstructor } from './form/forminstructor';
import { FormPassword } from './form/formpassword';
import { useSession } from 'next-auth/react';
import { useUserStore } from '@/store/userStore';

type InstructorProfileProps = {
  name: string;
  email: string;
  avatarUrl: string;
};

const DashboardInstructor: FC = () => {
  const { data } = useSession();

  const { user, fetchUserByEmail } = useUserStore();

  useEffect(() => {
    if (data?.user?.email) {
      console.log(data.user.email);
      const email = data.user.email;
      fetchUserByEmail(email);
    }
  }, [data]);

  return (
    <div
      className='min-h-screen bg-gray-100'
      style={{
        backgroundImage: "url('/images/DASHCOMPANY.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {user?.id && (
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
                        <dt className='text-sm font-medium text-gray-500 truncate'>
                          Total Students
                        </dt>
                        <dd>
                          <div className='text-lg font-medium text-gray-900'>
                            425
                          </div>
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
                        <dt className='text-sm font-medium text-gray-500 truncate'>
                          Total Courses
                        </dt>
                        <dd>
                          <div className='text-lg font-medium text-gray-900'>
                            32
                          </div>
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
                        <dt className='text-sm font-medium text-gray-500 truncate'>
                          Pending Certifications
                        </dt>
                        <dd>
                          <div className='text-lg font-medium text-gray-900'>
                            12
                          </div>
                        </dd>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-center'>
              <div className='bg-white bg-opacity-70 rounded-lg shadow-lg p-6'>
                <h2 className='text-xl font-bold mb-10 w-full'>
                  Instructor Information
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 max-w-full mx-auto'>
                  <div className='mx-auto max-w-80 h-80'>
                    <FormPhoto />
                  </div>
                  <div className='mx-auto max-w-md'>
                    <FromInstructor />
                  </div>
                  <div className='mx-auto max-w-md'>
                    <FormPassword />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default DashboardInstructor;
