'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import Heading from '../../AuxComponents/ModalsGenerator/Heading';

import useRejectModal from '@/pages/hooks/useRejectModal';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Modal from '../../AuxComponents/ModalsGenerator/Modal';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import Loader from '../../Loader';
import { sendContactForm } from '@/lib/api';

const RejectModal = ({ email }) => {

  const rejectModal = useRejectModal();



  const schema = yup
    .object({

      reason: yup.string().required('please indicate the reject reason'),

    })
    .required();
  type FormData = yup.InferType<typeof schema>;

  const {
    reset,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    reset();

    const values = {
      name: 'Flight Deck App',
      email: email,
      subject: 'Hours Rejected',
      message: 'The instructor has rejected the Hour you have sent for certification',
    
    };


          await sendContactForm(values)

rejectModal.onClose()
 
          
    };



  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='Please indicate the reject Reason'
        subtitle='An email will be sent to the pilot'
      />

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col '>
        <div className='grid md:grid-cols-2 md:gap-6'>

        <div className='relative z-0 w-full mb-6 group'>
          <textarea
            rows={2}
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            {...register('reason')}
          />
          <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
            Reject Reson:
          </label>
          <p className='text-red-600'>{errors.reason?.message}</p>
        </div>
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
        <p>reject form</p>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={rejectModal.isOpen}
      title='Reject HOURS'
      onClose={rejectModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RejectModal;