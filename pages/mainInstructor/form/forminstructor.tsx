import { useUserStore } from '@/store/userStore';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

type User = {
  id?: string;
  name?: string | null;
  lastName?: string | null;
  role?: string | null;
  email?: string | null;
  emailVerified?: string | null;
  image?: string | null;
  hashedPassword?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  city?: string | null;
  nationality?: string | null;
};

type FormData = {
  name: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  nationality: string;
};

interface Props {
  setShowInfo: (show: boolean) => void;
  setShowFormInstructor: (show: boolean) => void;
}

export default function FromInstructor({
  setShowInfo,
  setShowFormInstructor,
}: Props) {
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
    updateUser(newUserState as any);
    setShowInfo(true);
    setShowFormInstructor(false);
    toast.success('Info Updated');
  });

  const handleCancel = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setShowInfo(true);
    setShowFormInstructor(false);
  };
  return (
    <div className='flex w-full justify-center items-center'>
      <div className='border border-gray-300 bg-white  rounded-lg shadow-lg p-6 flex flex-col justify-center'>
        <div className='mb-4'>
          <div className='text-gray-900 font-bold text-xl mb-2'>
            Personal Information
          </div>
          <form
            onSubmit={onSubmit}
            className='w-full px-3 md:px-0 mb-6 md:mb-0'
          >
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='name'
                >
                  Name:
                  <input
                    placeholder='First Name'
                    className={`appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 leading-tight focus:bg-white focus:border-black`}
                    {...register('name')}
                  />
                </label>
              </div>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='name'
                >
                  Last Name:
                  <input
                    placeholder='Last Name'
                    className={`appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 leading-tight focus:bg-white focus:border-black`}
                    {...register('lastName')}
                  />
                </label>
              </div>
            </div>
            <div className='flex flex-wrap -mx-3'>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='city'
                >
                  Nationality:
                  <input
                    placeholder='Nationality'
                    className={`appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 leading-tight focus:bg-white focus:border-black`}
                    {...register('nationality')}
                  />
                </label>
              </div>
            </div>
            <div className='flex flex-wrap -mx-3'>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='city'
                >
                  City:
                  <input
                    placeholder='City'
                    className={`appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 leading-tight focus:bg-white focus:border-black`}
                    {...register('city')}
                  />
                </label>
              </div>
            </div>
            <div className='flex flex-wrap -mx-3'>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='address'
                >
                  Address:
                  <input
                    placeholder='Company Address'
                    className={`appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 leading-tight focus:bg-white focus:border-black`}
                    {...register('address')}
                  />
                </label>
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 '>
              <div className='w-full px-3 mb-4'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='phoneNumber'
                >
                  Phone Number:
                  <input
                    placeholder='Phone Number'
                    className={`appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 leading-tight focus:bg-white focus:border-black`}
                    {...register('phoneNumber')}
                  />
                </label>
              </div>
            </div>

            <div className='flex justify-around w-full'>
              <button
                className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                type='submit'
              >
                Submit
              </button>
              <button
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded'
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
