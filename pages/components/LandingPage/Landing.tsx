import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const LandingPage = () => {
  const router = useRouter();
  const [startAnimation, setStartAnimation] = useState(false);

  const handleGetStartedClick = () => {
    setStartAnimation(true);
    setTimeout(() => {
      router.push('/home');
    }, 2000);
  };

  const logoAnimation = useSpring({
    transform: startAnimation ? 'translateY(-500px)' : 'translateY(0)',
    config: { tension: 120, friction: 14 },
  });

  return (
    <div className='relative h-screen bg-gradient-to-r from-blue-500 via-teal-500 to-green-500'
      style={{
        backgroundImage: "url('/images/clouds.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='flex flex-col items-center justify-center h-full'>
        <animated.div style={logoAnimation} className='z-10 flex flex-col items-center mb-8'>
          <div className='p-4 border-8 border-white shadow-2xl rounded-full animate-pulse'>
            <Image
              src='/images/flight-logo.png'
              alt='Flight logo'
              width={200}
              height={200}
            />
          </div>
          <h2 className='text-4xl font-bold text-white mt-4'>FLIGHTDECK</h2>
        </animated.div>
        <div className='z-10 max-w-md mb-8 p-6 bg-white rounded-lg shadow-xl'>
          <p className='text-center text-blue-900 text-xl font-medium mb-4'>
            Welcome to Flight Deck, the ultimate flight log app.
          </p>
          <p className='text-center text-blue-900 text-xl font-medium mb-4'>
            Sign up now and start organizing your travels!
          </p>
          <button
            type='button'
            onClick={handleGetStartedClick}
            className='w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300'
          >
            Get Started
          </button>
        </div>
      </div>
      <div className='absolute bottom-4 right-4 flex space-x-4'>
        <Image
          src='/images/android_robot.svg'
          alt='Android logo'
          width={50}
          height={50}
        />
        <Image
          src='/images/apple-ios.svg'
          alt='iOS logo'
          width={50}
          height={50}
        />
      </div>
    </div>
  );
};

export default LandingPage;
