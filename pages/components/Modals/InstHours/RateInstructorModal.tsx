'use client';

import axios from 'axios';
//import { signIn } from 'next-auth/react';
import { SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import StarRating from '../../AuxComponents/StarRating';
import useRateInstructorModal from '@/utils/hooks/useRateInstructorModal';

import Modal from '../../AuxComponents/ModalsGenerator/Modal';
import Input from '../../../../InputsGenerator/Input';
import Heading from '../../AuxComponents/ModalsGenerator/Heading';

const RateInstructorModal = ({
  instructor,
  user,
  name,
  image,
  setIsLoading,
}: {
  instructor: any;
  user: string;
  name: string;
  image: string;
  setIsLoading: (isLoading: boolean) => void;
}) => {
  const rateInstructor = useRateInstructorModal();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    reset();
    rateInstructor.onClose();
    setIsLoading(true);
    console.log(data);
    await axios
      .post(`/api/qualify`, {
        ...data,
        pilotId: user,
        pilotName: name,
        pilotImage: image,
        instructorId: instructor.id,
        qualificationNum: rating,
      })
      .then(() => {
        toast.success('Rating Saved');
      })
      .finally(() => {
        setIsLoading(false);
        setRating(0)
      });
  };
  const [rating, setRating] = useState(0);

  const rankear = (index: SetStateAction<number>) => {
    setRating(index);
  };
  const bodyContent = (
    <div className='flex flex-col gap-4 overflow-x-scroll'>
      <Heading
        title='Rate Instructor'
        subtitle={`Rate instructor ${instructor?.name} ${
          instructor?.lastName && instructor?.lastName
        } for his qualities as a Pilot Instructor`}
      />

      <div className='flex w-full justify-around'>
        <StarRating rating={rating} rankear={rankear} />
      </div>
      <Input
        id='comment'
        label='Review'
        disabled={false}
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
        <p>Rate the Instructor according to your flight experience</p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={false}
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
