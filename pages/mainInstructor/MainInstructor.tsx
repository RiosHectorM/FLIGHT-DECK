import { useState, useEffect } from 'react';
import CertificationRequests from './CertificationRequests';
import { useSession } from 'next-auth/react';
import { useUserStore } from '@/store/userStore';
import axios from 'axios';
import { FaClock, FaRegFileAlt, FaStar } from 'react-icons/fa';
import ToasterProvider from '../providers/ToasterProvider';
import Loader from '../components/Loader';
import { Qualification, Request } from '@/types/globalTypes';
import PilotProfile from './PilotProfile';


const MainInstructor = () => {
  const [requests, setRequests] = useState<Request[] | undefined>(undefined);
  const [qualifys, setQualifys] = useState<Qualification[] | undefined>(
    undefined
  );
  const [stars, setStars] = useState(0);
  const [allHours, setAllHours] = useState(0);
  const { data: session } = useSession();
  const { user, fetchUserByEmail } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  let getFlightsToCertify = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `/api/flight/getFlightsToCertify?certifier=${id}`
      );
      setRequests(response.data);
      const totalHours = response.data;
      const allHoursTotal = totalHours.reduce((sum: number, hours: any) => {
        return sum + hours.hourCount;
      }, 0);
      setAllHours(allHoursTotal);
      //qualificationssssssssssssss
      const qualif = await axios.get(`/api/qualify/${id}`);
      setQualifys(qualif.data);
      const totalQualify = qualif.data;
      const prom = totalQualify.reduce((sum: number, qualif: any) => {
        return sum + qualif.qualificationNum;
      }, 0);
      setStars(parseFloat((prom / totalQualify.length).toFixed(2)));
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
  }, [user?.id]);

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
              <div className='bg-flightdeck-darkgold rounded-xl shadow-md my-2 sm:w-full'>
                <div className='px-2 py-2 lg:p-6'>
                  <div className='flex items-center justify-center md:justify-start'>
                    <div className='flex-shrink-0 bg-flightdeck-black rounded-md p-3'>
                      <FaRegFileAlt className='text-flightdeck-darkgold w-6 h-6' />
                    </div>
                    <div className='ml-4'>
                      <dt className='text-sm font-medium text-flightdeck-dark truncate'>
                        <span className='whitespace-nowrap'>
                          Waiting Flights
                        </span>
                      </dt>
                      <dd>
                        <p>{requests?.length}</p>
                      </dd>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-flightdeck-darkgold rounded-xl shadow-md my-2 sm:w-full'>
                <div className='px-2 py-2 lg:p-6'>
                  <div className='flex items-center justify-center md:justify-start'>
                    <div className='flex-shrink-0 bg-flightdeck-black rounded-md p-3'>
                      <FaClock className='text-flightdeck-darkgold w-6 h-6' />
                    </div>
                    <div className='ml-4'>
                      <dt className='text-sm font-medium text-flightdeck-dark truncate'>
                        <span className='whitespace-nowrap'>Hours Pending</span>
                      </dt>
                      <dd>
                        <div className='text-lg font-medium text-flightdeck-dark flex items-center'>
                          <p>{allHours}</p>
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
                      <FaStar className='text-yellow-400 h-6 w-6' />
                    </div>
                    <div className='ml-4'>
                      <dt className='text-sm font-medium text-flightdeck-dark truncate'>
                        <span className='whitespace-nowrap'>
                          Average Rating
                        </span>
                      </dt>
                      <dd>
                        <div className='text-lg font-medium text-flightdeck-dark flex items-center'>
                          <p>{stars}</p>
                        </div>
                      </dd>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col w-full overflow-hidden'>
          <div className='w-auto'>
            <div className='mx-auto py-2 md:px-2 lg:px-8 flex flex-col w-full'>
              <div className='w-full px-4 py-2 md:px-0'>
                <CertificationRequests
                  setIsLoading={setIsLoading}
                  requests={requests}
                  getFlightsToCertify={getFlightsToCertify}
                  id={user?.id as string}
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
