'use client';

//import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useApproveModal from '@/utils/hooks/useApproveModal';

import Modal from '../../AuxComponents/ModalsGenerator/Modal';
import Heading from '../../AuxComponents/ModalsGenerator/Heading';

//POR LAS DUDAS ELIMINAR ESTE COMPONENTE

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  hours: Number;
  date: string;
  etapas: string;
  observaciones: string;
}

const ApproveModal = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Hector Martin Rios',
    email: 'johndoe@example.com',
    phone: '555-1234',
    hours: 5,
    date: '09-06-2022',
    etapas: 'ARG-COL',
    observaciones: 'Vuelo sin complicaciones',
  });

  const approveModal = useApproveModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      aproved: '',
    },
  });

  const onSubmitOK = (data: FieldValues) => {
    console.log('APPROVE');
    toast.success('APPROVE!');
  };

  const onSubmitFail = (data: FieldValues) => {
    console.log('DONT APPROVE');
    toast.success('DONT APPROVE');
  };

  const onToggle = useCallback(() => {
    approveModal.onClose();
    //loginModal.onOpen();
  }, [approveModal]);
  //}, [approveModal, loginModal]);

  const bodyContent = (
    <div className='flex flex-col gap-4 overflow-x-scroll'>
      <Heading
        title='Aprovar Horas'
        subtitle={`El piloto ${profileData.name} solicita aprobacion de ${profileData.hours} horas`}
      />
      <table className='min-w-full text-center text-sm font-light'>
        <thead className='border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800'>
          <tr className='flex-nowrap'>
            <th scope='col' className='whitespace-nowrap  px-6 py-4'>
              Date
            </th>
            <th scope='col' className='whitespace-nowrap  px-6 py-4'>
              Name
            </th>
            <th scope='col' className='whitespace-nowrap  px-6 py-4'>
              Email
            </th>
            <th scope='col' className='whitespace-nowrap  px-6 py-4'>
              Phone
            </th>
            <th scope='col' className='whitespace-nowrap  px-6 py-4'>
              Etapas
            </th>
            <th scope='col' className='whitespace-nowrap  px-6 py-4'>
              Observaciones
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='whitespace-nowrap px-6 py-4'>{profileData.date}</td>
            <td className='whitespace-nowrap px-6 py-4'>{profileData.name}</td>
            <td className='whitespace-nowrap px-6 py-4'>{profileData.email}</td>
            <td className='whitespace-nowrap px-6 py-4'>{profileData.phone}</td>
            <td className='whitespace-nowrap px-6 py-4'>
              {profileData.etapas}
            </td>
            <td className='whitespace-nowrap px-6 py-4'>
              {profileData.observaciones}
            </td>
          </tr>
        </tbody>
      </table>
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
      isOpen={approveModal.isOpen}
      title='Approve Hours'
      actionLabel='Approve'
      onClose={approveModal.onClose}
      onSubmit={handleSubmit(onSubmitOK)}
      secondaryAction={handleSubmit(onSubmitFail)}
      secondaryActionLabel='Dont ApproveHours'
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default ApproveModal;
