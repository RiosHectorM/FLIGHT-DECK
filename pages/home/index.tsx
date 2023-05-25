import Image from 'next/image';
import HomePageFeaturesSection from './FeaturesSection';
import HomePageTestimonialsSection from './TestimonialsSection';
import useRegisterModal from '../../utils/hooks/useRegisterModal';
import RegisterModal from '../components/Modals/LoguinRegister/RegisterModal';
import { motion } from 'framer-motion';
import { zoomIn } from '../../utils/motion/motion';
import ToasterProvider from '../providers/ToasterProvider';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useUserStore } from '@/store/userStore';
import Loader from '../components/Loader';
import { useRouter } from 'next/navigation';
import Footer from './Footer';

const HomePage = () => {
  const registerModal = useRegisterModal();
  const router = useRouter();

  const handleRole = (myRole: string) => {
    console.log(myRole);
    registerModal.onOpen();
  };

  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const { user, fetchUserByEmail } = useUserStore();

  useEffect(() => {
    if (session?.user?.email) {
      setIsLoading(true);
      const email = session.user.email;
      fetchUserByEmail(email);
      setIsLoading(false);
    }
  }, [session, fetchUserByEmail]);

  const handlerGoMain = () => {
    console.log('main');
    if (user?.role === 'PILOT') router.push('/mainPilot');
    else if (user?.role === 'INSTRUCTOR') router.push('/mainInstructor');
    else if (user?.role === 'COMPANY') router.push('/mainCompany');
  };

  const handlerGoProfile = () => {
    if (user?.role === 'PILOT') router.push('/dashboardPilot');
    else if (user?.role === 'INSTRUCTOR')
      router.push('/mainInstructor/DashboardInstructor');
    else if (user?.role === 'COMPANY')
      router.push('/mainCompany/DashBoardCompany');
  };

  return (
    <div
      className='flex flex-col items-center justify-center min-h-screen'
      style={{
        backgroundImage:
          'linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/images/fondo-pantalla-patron-fondo-abstracto-grunge-negro-foto-gratis (1).jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {isLoading && <Loader />}
      <ToasterProvider />
      <RegisterModal />
      <div className='flex flex-col items-center justify-center h-1/2 w-full'>
        <div className='text-4xl font-bold text-flightdeck-cream mt-9'>
          {Array.from('Ready to fly?').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2 + index * 0.1,
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className='text-flightdeck-gold'
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
                className='relative w-64 h-64 md:w-96 md:h-96 flex flex-col items-center justify-center transform hover:z-10 hover:scale-110 cursor-pointer transition-all duration-300 mx-6 my-6'
                onClick={handlerGoMain}
              >
                <Image
                  src={`/images/mainImg.jpg`}
                  alt='mainImage'
                  width={500}
                  height={500}
                  className='rounded-full shadow-md object-cover transform hover:scale-110'
                />
                <h3 className='absolute bottom-2 text-xl font-bold text-flightdeck-cream bg-flightdeck-gold p-2 rounded-lg'>
                  GO TO MAIN
                </h3>
              </motion.div>
              <motion.div
                variants={zoomIn(0, 0.6)}
                initial='hidden'
                whileInView='show'
                className='relative w-64 h-64 md:w-96 md:h-96 flex flex-col items-center justify-center transform hover:z-10 hover:scale-110 cursor-pointer transition-all duration-300 mx-6 my-6'
                onClick={handlerGoProfile}
              >
                <Image
                  src={`/images/profileimg.png`}
                  alt='mainImage'
                  width={500}
                  height={500}
                  className='rounded-full shadow-md object-cover transform hover:scale-110'
                />
                <h3 className='absolute bottom-2 text-xl font-bold text-flightdeck-cream bg-flightdeck-gold p-2 rounded-lg'>
                  SET YOUR PROFILE
                </h3>
              </motion.div>
            </div>
          ) : (
            ['PILOT', 'INSTRUCTOR', 'COMPANY'].map((role, index) => (
              <div
                key={role}
                className='relative w-64 h-64 md:w-96 md:h-96 flex flex-col items-center justify-center transform hover:z-10 hover:scale-110 cursor-pointer transition-all duration-300 mx-6 my-6'
                onClick={() => handleRole(role)}
              >
                <Image
                  src={`/images/${role.toLowerCase()}.png`}
                  alt={role.toLowerCase()}
                  width={500}
                  height={500}
                  className='rounded-full shadow-md object-cover'
                />
                <h3 className='absolute bottom-2 text-xl font-bold text-flightdeck-cream bg-flightdeck-gold p-2 rounded-lg'>
                  {role}
                </h3>
              </div>
            ))
          )}
        </div>
      </div>
      <HomePageFeaturesSection />
      <HomePageTestimonialsSection />
      <Footer />
    </div>
  );
};

export default HomePage;
