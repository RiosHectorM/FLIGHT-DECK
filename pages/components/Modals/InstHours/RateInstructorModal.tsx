'use client';

import axios from 'axios';
//import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useRateInstructorModal from '@/utils/hooks/useRateInstructorModal';

import Modal from '../../AuxComponents/ModalsGenerator/Modal';
import Input from '../../AuxComponents/InputsGenerator/Input';
import Heading from '../../AuxComponents/ModalsGenerator/Heading';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  rate: Number;
  dateFly: string;
  review: string;
}

const RateInstructorModal = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Hector Instructor',
    email: 'instructor@example.com',
    phone: '555-1234',
    rate: 100,
    dateFly: '09-06-2022',
    review: 'Buenisimo el loco',
  });

  const rateInstructor = useRateInstructorModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      rate: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    toast.success('Rate enviado');
    // axios
    //   .post('/api/register', data)
    //   .then(() => {
    //     toast.success('Registered!');
    //     rateInstructor.onClose();
    //   })
    //   .catch((error) => {
    //     toast.error('Error Login');
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  const onToggle = useCallback(() => {
    rateInstructor.onClose();
    //loginModal.onOpen();
  }, [rateInstructor]);
  //}, [approveModal, loginModal]);

  const bodyContent = (
    <div className='flex flex-col gap-4 overflow-x-scroll'>
      <Heading
        title='Calificar Instructor'
        subtitle={`Califica a ${profileData.name} por su instruccion el dia ${profileData.dateFly}`}
      />
      <Input
        id='rate'
        label='Rate'
        type='number'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='review'
        label='Review'
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
      <div
        className='
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        '
      >
        <p>Footer de esta ventana</p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={rateInstructor.isOpen}
      title='Rate Instructor'
      actionLabel='Send Rate'
      onClose={rateInstructor.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RateInstructorModal;
