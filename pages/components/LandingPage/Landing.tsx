import { useRouter } from 'next/router';
import Image from 'next/image';

const LandingPage = () => {
  const router = useRouter();

  const handleGetStartedClick = () => {
    router.push('/home');
  };

  return (
    <div
      className='flex flex-col items-center justify-center h-screen'
      style={{
        backgroundImage: "url('/images/background4.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#fff',
        marginLeft: '-20px',
        marginRight: '-20px',
        marginTop: '-20px',
        padding: '20px',
      }}
    >
      <div className='mb-8'>
        <Image
          src='/images/flight-logo.png'
          alt='Flight logo'
          width={200}
          height={200}
        />
        <h2 className='text-3xl font-bold text-gray-200'>FLIGHTDECK</h2>
      </div>
      <div className='mb-8'>
        <p className='text-center text-gray-200 text-lg font-medium'>
          Welcome to Flight Log, the best app to manage your flights.
        </p>
        <p className='text-center text-gray-200 text-lg font-medium'>
          Sign up now and start organizing your travels!
        </p>
      </div>
      <button
        type='button'
        onClick={handleGetStartedClick}
        className='bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline'
      >
        Get Started
      </button>
    </div>
  );
};

export default LandingPage;
