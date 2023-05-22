import { validateField } from '@/pages/mainInstructor/form/validate';
import { useUserStore } from '@/store/userStore';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type User = {
  id?: string;
  name?: string | null;
  role?: string | null;
  email?: string | null;
  emailVerified?: string | null;
  image?: string | null;
  hashedPassword?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  city?: string | null;

};

type FormData = {
  name: string;
  phoneNumber: string;
  address: string;
  city: string;
};

const validationRules = {
  name: {
    required: 'Name is required.',
    minLength: {
      value: 3,
      message: 'Name must have at least 3 characters.',
    },
    maxLength: {
      value: 50,
      message: 'Name cannot exceed 50 characters.',
    },
  },
  phoneNumber: {
    required: 'Phone Number is required.',
    pattern: {
      value: /^\+?\d+$/, // Solo números y un signo de +
      message: 'Phone Number must be a valid number.',
    },
    maxLength: {
      value: 15,
      message: 'Phone Number cannot exceed 15 characters.',
    },
  },
  address: {
    required: 'Address is required.',
    maxLength: {
      value: 80,
      message: 'Address cannot exceed 60 characters.',
    },
  },
  city: {
    required: 'City is required.',
    pattern: {
      value: /^[a-zA-Z\s]*$/, // Solo letras y espacios
      message: 'City can only contain letters and spaces.',
    },
    minLength: {
      value: 3,
      message: 'City must have at least 3 characters.',
    },
    maxLength: {
      value: 50,
      message: 'City cannot exceed 50 characters.',
    },
  },
};

export default function FormCompany() {

  const [formErrors, setFormErrors] = useState<Record<string, any>>({});
  const { user, updateUser } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: user?.name || '',
      phoneNumber: user?.phoneNumber || '',
      address: user?.address || '',
      city: user?.city || '',
    },
  });

  const onSubmit = handleSubmit((data) => {

    const errors: Record<string, any> = {};

    validateField('name', data.name, validationRules.name, errors);
    validateField('phoneNumber', data.phoneNumber, validationRules.phoneNumber, errors);
    validateField('address', data.address, validationRules.address, errors);
    validateField('city', data.city, validationRules.city, errors);


    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setFormErrors({});

      let newUserState: User = {
        ...user,
        name: data.name,
        phoneNumber: data.phoneNumber,
        address: data.address,
        city: data.city,
      };
      updateUser(newUserState as any);
      alert('Info Updated');
    }
  });

  return (
    <div className='max-w-sm lg:max-w-full lg:flex w-full'>
      <div className='border border-gray-300 bg-white  rounded-lg shadow-lg p-6 flex flex-col justify-center'>
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
            Company Information
          </div>
          <form onSubmit={onSubmit} className='w-full px-3 mb-6 md:mb-0'>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='name'
                >
                  Name of the Company or Organization:
                  <input
                    placeholder='Name of the company'
                    className={`appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 leading-tight focus:bg-white focus:border-black`}
                    {...register('name', { required: true })}
                  />
                  {formErrors.name && (
                    <p className='text-red-500 text-xs italic'>{formErrors.name.message}</p>
                  )}
                </label>
              </div>

            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='address'
                >
                  Address:
                  <input
                    placeholder='Company Address'
                    className={`appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 leading-tight focus:bg-white focus:border-black`}
                     {...register('address', { required: true })}
                  />
                  {formErrors.address && (
                    <p className='text-red-500 text-xs italic'>{formErrors.address.message}</p>
                  )}
                </label>
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full md:w-1/2 px-3 mb-6'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='city'
                >
                  City:
                  <input
                    placeholder='City'
                    className={`appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 leading-tight focus:bg-white focus:border-black`}
                    {...register('city', { required: true })}
                    />
                    {formErrors.city && (
                      <p className='text-red-500 text-xs italic'>{formErrors.city.message}</p>
                    )}
                </label>
              </div>
              <div className='w-full md:w-1/2 px-3 mb-6'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='phoneNumber'
                >
                  Phone Number:
                  <input
                    placeholder='Phone Number'
                    className={`appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 leading-tight focus:bg-white focus:border-black`}
                    {...register('phoneNumber', { required: true })}
                    />
                    {formErrors.phoneNumber && (
                      <p className='text-red-500 text-xs italic'>{formErrors.phoneNumber.message}</p>
                    )}
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
