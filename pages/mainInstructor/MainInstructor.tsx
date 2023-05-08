import { useState } from 'react';
import { FaBell, FaComment } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import CertificationRequests from './CertificationRequests';
import Notification from './Notification';
import ProfileSection from './ProfileSection';
import Chat from './Chat';
import Calendar from './Calendar';

type MainInstructorProps = {
  title: string;
};

const MainInstructor = ({ title }: MainInstructorProps) => {
  const [requests, setRequests] = useState([
    {
      id: '1',
      date: new Date(),
      pilotName: 'John Doe',
      flightHours: 100,
    },
    {
      id: '2',
      date: new Date(),
      pilotName: 'Jane Doe',
      flightHours: 150,
    },
    {
      id: '3',
      date: new Date(),
      pilotName: 'David Smith',
      flightHours: 200,
    },
  ]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [showChat, setShowChat] = useState(true);

  const handleShowChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className='min-h-screen' style={{ backgroundImage: "url('/images/instruc.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className='flex-2'>
        <main>
          <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex'>
            <div className='w-1/2 px-4 py-6 sm:px-0'>
              <CertificationRequests requests={requests} />
            </div>
            <div className='w-1/2 px-4 py-6 sm:px-0'>
              <Calendar currentDate={currentDate} onDateChange={setCurrentDate} />
            </div>
          </div>
        </main>
      </div>
      <div className='md:w-1/3 bg-white h-full overflow-hidden'>
        <div className='flex flex-col h-full'>
          <div className='px-4 py-6 border-b border-gray-200 flex justify-between'>
            <h2 className='text-2xl font-bold text-gray-800 mb-2'>Chat</h2>
            <FaComment size={20} className='cursor-pointer' onClick={handleShowChat} />
          </div>
          <div className={`px-4 h-500 overflow-y-auto ${showChat ? 'block' : 'hidden'}`}>
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainInstructor;
