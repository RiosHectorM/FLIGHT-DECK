'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import Heading from '../../AuxComponents/ModalsGenerator/Heading';

import useYouCantCertifyModal from '@/utils/hooks/useYouCantCertifyModal';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Modal from '../../AuxComponents/ModalsGenerator/Modal';
import { toast } from 'react-hot-toast';
import useAddPlaneModal from '@/utils/hooks/useAddPlaneModal';
import { useSession } from 'next-auth/react';
import Loader from '../../Loader';
import { sendContactForm } from '@/lib/api';
import Link from 'next/link';

interface Avion {
  registrationId: string;
  id: string;
  brand: string;
  model: string;
  planeClass: string;
  engine: string;
  HPs: number;
  remarks: string;
}



const YouCantCertifyModal = () => {
  const youCantCertifyModal = useYouCantCertifyModal();

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title="You can't certify hours at this time "
        subtitle='You need to get a subscription'
      />
      <div
        className='
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        '
      >
        <p>we hope you are enjoying using Flight Deck as mutch as we have enjoyed developing it.</p>
        <p>in order to keep certifying hours after you have certified your first 100 hours, you need a subscription</p>
        <p>You can get one following this link</p>
        <Link href='/membership'>
                  <span className='hidden md:block text-lm font-bold py-4 px-5 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
                    memberships
                  </span>
                </Link>
      </div>
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
        <p>You need to get a subscription in order to keep certifiyng hours</p>
      </div>
    </div>
  );

  return (
    <Modal

      isOpen={youCantCertifyModal.isOpen}
      title='Memberships'
      onClose={youCantCertifyModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default YouCantCertifyModal;
