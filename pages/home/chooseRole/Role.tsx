import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Loader from '@/pages/components/Loader';
import ToasterProvider from '@/pages/providers/ToasterProvider';

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
  const userByRole = async (email: string) => {
    return axios
      .get(`/api/getUserByEmail/${email}`)
      .then((result) => result.data)
      .catch(() => {
        console.error('Error User Search');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const [isLoading, setIsLoading] = useState(true);
  const [roleNoExist, setRoleNoExist] = useState(true);

  const { handleSubmit, register } = useForm<FormData>();
  const router = useRouter();
  const { data } = useSession();
  let email = '';
  if (data?.user?.email) {
    email = data?.user?.email;
    let result = userByRole(email);
    result.then((user) => {
      console.log(user);
      if (user.role) setRoleNoExist(false);
      if (user.role === 'PILOT') router.push('/mainPilot');
      else if (user.role === 'INSTRUCTOR') router.push('/mainInstructor');
      else if (user.role === 'COMPANY') router.push('/mainCompany');
    });
  } else {
    console.log('No hay sesion');
  }

  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    axios
      .put('http://localhost:3000/api/postRoleByEmail', {
        email: email,
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
    <div>
      <ToasterProvider />
      {isLoading && <Loader />}
      {roleNoExist && (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
          <div className='flex'>
            {roles.map((item) => (
              <div
                key={item.alt}
                className='p-2 flex flex-col justify-center text-center'
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
                  />
                  <label htmlFor={item.alt} className='pl-2'>
                    {item.role}
                  </label>
                </div>
              </div>
            ))}
          </div>
          <button
            type='submit'
            className='bg-blue-300 text-black text-2xl rounded-xl'
          >
            GET IN
          </button>
        </form>
      )}
    </div>
  );
}
