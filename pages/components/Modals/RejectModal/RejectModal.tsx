'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import Heading from '../../AuxComponents/ModalsGenerator/Heading';

import useRejectModal from '@/utils/hooks/useRejectModal';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Modal from '../../AuxComponents/ModalsGenerator/Modal';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import Loader from '../../Loader';
import { sendContactForm } from '@/lib/api';

interface RejectModalProps {
  email: string;
}

const RejectModal: React.FC<RejectModalProps> = ({ email }) => {
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
      message: `The instructor has rejected the Hour you have sent for certification. ${data.reason}`,
    };
    toast.success('Sending...');
    rejectModal.onClose();
    await sendContactForm(values);
    toast.success('Sent');
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='Please indicate the reject Reason'
        subtitle='An email will be sent to the pilot'
      />

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col '>
        <div className='flex w-full md:gap-6'>
          <div className='relative z-0 w-full mb-6 group'>
            <textarea
              rows={2}
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-500 peer'
              placeholder=' '
              {...register('reason')}
            />
            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Reject Reson:
            </label>
            <p className='text-red-600'>{errors.reason?.message}</p>
          </div>
        </div>
        <button className='font-sans bg-flightdeck-black text-flightdeck-lightgold  rounded-md py-2 hover:bg-flightdeck-darkgold hover:text-black border hover:border-black mt-4'>
          SEND
        </button>
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
        <p>Rejection form to send email to the requesting Pilot.</p>
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
