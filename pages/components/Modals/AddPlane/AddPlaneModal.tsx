'use client';

import axios from 'axios';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import Heading from '../../AuxComponents/ModalsGenerator/Heading';

import useAddPlaneModal from '@/pages/hooks/useAddPlaneModal';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Modal from '../../AuxComponents/ModalsGenerator/Modal';

const AddPlaneModal = () => {
  const addPlaneModal = useAddPlaneModal();

  const [isLoading, setIsLoading] = useState(false);


  const schema = yup
    .object({
      brand: yup
      .string()
        .required("Brand is required"),
      userid: yup.string().required(),
      model: yup
        .string()
        .required('Fecha es un campo obligatorio'),
      aircraftId: yup
        .mixed()
        .required("Id is a mandatory field"),
      class: yup.string().required('Class is a mandatory field'),
      remarks: yup.string(),
      engine: yup
      .string()
      .required("Engine is a mandatory Field"),
      HPs: yup
        .number()
        .positive('Must be positive')
        .integer("Must be Integer")
        .required('HP is a mandatory field'),
    })
    .required();
  type FormData = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors }, reset
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    reset();
    await axios.post(`http://localhost:3000/api/plane/`, data);
  };

  //  const onSubmit: SubmitHandler<FieldValues> = (data) => {
  //setIsLoading(true);
  //console.log('data');
  // axios
  //   .post('/api/register', data)
  //   .then(() => {
  //     toast.success('Registered!');
  //     registerModal.onClose();
  //     loginModal.onOpen();
  //   })
  //   .catch((error) => {
  //     toast.error('Error Login');
  //   })
  //   .finally(() => {
  //     setIsLoading(false);
  //   });
  //};

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='Add Plane to DB'
        subtitle='Fill in all the fields'
      />
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col '>
        <div className='flex flex-col text-center'>
          <div className='flex justify-between'>
            <label>User: </label>
            <input className='border border-black' {...register('userid')} />
          </div>
          <p className='text-red-600'>{errors.userid?.message}</p>
        </div>
        <div className='flex flex-col text-center'>
          <div className='flex justify-between'>
            <label>Brand: </label>
            <input className='border border-black' {...register('brand')} />
          </div>
          <p className='text-red-600'>{errors.brand?.message}</p>
        </div>
        <div className='flex flex-col text-center'>
          <div className='flex justify-between'>
            <label>Class: </label>
            <input className='border border-black' {...register('class')} />
          </div>
          <p className='text-red-600'>{errors.class?.message}</p>
        </div>
        <div className='flex flex-col text-center'>
          <div className='flex justify-between'>
            <label>Model: </label>
            <input className='border border-black' {...register('model')} />
          </div>
          <p className='text-red-600'>{errors.model?.message}</p>
        </div>
        <div className='flex flex-col text-center'>
          <div className='flex justify-between'>
            <label>Engine´s Brand: </label>
            <input className='border border-black' {...register('engine')} />
          </div>
          <p className='text-red-600'>{errors.engine?.message}</p>
        </div>
        <div className='flex flex-col text-center'>
          <div className='flex justify-between'>
            <label>HPs: </label>
            <input className='border border-black' {...register('HPs')} />
          </div>
          <p className='text-red-600'>{errors.HPs?.message}</p>
        </div>
        <div className='flex flex-col text-center'>
          <div className='flex justify-between'>
            <label>Plane Id: </label>
            <input className='border border-black' {...register('aircraftId')} />
          </div>
          <p className='text-red-600'>{errors.aircraftId?.message}</p>
        </div>
        <button>SEND</button>
      </form>
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
        <p>Add Plane's Footer</p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={addPlaneModal.isOpen}
      title='ADD PLANE'
      onClose={addPlaneModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default AddPlaneModal;
