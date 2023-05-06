import Link from 'next/link';
import Image from 'next/image';
import HomePageFeaturesSection from './FeaturesSection';
import HomePageTestimonialsSection from './TestimonialsSection';
import useRegisterModal from '../hooks/useRegisterModal';
import RegisterModal from '../components/Modals/LoguinRegister/RegisterModal';
import { motion } from 'framer-motion';
import ToasterProvider from '../providers/ToasterProvider';

const HomePage = () => {
  const registerModal = useRegisterModal();

  const handleRole = (myRole: string) => {
    console.log(myRole);
    registerModal.onOpen();
  };

  return (
<div
  className='flex flex-col items-center justify-center min-h-screen'
  style={{
    backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/images/background-image.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
      <ToasterProvider />
      <RegisterModal />
      <div className='flex flex-col items-center justify-center h-1/2'>
        <motion.h2
          className='text-4xl font-bold text-gray-200 mt-6'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Join us as a
        </motion.h2>
        <div className='flex items-center space-x-8 mt-8'>
          {['PILOT', 'INSTRUCTOR', 'COMPANY'].map((role, index) => (
            <div
              key={role}
              className='relative w-96 h-96 flex flex-col items-center justify-center transform hover:z-10 hover:scale-110 cursor-pointer transition-all duration-300'
              onClick={() => handleRole(role)}
            >
              <Image
                src={`/images/${role.toLowerCase()}.png`}
                alt={role.toLowerCase()}
                width={500}
                height={500}
                className='rounded-full shadow-md object-cover'
              />
              <h3 className='absolute bottom-2 text-xl font-bold text-white bg-blue-500 p-2 rounded-lg'>
                {role}
              </h3>
            </div>
          ))}
        </div>
      </div>
      <HomePageFeaturesSection />
      <HomePageTestimonialsSection />
      <div className='flex flex-col items-center justify-center my-16'>
        <h2 className='text-4xl font-bold text-gray-800 mb-8'>
          Ready to get started?
        </h2>
        <Link href='/mainPilot'>
          <div className='bg-blue-500 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-blue-700 transition-colors duration-300 cursor-pointer'>
            Sign up now
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
