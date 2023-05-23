import React, { useState } from 'react';
import { useUserStore } from '@/store/userStore';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { validateField } from '../../../utils/libs/validate';

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

const validationRules = {
  name: {
    required: 'Name is required.',
    pattern: {
      value: /^[a-zA-Z\s]*$/, // Solo letras y espacios
      message: 'Name can only contain letters and spaces.',
    },
    minLength: {
      value: 3,
      message: 'Name must have at least 3 characters.',
    },
    maxLength: {
      value: 50,
      message: 'Name cannot exceed 50 characters.',
    },
  },
  lastName: {
    required: 'Last Name is required.',
    pattern: {
      value: /^[a-zA-Z\s]*$/, // Solo letras y espacios
      message: 'Last Name can only contain letters and spaces.',
    },
    minLength: {
      value: 3,
      message: 'Last Name must have at least 3 characters.',
    },
    maxLength: {
      value: 50,
      message: 'Last Name cannot exceed 50 characters.',
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
      value: 60,
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
  nationality: {
    required: 'Nationality is required.',
    pattern: {
      value: /^[a-zA-Z\s]*$/, // Solo letras y espacios
      message: 'Nationality can only contain letters and spaces.',
    },
    minLength: {
      value: 3,
      message: 'Nationality must have at least 3 characters.',
    },
    maxLength: {
      value: 50,
      message: 'Nationality cannot exceed 50 characters.',
    },
  },
};

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

  const [formErrors, setFormErrors] = useState<Record<string, any>>({});

  const onSubmit = handleSubmit((data) => {
    const errors: Record<string, any> = {};

    validateField('name', data.name, validationRules.name, errors);
    validateField('lastName', data.lastName, validationRules.lastName, errors);
    validateField(
      'phoneNumber',
      data.phoneNumber,
      validationRules.phoneNumber,
      errors
    );
    validateField('address', data.address, validationRules.address, errors);
    validateField('city', data.city, validationRules.city, errors);
    validateField(
      'nationality',
      data.nationality,
      validationRules.nationality,
      errors
    );

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setFormErrors({});

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
    }
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
      <div className='border border-gray-300 bg-white  w-full sm:w-96 p-6'>
        <h1 className='text-2xl text-center mb-4'>Update Info</h1>
        <form onSubmit={onSubmit}>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='name'
            >
              Name
            </label>
            <input
              {...register('name', { required: true })}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='name'
              type='text'
              placeholder='Name'
            />
            {formErrors.name && (
              <p className='text-red-500 text-xs italic'>
                {formErrors.name.message}
              </p>
            )}
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='lastName'
            >
              Last Name
            </label>
            <input
              {...register('lastName', { required: true })}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='lastName'
              type='text'
              placeholder='Last Name'
            />
            {formErrors.lastName && (
              <p className='text-red-500 text-xs italic'>
                {formErrors.lastName.message}
              </p>
            )}
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='phoneNumber'
            >
              Phone Number
            </label>
            <input
              {...register('phoneNumber', { required: true })}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='phoneNumber'
              type='text'
              placeholder='Phone Number'
            />
            {formErrors.phoneNumber && (
              <p className='text-red-500 text-xs italic'>
                {formErrors.phoneNumber.message}
              </p>
            )}
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='address'
            >
              Address
            </label>
            <input
              {...register('address', { required: true })}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='address'
              type='text'
              placeholder='Address'
            />
            {formErrors.address && (
              <p className='text-red-500 text-xs italic'>
                {formErrors.address.message}
              </p>
            )}
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='city'
            >
              City
            </label>
            <input
              {...register('city', { required: true })}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='city'
              type='text'
              placeholder='City'
            />
            {formErrors.city && (
              <p className='text-red-500 text-xs italic'>
                {formErrors.city.message}
              </p>
            )}
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='nationality'
            >
              Nationality
            </label>
            <input
              {...register('nationality', { required: true })}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='nationality'
              type='text'
              placeholder='Nationality'
            />
            {formErrors.nationality && (
              <p className='text-red-500 text-xs italic'>
                {formErrors.nationality.message}
              </p>
            )}
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'
            >
              Update
            </button>
            <button
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
