import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useUserStore } from '@/store/userStore';
import ToasterProvider from '../providers/ToasterProvider';
import { toast } from 'react-hot-toast';
import { sendContactForm } from '@/lib/api';
import { useSession } from 'next-auth/react';
import Loader from '../components/Loader';


const Success = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const { user, fetchUserByEmail } = useUserStore();

  useEffect(() => {
    if (session?.user?.email) {
      const email = session.user.email;
      fetchUserByEmail(email);
    }
  }, [session, fetchUserByEmail]);

  const values = {
    name: 'Flight Deck App',
    email: user?.email,
    subject: 'Payment approved, you are now a premium member!',
    message:
      'Your payment has been processed successfully. From now on, you are a premium member and can enjoy our service without any limitations.',
  };

  const premiumUser = async () => {
    try {
      setIsLoading(true);
      if (user?.id !== undefined) {
        console.log(user.id);
        await axios.put(`/api/user/${user.id}`, {
          premium: true,
        });
        await sendContactForm(values);
        setIsLoading(false);
        toast.success('Congratulations, You are Premium!!!');
      }
    } catch (error) {
      console.error('Error al guardar en la base de datos:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id !== undefined) premiumUser();
  }, [user?.id]);
  console.log(user?.id);

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
      {isLoading ? (
        <Loader />
      ) : (
        <div className='flex flex-col justify-items-start'>
          <ToasterProvider />
          <h1 className='text-6xl font-bold mb-10 text-center text-white'>Success!</h1>
          <p className='text-lg text-gray-300 mb-12 text-center'>
            Congratulations! Your action has been completed successfully.
          </p>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 self-center'
            onClick={() => {
              // Redireccionar al home
              window.location.href = '/home';
            }}
          >
            Go to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default Success;
