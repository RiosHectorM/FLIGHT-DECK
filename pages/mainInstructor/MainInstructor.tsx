import { useState, useEffect } from 'react';
import CertificationRequests from './CertificationRequests';
import { useSession } from 'next-auth/react';
import { useUserStore } from '@/store/userStore';
import axios from 'axios';
import { FaUsers, FaRegFileAlt, FaClipboardCheck } from 'react-icons/fa';
import ToasterProvider from '../providers/ToasterProvider';

type MainInstructorProps = {
  title: string;
};

type Request = {
  id: string;
  date: string;
  user: { name: string; email: string };
  hourCount: number;
  certifierID: string;
};

const MainInstructor = ({ title }: MainInstructorProps) => {
  const [requests, setRequests] = useState<Request[] | undefined>(undefined);
  const { data: session } = useSession();
  const { user, fetchUserByEmail } = useUserStore();
  const [toggle, setToggle] = useState(1);
  function toggler() {
    if (toggle == 1) {
      setToggle(0);
    } else {
      setToggle(1);
    }
  }
  let getFlightsToCertify = async (id: string) => {
    try {
      const response = await axios.get(
        `/api/flight/getFlightsToCertify?certifier=${id}`
      );
      console.log(response.data);
      setRequests(response.data);
      // .then((data) => matriculas=data.map((avion: { registrationId: string; })=>avion.registrationId))
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (session?.user?.email) {
      const email = session.user.email;
      fetchUserByEmail(email);
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

  const [currentDate, setCurrentDate] = useState(new Date());

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
      <div className='flex-2'>
        <main>
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
          <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex'>
            <div className='w-1/2 px-4 py-6 sm:px-0'>
              <CertificationRequests requests={requests} toggler={toggler} />
            </div>
            <div className='w-1/2 px-4 py-6 sm:px-0'>Aca va el calendario</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainInstructor;
