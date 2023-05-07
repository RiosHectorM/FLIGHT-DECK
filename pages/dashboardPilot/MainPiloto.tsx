import { useState } from 'react';
import { FormPilot } from './formpilot';
import { FormPassword } from './formpassword';
import Chat from '../mainInstructor/Chat';
import Notification from '../mainInstructor/Notification';
import ProfileSection from '../mainInstructor/ProfileSection';
import FormPhoto from './formphoto';

const MainPiloto = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showChat, setShowChat] = useState(true);

  const handleShowProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleShowChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">Piloto</h1>
            </div>
          </div>
        </div>
      </nav> 
      <main>
        <div className='grid grid-cols-2 gap-4 w-full'>
          <div className='w-full'>
            <div className='grid grid-cols-2 gap-2 w-full'>
              <div className='flex w-full'>
                <FormPhoto />
              </div>
              <div className='w-full'>
                <FormPassword className='w-full' userId={''} />
              </div>
              <FormPilot />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 relative">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Chat</h2>
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={handleShowChat}
                >
                  {showChat ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              {showChat && <Chat />}
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={handleShowProfile}
            >
              {showProfile ? 'Ocultar' : 'Mostrar'} perfil
            </button>
          </div>
          {showProfile && (
            <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
              <ProfileSection name="Juan Perez" email="juanpe@example.com" avatarUrl="/images/Pilo.jpeg" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MainPiloto;
