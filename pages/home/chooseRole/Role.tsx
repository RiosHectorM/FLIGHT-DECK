import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

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
  const { handleSubmit, register } = useForm<FormData>();
  const router = useRouter();
  const { data } = useSession();
  let email = '';
  if (data?.user?.email) {
    email = data?.user?.email;
    console.log('hay sesion iniciada');
  } else {
    console.log('No hay sesion');
  }

  const onSubmit = (data: FormData) => {
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
      .catch((error) => console.log(error));
  };

  return (
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
  );
}
