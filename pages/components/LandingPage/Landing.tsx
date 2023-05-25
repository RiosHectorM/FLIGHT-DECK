import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

const LandingPage = () => {
  const router = useRouter();
  const [startAnimation, setStartAnimation] = useState(false);

  const handleGetStartedClick = () => {
    setStartAnimation(true);
    setTimeout(() => {
      router.push('/home');
    }, 1000);
  };

  return (
    <div className='relative h-screen bg-gradient-to-r from-flightdeck-dark to-flightdeck-black'>
      <div
        className='relative flex flex-col items-center justify-center h-full '
        style={{
          backgroundImage:
            "url('/images/desenfoque-lujo-abstracto-degradado-gris-oscuro-negro-utilizado-como-pared-estudio-fondo-exhibir-sus-productos.jpg')", // Ruta de la imagen de fondo
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          className={`${
            startAnimation ? 'animate-spin-reverse' : ''
          } z-10 flex flex-col items-center mb-1`}
        >
          <div className='animate-pulse'>
            <Image
              src='/images/logoApp.png'
              alt='FlightLogo'
              width={300}
              height={300}
            />
          </div>
        </div>
        <div className='p-1'>
          <Image
            src='/images/Screenshot_4.png'
            alt='Flight Deck'
            width={700}
            height={700}
          />
        </div>
        <div
          className='z-10 max-w-md mb-48 p-6 rounded-lg shadow-xl'
          style={{
            backgroundColor: 'rgba(229, 217, 182, 0.1)', // Cambia los valores RGB y la transparencia según tus preferencias
          }}
        >
          <p className='text-center text-white text-xl font-medium mb-4'>
            Welcome to Flight Deck, the ultimate flight log app.
          </p>
          <p className='text-center text-white text-xl font-medium mb-4'>
            Sign up now and start organizing your travels!
          </p>
          <button
            type='button'
            onClick={handleGetStartedClick}
            className='w-full bg-flightdeck-gold hover:bg-flightdeck-darkgold text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300'
          >
            Get Started
          </button>
        </div>
      </div>
      <div className='absolute bottom-4 right-4 flex space-x-4'>
        <Image
          src='/images/androide.png'
          alt='Android logo'
          width={60}
          height={60}
        />
        <Image
          src='/images/apple-ios.svg'
          alt='iOS logo'
          width={60}
          height={60}
        />
      </div>
    </div>
  );
};

export default LandingPage;
