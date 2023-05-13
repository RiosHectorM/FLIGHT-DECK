import { useState, useEffect } from 'react';
import CertificationRequests from './CertificationRequests';
import Calendar from './Calendar';
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
        `http://localhost:3000/api/flight/getFlightsToCertify?certifier=${id}`
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
  const [showChat, setShowChat] = useState(true);

  const handleShowChat = () => {
    setShowChat(!showChat);
  };

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
              <Calendar
                currentDate={currentDate}
                onDateChange={setCurrentDate}
              />
            </div>
          </div>
        </main>
      </div>
      {/* <div className='md:w-1/3 bg-white h-full overflow-hidden'>
        <div className='flex flex-col h-full'>
          <div className='px-4 py-6 border-b border-gray-200 flex justify-between'>
            <h2 className='text-2xl font-bold text-gray-800 mb-2'>Chat</h2>
            <FaComment size={20} className='cursor-pointer' onClick={handleShowChat} />
          </div>
          <div className={`px-4 h-500 overflow-y-auto ${showChat ? 'block' : 'hidden'}`}>
            <Chat />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MainInstructor;
