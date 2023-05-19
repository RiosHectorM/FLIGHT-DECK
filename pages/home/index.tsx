import Image from 'next/image';
import HomePageFeaturesSection from './FeaturesSection';
import HomePageTestimonialsSection from './TestimonialsSection';
import useRegisterModal from '../../utils/hooks/useRegisterModal';
import RegisterModal from '../components/Modals/LoguinRegister/RegisterModal';
import { motion } from 'framer-motion';
import {
  staggerContainer,
  fadeIn,
  slideIn,
  zoomIn,
} from '../../utils/motion/motion';
import ToasterProvider from '../providers/ToasterProvider';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useUserStore } from '@/store/userStore';
import Loader from '../components/Loader';

const HomePage = () => {
  const registerModal = useRegisterModal();

  const handleRole = (myRole: string) => {
    console.log(myRole);
    registerModal.onOpen();
  };

  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const { fetchUserByEmail } = useUserStore();

  useEffect(() => {
    if (session?.user?.email) {
      setIsLoading(true);
      const email = session.user.email;
      fetchUserByEmail(email);
      setIsLoading(false);
    }
  }, [session, fetchUserByEmail]);

  return (
    <div
      className='flex flex-col items-center justify-center min-h-screen'
      style={{
        backgroundImage:
          'linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/images/background-image2.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {isLoading && <Loader />}
      <ToasterProvider />
      <RegisterModal />
      <div className='flex flex-col items-center justify-center h-1/2 w-full'>
        <div className='text-4xl font-bold text-gray-200 mt-9'>
          {Array.from('Ready to fly?').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2 + index * 0.1,
                duration: 2, // Aumenta la duración aquí
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
        <div className='flex flex-wrap justify-center md:justify-between items-center mt-0 mb-5 w-full'>
          {session?.user?.email ? (
            <div className='flex justify-around w-full'>
              <motion.div
                variants={zoomIn(0, 0.6)}
                initial='hidden'
                whileInView='show'
                className='relative w-64 h-64 md:w-96 md:h-96 flex flex-col items-center justify-center transform hover:scale-110 cursor-pointer mx-6 my-6'
                onClick={() => {}}
              >
                <Image
                  src={`/images/mainImg.jpg`}
                  alt={'mainImage'}
                  width={500}
                  height={500}
                  className='rounded-full shadow-md object-cover'
                />
                <h3 className='absolute bottom-2 text-xl font-bold text-white bg-blue-500 p-2 rounded-lg'>
                  GO TO MAIN
                </h3>
              </motion.div>
              <motion.div
                variants={zoomIn(0, 0.6)}
                initial='hidden'
                whileInView='show'
                className='relative w-64 h-64 md:w-96 md:h-96 flex flex-col items-center justify-center transform hover:scale-110 cursor-pointer mx-6 my-6'
                onClick={() => {}}
              >
                <Image
                  src={`/images/profileimg.png`}
                  alt={'mainImage'}
                  width={500}
                  height={500}
                  className='rounded-full shadow-md object-cover'
                />
                <h3 className='absolute bottom-2 text-xl font-bold text-white bg-blue-500 p-2 rounded-lg'>
                  SET YOUR PROFILE
                </h3>
              </motion.div>
            </div>
          ) : (
            ['PILOT', 'INSTRUCTOR', 'COMPANY'].map((role, index) => (
              <div
                key={role}
                className='relative w-64 h-64 md:w-96 md:h-96 flex flex-col items-center justify-center transform 
                          hover:z-10 hover:scale-110 cursor-pointer transition-all duration-300 mx-6 my-6'
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
            ))
          )}
        </div>
      </div>
      <HomePageFeaturesSection />
      <HomePageTestimonialsSection />
    </div>
  );
};

export default HomePage;
