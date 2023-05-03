'use client';

import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

import useRegisterModal from '@/pages/hooks/useRegisterModal';
import useLoginModal from '@/pages/hooks/useLoginModal';

import Modal from '../../AuxComponents/ModalsGenerator/Modal';
import Input from '../../AuxComponents/InputsGenerator/Input';
import Heading from '../../AuxComponents/ModalsGenerator/Heading';
import Button from '../../AuxComponents/Button';
import axios from 'axios';

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const userByRole = async (email: string) => {
    setIsLoading(true);
    return axios
      .get(`/api/getUserByEmail/${email}`)
      .then((result) => {
        return result.data;
      })
      .catch(() => {
        toast.error('Error User Search');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        setIsLoading(false);

        if (callback?.ok) {
          // BUSCAR USUARIO POR MAIL Y TRAER EL CAMPO ROLE
          let result = userByRole(data.email);
          result.then((user) => {
            toast.success('Logged in');
            console.log(user);
            if (user.role === 'PILOT') router.push('/mainPilot');
            else if (user.role === 'INSTRUCTOR') router.push('/mainInstructor');
            else if (user.role === 'COMPANY') router.push('/mainCompany');
          });
          loginModal.onClose();
        }
        if (callback?.error) {
          toast.error(callback.error);
        }
      })
      .catch(() => {
        toast.error('callback.error');
      });
  };

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome back' subtitle='Login to your account!' />
      <Input
        id='email'
        label='Email'
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
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button
        outline
        label='Continue with Facebook'
        icon={FaFacebook}
        onClick={() =>
          signIn('facebook', {
            callbackUrl: 'http://localhost:3000/home/chooseRole',
          })
        }
      />
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
      <Button
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() =>
          signIn('github', {
            callbackUrl: 'http://localhost:3000/home/chooseRole',
          })
        }
      />
      <div
        className='
      text-neutral-500 text-center mt-4 font-light'
      >
        <p>
          First time using Flight Deck?
          <span
            onClick={onToggle}
            className='
              text-neutral-800
              cursor-pointer 
              hover:underline
            '
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
