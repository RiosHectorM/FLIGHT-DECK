import { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import CertificationRequests from './CertificationRequests';
import Notification from './Notification';
import ProfileSection from './ProfileSection';

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

  return (
    <div className='min-h-screen' style={{ backgroundImage: "url('/images/backgroundinst.jpg')",backgroundSize: 'cover', backgroundPosition: 'center' }}>

      <nav className='bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16'>
            <div className='flex'>
              <div className='flex-shrink-0 flex items-center'>
                <h1 className='text-xl font-bold text-gray-800'>{title}</h1>
              </div>
            </div>
            <div className='flex items-center ml-auto'>
              <Notification />
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
      </nav>
      <main>
        <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
          <div className='px-4 py-6 sm:px-0'>
            <CertificationRequests requests={requests} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainInstructor;
