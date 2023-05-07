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
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col">
                  <div className="w-24 h-24 rounded-full mx-auto overflow-hidden">
                    <img src="/images/Pilo.jpeg" alt="Profile" className="h-full w-full object-cover" />
                  </div>
                  <button
                    className="mt-2 bg-indigo-500 text-white rounded-full px-6 py-2 font-semibold hover:bg-indigo-600 focus:outline-none"
                  >
                    Cambiar foto
                  </button>
                </div>
                <div>
                  <FormPassword className="my-class" userId={`${123}`} />
                </div>
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
