import { useState } from 'react';
import { FaComment } from 'react-icons/fa';
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

  const handleChatToggle = () => {
    setShowChat(!showChat);
  };

  return (
    <div className='min-h-screen flex flex-col md:flex-row bg-black'>
      <div className='flex-1'>
        <main>
          <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
            <div className='px-4 py-6 sm:px-0'>
              <CertificationRequests requests={requests} />
            </div>
          </div>
        </main>
      </div>
      <div className='md:w-1/3 bg-white h-full overflow-hidden'>
        <div className='flex flex-col h-full'>
          <div className='px-4 py-6 border-b border-gray-200 flex items-center justify-between'>
            <h2 className='text-2xl font-bold text-gray-800 mb-2'>Chat</h2>
            <button className='text-gray-400 hover:text-gray-800 focus:outline-none' onClick={handleChatToggle}>
              {showChat ? <FontAwesomeIcon icon={faTimes} /> : <FaComment />}
            </button>
          </div>
          {showChat && (
            <div className='px-4 flex-1 overflow-y-auto'>
              <Chat />
            </div>
          )}
          <div className={`px-4 flex-1 overflow-y-auto ${showChat ? 'hidden' : 'block'}`}>
            <Calendar currentDate={currentDate} onDateChange={setCurrentDate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainInstructor;
