import { useState, useEffect } from 'react';
import CertificationRequests from './CertificationRequests';
import { useSession } from 'next-auth/react';
import { useUserStore } from '@/store/userStore';
import axios from 'axios';
import { FaRegFileAlt } from 'react-icons/fa';
import ToasterProvider from '../providers/ToasterProvider';
import Loader from '../components/Loader';
import { Qualification, Request } from '@/types/globalTypes';
import PilotProfile from './PilotProfile';
import Stars from './Stars';

const MainInstructor = () => {
  const [requests, setRequests] = useState<Request[] | undefined>(undefined);
  const [qualifys, setQualifys] = useState<Qualification[] | undefined>(
    undefined
  );
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
      const qualif = await axios.get(`/api/qualify/${id}`);
      setQualifys(qualif.data);
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
              <div className='bg-flightdeck-darkgold rounded-xl shadow-md my-2 w-full '>
                <div className='px-2 py-2 lg:p-4'>
                  <div className='flex items-center justify-center md:justify-start'>
                    <div className='flex bg-flightdeck-black rounded-md p-3'>
                      <FaRegFileAlt className='text-flightdeck-darkgold w-6 h-6' />
                    </div>
                    <div className='ml-4'>
                      <dt className='text-sm font-medium text-flightdeck-dark truncate'>
                        <span className='whitespace-nowrap'>
                          Total Certificates
                        </span>
                      </dt>
                      <dd>
                        <div className='text-lg font-medium text-flightdeck-dark flex items-center'>
                          <p>50</p>
                        </div>
                      </dd>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-flightdeck-darkgold rounded-xl shadow-md my-2 sm:w-full'>
                <div className='px-2 py-2 lg:p-6'>
                  <div className='flex items-center justify-center md:justify-start'>
                    <div className='flex-shrink-0 bg-flightdeck-black rounded-md p-3'>
                      <FaRegFileAlt className='text-flightdeck-darkgold w-6 h-6' />
                    </div>
                    <div className='ml-4'>
                      <dt className='text-sm font-medium text-flightdeck-dark truncate'>
                        <span className='whitespace-nowrap'>
                          Total Aproved Hrs
                        </span>
                      </dt>
                      <dd>
                        <div className='text-lg font-medium text-flightdeck-dark flex items-center'>
                          <p>200</p>
                          <p className='ml-2'>Hrs</p>
                        </div>
                      </dd>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-flightdeck-darkgold rounded-xl shadow-md my-2 sm:w-full'>
                <div className='px-2 py-2 lg:p-6'>
                  <div className='flex items-center justify-center md:justify-start'>
                    <div className='flex-shrink-0 bg-flightdeck-black rounded-md p-3'>
                      <FaRegFileAlt className='text-flightdeck-darkgold w-6 h-6' />
                    </div>
                    <div className='ml-4'>
                      <dt className='text-sm font-medium text-flightdeck-dark truncate'>
                        <span className='whitespace-nowrap'>
                          Pending Aproved
                        </span>
                      </dt>
                      <dd>
                        <div className='text-lg font-medium text-flightdeck-dark flex items-center'>
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

        <div className='flex flex-col w-full'>
          <div className='w-auto'>
            <div className='mx-auto py-2 md:px-2 lg:px-8 flex flex-col w-full'>
              <div className='w-full px-4 py-2 md:px-0'>
                <CertificationRequests
                  setIsLoading={setIsLoading}
                  requests={requests}
                  toggler={toggler}
                />
              </div>
            </div>
          </div>
          <div>
            <div className='bg-flightdeck-dark w-full rounded-lg opacity-90'>
              <h2 className='text-flightdeck-darkgold text-2xl font-bold mb-4 text-center'>
                Last Qualifications
              </h2>
              <div className='flex lg:flex-row w-full justify-around flex-col'>
                {qualifys?.slice(-3).map((pilot) => (
                  <div
                    key={pilot.id}
                    className='bg-flightdeck-black rounded-lg shadow-md p-2 m-4 flex flex-col justify-between border border-yellow-100'
                  >
                    <div>
                      <PilotProfile
                        name={pilot?.pilotName?.toUpperCase()}
                        photoUrl={pilot?.pilotImage}
                        qualification={pilot?.qualificationNum}
                      />
                    </div>
                    <div className='flex items-center justify-center mt-4'>
                      <p className='text-flightdeck-lightgold italic'>
                        {'"'}
                        {pilot?.comment}
                        {'"'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainInstructor;
