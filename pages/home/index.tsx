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
        backgroundImage: 'url("/images/backgroundhome.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <ToasterProvider />
      <RegisterModal />
      <div className='flex flex-col items-center justify-center h-1/2'>
        <motion.h2
          className='text-4xl font-bold text-gray-200'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Join us as a
        </motion.h2>
        <div className='flex justify-center space-x-6 mt-8'>
          <div
            className='relative flex flex-col items-center justify-center transform hover:scale-105 cursor-pointer'
            onClick={() => handleRole('PILOT')}
          >
            <Image
              src='/images/pilot.png'
              alt='pilot'
              width={400}
              height={400}
              className='rounded-full shadow-md'
            />
            <h3 className='absolute bottom-2 text-xl font-bold text-white bg-blue-500 p-2 rounded-lg'>
              PILOT
            </h3>
          </div>
          <div
            className='relative flex flex-col items-center justify-center transform hover:scale-105 cursor-pointer'
            onClick={() => handleRole('INSTRUCTOR')}
          >
            <Image
              src='/images/instructor.png'
              alt='instructor'
              width={400}
              height={400}
              className='rounded-full shadow-md'
            />
            <h3 className='absolute bottom-2 text-xl font-bold text-white bg-blue-500 p-2 rounded-lg'>
              INSTRUCTOR
            </h3>
          </div>
          <div
            className='relative flex flex-col items-center justify-center transform hover:scale-105 cursor-pointer'
            onClick={() => handleRole('COMPANY')}
          >
            <Image
              src='/images/company.png'
              alt='company'
              width={400}
              height={400}
              className='rounded-full shadow-md'
            />
            <h3 className='absolute bottom-2 text-xl font-bold text-white bg-blue-500 p-2 rounded-lg'>
              COMPANY
            </h3>
          </div>
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
