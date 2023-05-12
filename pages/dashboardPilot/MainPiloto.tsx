import { useEffect, useState } from 'react';
import { FormPilot } from './formpilot';
import { FormPassword } from './formpassword';
import Chat from '../mainInstructor/Chat';
import ProfileSection from '../mainInstructor/ProfileSection';

import Notification from '../mainInstructor/Notification';
import FormPhoto from './formphoto';
import ChatComponent from '../Chat';
import { useSession } from 'next-auth/react';
import { useUserStore } from '@/store/userStore';


const MainPiloto = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleShowProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleShowChat = () => {
    setShowChat(!showChat);
  };

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
        backgroundImage: "url('/images/pilotomain.jpg')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {user?.id && <main className='py-10'>
        <div className=''>
          <div className=''>
            <div className='mr-5 ml-5'>
              <div className='flex justify-center'>
                <div className='bg-white bg-opacity-70 rounded-lg shadow-lg p-6 mr-6'>
                  <h2 className='text-xl font-bold mb-10 w-full'>
                    Pilot Information
                  </h2>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4 max-w-full mx-auto'>
                    <div className='mx-auto max-w-80 h-80'>
                      <FormPhoto />
                    </div>
                    <div className='mx-auto max-w-md rounded-xl'>
                      <FormPilot />
                    </div>
                    <div className='mx-auto max-w-md'>
                      <FormPassword />
                    </div>
                  </div>
                </div>
                <div className='w-1/3'>
                <div className='bg-white rounded-lg shadow-lg p-6 relative'>
                  <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-2xl font-bold text-gray-800'>Chat</h2>
                    <button
                      className='text-gray-500 hover:text-gray-700 focus:outline-none'
                      onClick={handleShowChat}
                    >
                      {showChat ? 'Ocultar' : 'Mostrar'}
                    </button>
                  </div>
                  {showChat && <ChatComponent />}
                </div>
              </div>
              </div>
            </div>
            {/* <div className='flex justify-end mt-8'>
              <button
                className='text-gray-500 hover:text-gray-700 focus:outline-none mr-6'
                onClick={handleShowProfile}
              >
                {showProfile ? 'Ocultar' : 'Mostrar'} perfil
              </button>
            </div>
            {showProfile && (
              <div className='bg-white rounded-lg shadow-lg p-6 mt-8'>
                <ProfileSection
                  name='Juan Perez'
                  email='juanpe@example.com'
                  avatarUrl='/images/Pilo.jpeg'
                />
              </div>
            )} */}
          </div>
        </div>
        
      </main>}
    </div>
  );
};

export default MainPiloto;
