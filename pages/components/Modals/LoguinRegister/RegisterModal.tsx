'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
//import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  Controller,
  UseFormSetValue,
} from 'react-hook-form';

import useLoginModal from '@/pages/hooks/useLoginModal';
import useRegisterModal from '@/pages/hooks/useRegisterModal';

import Modal from '../../AuxComponents/ModalsGenerator/Modal';
import Input from '../../AuxComponents/InputsGenerator/Input';
import Heading from '../../AuxComponents/ModalsGenerator/Heading';
import Button from '../../AuxComponents/Button';
import { signIn } from 'next-auth/react';
import Loader from '../../Loader';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data);
    axios
      .post('/api/register', data)
      .then(() => {
        toast.success('Registered!');
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error('Email in Use');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValue('role', value);
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      {isLoading && <Loader />}
      <Heading title='Welcome to Flight Deck' subtitle='Create your account' />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='name'
        label='Name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        label='Password'
        type='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <div>
        <h1 className='text-2xl font-bold pb-2'>Choose Your Role to Join Us</h1>
        <div
          className='flex justify-around gap-2'
          style={errors?.role ? { background: 'red' } : undefined}
        >
          <label className='inline-flex items-center'>
            <input
              type='radio'
              value='PILOT'
              {...register('role', { required: true })}
              className='form-radio text-indigo-600 h-5 w-5'
            />
            <span className='ml-2 text-gray-700 text-xl'>Pilot</span>
          </label>
          <label className='inline-flex items-center'>
            <input
              type='radio'
              value='INSTRUCTOR'
              {...register('role', { required: true })}
              className='form-radio text-indigo-600 h-5 w-5'
            />
            <span className='ml-2 text-gray-700 text-xl'>Instructor</span>
          </label>
          <label className='inline-flex items-center'>
            <input
              type='radio'
              value='COMPANY'
              {...register('role', { required: true })}
              className='form-radio text-indigo-600 h-5 w-5'
            />
            <span className='ml-2 text-gray-700 text-xl'>Company</span>
          </label>
        </div>
        {errors.role && (
          <p className='text-red-600 text-center'>Choose Your Role</p>
        )}
      </div>
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() =>
          signIn('google', {
            callbackUrl: 'http://localhost:3000/home/chooseRole',
          })
        }
      />
      <div
        className='
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        '
      >
        <p>
          Already have an account?
          <span
            onClick={onToggle}
            className='
              text-neutral-800
              cursor-pointer 
              hover:underline
            '
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Register'
      actionLabel='Continue'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
