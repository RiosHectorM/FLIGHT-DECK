import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loader from '@/pages/components/Loader';
import ToasterProvider from '@/pages/providers/ToasterProvider';
import { motion } from 'framer-motion';
import { useUserStore } from '@/store/userStore';

const roles = [
  {
    role: 'PILOT',
    image: '/images/pilot.png',
    alt: 'pilot',
  },
  {
    role: 'INSTRUCTOR',
    image: '/images/instructor.png',
    alt: 'instructor',
  },
  {
    role: 'COMPANY',
    image: '/images/company.png',
    alt: 'company',
  },
];

type FormData = {
  email: string;
  role: string;
};

export default function Form() {

  const [roleNoExist, setRoleNoExist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, register } = useForm<FormData>();
  const router = useRouter();

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

  useEffect(() => {
    if (user?.role) {
      if (user.role) setRoleNoExist(false);
      if (user.role === 'PILOT') router.push('/mainPilot');
      else if (user.role === 'INSTRUCTOR') router.push('/mainInstructor');
      else if (user.role === 'COMPANY') router.push('/mainCompany');
    } else {
      setRoleNoExist(true);
      console.log('No hay sesion');
    }
  }, [user?.role]);

  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    axios
      .put('/api/postRoleByEmail', {
        email: user?.email,
        role: data.role,
      })
      .then((response) => {
        if (response.data.role === 'PILOT') router.push('/mainPilot');
        else if (response.data.role === 'INSTRUCTOR')
          router.push('/mainInstructor');
        else router.push('/mainCompany');
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className='min-h-screen bg-black justify-center text-center w-full'>
      <ToasterProvider />
      {isLoading && <Loader />}
      {roleNoExist && (
        <div className='flex flex-col text-center justify-center w-full'>
          <motion.h2
            className='text-4xl font-bold text-flightdeck-lightgold text-center w-full'
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Join Us as a
            <motion.span
              className='text-flightdeck-darkgold'
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {' '}
              PILOT, INSTRUCTOR or COMPANY
            </motion.span>
          </motion.h2>

          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
            <div className='flex flex-col justify-center lg:flex-row lg:justify-around'>
              {roles.map((item) => (
                <div
                  key={item.alt}
                  className='p-2 flex flex-col items-center justify-around text-center'
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={400}
                    height={400}
                    className='rounded-full shadow-md'
                  />
                  <div className='flex p-4 justify-center w-full'>
                    <input
                      type='radio'
                      
                      id={item.alt}
                      value={item.role}
                      {...register('role', { required: true })}
                      className='h-8 w-8'
                    />
                    <label
                      htmlFor={item.alt}
                      className='pl-2 text-flightdeck-darkgold font-bold text-3xl'
                    >
                      {item.role}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <button
              type='submit'
              className='font-sans font-bold text-2xl bg-flightdeck-lightgold text-black  rounded-md py-2 hover:bg-flightdeck-darkgold  border hover:border-flightdeck-lightgold my-2 w-3/5 self-center'
            >
              GET IN
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
