'use client';

import Heading from '../../AuxComponents/ModalsGenerator/Heading';

import useYouCantCertifyModal from '@/utils/hooks/useYouCantCertifyModal';

import Modal from '../../AuxComponents/ModalsGenerator/Modal';
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
        title="YOU CAN'T CERTIFY HOURS AT THIS TIME"
        subtitle='YOU NEED TO GET A SUSCRIPTION'
      />
      <div
        className='
          text-black 
          text-center 
          mt-4 
          font-light
        '
      >
        <p>
          We hope you are enjoying using Flight Deck as mutch as we have enjoyed
          developing it.
        </p>
        <p>
          In order to keep certifying hours after you have certified your first
          100 hours, you need a Subscription.
        </p>
        <p className='mt-4'>You can get one following this link:</p>
        <Link href='/membership'>
          <p className='font-sans bg-flightdeck-black text-flightdeck-lightgold  rounded-md py-2 hover:bg-flightdeck-darkgold hover:text-black border hover:border-black mt-4'>
            GET PREMIUM
          </p>
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
        <p>You need to get a Subscription in order to keep certifiyng hours</p>
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
