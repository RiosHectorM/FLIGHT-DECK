'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import Heading from '../../components/AuxComponents/ModalsGenerator/Heading';
import Modal from '../../components/AuxComponents/ModalsGenerator/Modal';

import Loader from '../../components/Loader';

import useCertificatesModal from '@/utils/hooks/useCertificatesModal';
import CertificatePhoto from './CertificatePhoto';
import { CertificationType } from '@/types/globalTypes';

interface Props {
  userId: string;
  setAllCertificates: React.Dispatch<React.SetStateAction<CertificationType[]>>;
  image?: string | null;
  name?: string | null;
  expiration?: string | null;
  descrip?: string | null;
}

const ModalCertif: React.FC<Props> = ({ userId, setAllCertificates, image,  name, expiration, descrip}) => {
  const addCertificateModal = useCertificatesModal();

  const [isLoading, setIsLoading] = useState(false);

  const bodyContent = (
    <>
      <div className='flex flex-col gap-4'>
        {isLoading && <Loader />}
        <Heading title='Instructor Certificates' subtitle='Fill all fields' />
      </div>
      <div>
        <CertificatePhoto
          // PARA EL EDIT
          userId={userId}
          image={image}
          name={name}
          expiration={expiration}
          descrip={descrip}
          onClose={addCertificateModal.onClose}
          setAllCertificates={setAllCertificates}
        />
      </div>
    </>
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
        <p>
          Upload your Certificates to accredit your knowledge and qualifications
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={addCertificateModal.isOpen}
      title='Registration of Certificates in your Logbook'
      onSubmit={() => {}}
      onClose={addCertificateModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default ModalCertif;
