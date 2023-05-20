import { useState, useEffect } from 'react';
import CertificationRequests from './CertificationRequests';
//import Calendar from './Calendar';
import { useSession } from 'next-auth/react';
import { useUserStore } from '@/store/userStore';
import axios from 'axios';

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
      <div className='flex-2'>
        <main>
          <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex'>
            <div className='w-1/2 px-4 py-6 sm:px-0'>
              <CertificationRequests requests={requests} toggler={toggler} />
            </div>
            <div className='w-1/2 px-4 py-6 sm:px-0'>
              Aca va el calendario
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainInstructor;
