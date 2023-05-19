'use client';

import axios from 'axios';
//import { signIn } from 'next-auth/react';
import { SetStateAction, useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import StarRating from "../../AuxComponents/StarRating"
import useRateInstructorModal from '@/utils/hooks/useRateInstructorModal';

import Modal from '../../AuxComponents/ModalsGenerator/Modal';
import Input from '../../../../InputsGenerator/Input';
import Heading from '../../AuxComponents/ModalsGenerator/Heading';



const RateInstructorModal = ({instructor, user}:{instructor:any; user:string}) => {


  const rateInstructor = useRateInstructorModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data)
    await axios
    .post(`/api/qualify`, {
      ...data,
      pilotId: user,
      instructorId: instructor.id,
      qualificationNum: rating
   })
   .then(() => {
    toast.success('Rating aved');
   rateInstructor.onClose();

    })
  };
  const [rating, setRating] = useState(0);

  const rankear=(index: SetStateAction<number>)=>{setRating(index)
 }
  const bodyContent = (
    <div className='flex flex-col gap-4 overflow-x-scroll'>
      <Heading
        title='Rate Instructor'
        subtitle={`Rate instructor ${instructor.name} ${instructor.lastName && instructor.lastName} for his qualities as a pilot instructor`}
      />

      <StarRating rating={rating} rankear={rankear}/>
      <Input
        id='comment'
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
