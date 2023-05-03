
import { FormPilot } from './formpilot';
import { FormPassword } from './formpassword';
import { FormPhoto } from './formphoto';
import Chat from '../mainInstructor/Chat';
import Notification from '../mainInstructor/Notification';
import ProfileSection from '../mainInstructor/ProfileSection';





const MainPiloto = () => {


  return (
    <div className='min-h-screen' >
      {/* <nav className='bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16'>
            <div className='flex'>
              <div className='flex-shrink-0 flex items-center'>
                <h1 className='text-xl font-bold text-gray-800'>Piloto</h1>
              </div>
            </div>
            <div className='flex items-center ml-auto'>
              <Notification />
            </div>
            <div className='ml-4 flex items-center md:ml-6'>
              <ProfileSection
                name='Juan Perez'
                email='juanpe@example.com'
                avatarUrl='/images/Pilo.jpeg'
              />
            </div>
          </div>
        </div>
      </nav> */}
      <main>
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="w-full">
            <div className="grid grid-cols-2 gap-2 w-full">
              <div className="flex w-full">
                <FormPhoto className="w-full" />
              </div>
              <div className="w-full">
                <FormPassword className="w-full" />
              </div>
            </div>
            <div className="w-full">

            <FormPilot />
            </div>
          </div>
          <div className="w-full">
            <Chat />
          </div>
        </div>
      </main>

    </div>
  );
};

export default MainPiloto;
