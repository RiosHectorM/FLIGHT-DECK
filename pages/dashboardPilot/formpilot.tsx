import React from 'react';
import { useForm } from 'react-hook-form';
import { useUserStore } from '../../store/userStore';

type User = {
  id: string | undefined | null;
  name: string | undefined | null;
  lastName: string | undefined | null;
  role: string | undefined | null;
  email: string | undefined | null;
  emailVerified: string | undefined | null;
  image: string | undefined | null;
  hashedPassword: string | undefined | null;
  phoneNumber: string | undefined | null;
  address: string | undefined | null;
  city: string | undefined | null;
  nationality: string | undefined | null;
};

type FormData = {
  name: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  nationality: string;
};

export function FormPilot() {
  const { user, updateUser } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: user?.name || '',
      lastName: user?.lastName || '',
      phoneNumber: user?.phoneNumber || '',
      address: user?.address || '',
      city: user?.city || '',
      nationality: user?.nationality || '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    let newUserState: User = {
      ...user,
      name: data.name,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      address: data.address,
      city: data.city,
      nationality: data.nationality,
    };
    updateUser(newUserState);
    alert('Info Updated');
  });

  return (
    <div className='max-w-sm lg:max-w-full lg:flex w-full'>
      <div className='border border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal'>
        <div className='mb-8'>
          <p className='text-sm text-gray-600 flex items-center'>
            <svg
              className='fill-current text-gray-500 w-3 h-3 mr-2'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
            >
              <path d='M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z' />
            </svg>
            Members only
          </p>
          <div className='text-gray-900 font-bold text-xl mb-2'>
            Personal information
          </div>
          <form onSubmit={onSubmit} className='w-full px-3 mb-6 md:mb-0'>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full md:w-1/2 px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='name'
                >
                  Name:
                  <input
                    placeholder='First Name'
                    className={`appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                    {...register('name')}
                  />
                </label>
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='lastName'
                >
                  Last Name:
                  <input
                    placeholder='Last Name'
                    className={`appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                    {...register('lastName')}
                  />
                </label>
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full md:w-1/2 px-3 mb-6'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='phoneNumber'
                >
                  Phone Number:
                  <input
                    placeholder='Phone Number'
                    className={`appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                    {...register('phoneNumber')}
                  />
                </label>
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='address'
                >
                  Address:
                  <input
                    placeholder='Address'
                    className={`appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                    {...register('address')}
                  />
                </label>
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-2'>
              <div className='w-full md:w-1/2 px-3 '>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='city'
                >
                  City:
                  <input
                    placeholder='Address'
                    className={`appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                    {...register('city')}
                  />
                </label>
              </div>
              <div className='w-full md:w-1/2 px-3 '>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='nationality'
                >
                  Nationality:
                  <input
                    placeholder='Address'
                    className={`appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                    {...register('nationality')}
                  />
                </label>
              </div>
            </div>
            <div className='flex justify-center'>
              <button
                className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                type='submit'
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
