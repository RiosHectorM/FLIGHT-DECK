import { useState, useEffect } from 'react';
import CertificationRequests from './CertificationRequests';
import { useSession } from 'next-auth/react';
import { useUserStore } from '@/store/userStore';
import axios from 'axios';
import {
  FaUsers,
  FaRegFileAlt,
  FaClipboardCheck,
  FaClock,
} from 'react-icons/fa';
import ToasterProvider from '../providers/ToasterProvider';
import Loader from '../components/Loader';
import { Request } from '@/types/globalTypes';

const MainInstructor = () => {
  const [requests, setRequests] = useState<Request[] | undefined>(undefined);
  const { data: session } = useSession();
  const { user, fetchUserByEmail } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [toggle, setToggle] = useState(1);

  function toggler() {
    if (toggle === 1) {
      setToggle(0);
    } else {
      setToggle(1);
    }
  }
  let getFlightsToCertify = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `/api/flight/getFlightsToCertify?certifier=${id}`
      );
      console.log(response.data);
      setRequests(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (session?.user?.email) {
      setIsLoading(true);
      const email = session.user.email;
      fetchUserByEmail(email);
      setIsLoading(false);
    }
  }, [session, fetchUserByEmail]);
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      user?.email !== undefined &&
      user?.id
    ) {
      getFlightsToCertify(user?.id);
    }
  }, [user?.id, toggle]);

  return (
    <div
      className='min-h-screen'
      style={{
        backgroundImage: "url('/images/instruc.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <ToasterProvider />
      {isLoading && <Loader />}
      <div className='flex flex-col md:flex-row '>
        <div className='w-full md:w-auto'>
          <div className='px-4 sm:px-2 lg:px-0'>
            <div className='flex px-4 py-6 lg:p-6 flex-col sm:flex-col w-full justify-around'>
              <div className='bg-gray-800 rounded-xl shadow-md my-2 w-full '>
                <div className='px-2 py-2 lg:p-6'>
                  <div className='flex items-center justify-center md:justify-start'>
                    <div className='flex bg-indigo-500 rounded-md p-3'>
                      <FaRegFileAlt className='text-white w-6 h-6' />
                    </div>
                    <div className='ml-4'>
                      <dt className='text-sm font-medium text-white truncate'>
                        <span className='whitespace-nowrap'>
                          Total Certificates
                        </span>
                      </dt>
                      <dd>
                        <div className='text-lg font-medium text-white flex items-center'>
                          <p>50</p>
                        </div>
                      </dd>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-gray-800 rounded-xl shadow-md my-2 sm:w-full'>
                <div className='px-2 py-2 lg:p-6'>
                  <div className='flex items-center justify-center md:justify-start'>
                    <div className='flex-shrink-0 bg-indigo-500 rounded-md p-3'>
                      <FaRegFileAlt className='text-white w-6 h-6' />
                    </div>
                    <div className='ml-4'>
                      <dt className='text-sm font-medium text-white truncate'>
                        <span className='whitespace-nowrap'>
                          Total Aproved Hrs
                        </span>
                      </dt>
                      <dd>
                        <div className='text-lg font-medium text-white flex items-center'>
                          <p>200</p>
                          <p className='ml-2'>Hrs</p>
                        </div>
                      </dd>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-gray-800 rounded-xl shadow-md my-2 sm:w-full'>
                <div className='px-2 py-2 lg:p-6'>
                  <div className='flex items-center justify-center md:justify-start'>
                    <div className='flex-shrink-0 bg-indigo-500 rounded-md p-3'>
                      <FaRegFileAlt className='text-white w-6 h-6' />
                    </div>
                    <div className='ml-4'>
                      <dt className='text-sm font-medium text-white truncate'>
                        <span className='whitespace-nowrap'>
                          Pending Aproved
                        </span>
                      </dt>
                      <dd>
                        <div className='text-lg font-medium text-white flex items-center'>
                          <p>{requests?.length}</p>
                          <p className='ml-2'>Hrs</p>
                        </div>
                      </dd>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full md:w-9/12'>
          <div className='mx-auto py-6 md:px-2 lg:px-8 flex flex-col'>
            <div className='w-full px-4 py-6 md:px-0'>
              <CertificationRequests requests={requests} toggler={toggler} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainInstructor;
