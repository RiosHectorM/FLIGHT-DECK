import React, { Dispatch, SetStateAction, useState } from 'react';
import { FaCalendarAlt, FaEdit } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import { TbLicense } from 'react-icons/tb';
import { CertificationType } from '@/types/globalTypes';
import {
  AiFillCloseCircle,
  AiFillEdit,
  AiFillEye,
  AiOutlineCloseCircle,
} from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Loader from '@/pages/components/Loader';
import useCertificatesModal from '@/utils/hooks/useCertificatesModal';

interface Props {
  cert: CertificationType;
  userId: string;
  setImage: Dispatch<SetStateAction<string>>;
  setName: Dispatch<SetStateAction<string>>;
  setExpiration: Dispatch<SetStateAction<string>>;
  setDescrip: Dispatch<SetStateAction<string>>;
  getCertificates: () => void;
}

const Certif = ({
  cert,
  userId,
  getCertificates,
  setImage,
  setName,
  setExpiration,
  setDescrip,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showImageCertif, setShowImageCertif] = useState(false);
  const [certifySelected, setCertifySelected] = useState('');

  const handlerImageShow = (imageSelected: string) => {
    setShowImageCertif(true);
    setCertifySelected(imageSelected);
  };

  const handlerEditCert = (
    image: string,
    name: string,
    expiration: string,
    descrip: string
  ) => {
    setImage(image);
    setName(name);
    setExpiration(expiration);
    setDescrip(descrip);
    addCertificateModal.onOpen();
  };

  const handlerDelete = async (name: string) => {
    setIsLoading(true);
    await axios
      .delete(`/api/certificate?userId=${userId}&certificateName=${name}`)
      .then(() => {
        getCertificates();
        toast.success('Certificate Deleted Successfully');
      })
      .finally(() => setIsLoading(false));
  };

  const addCertificateModal = useCertificatesModal();

  return (
    <>
      {isLoading && <Loader />}
      <div className='bg-flightdeck-lightgold rounded-xl shadow-md mb-2'>
        <div className='px-2 py-1 sm:p-4'>
          <div className='flex lg:flex-row flex-col flex-1 justify-between'>
            <div className='flex flex-col w-full justify-between'>
              <div className='text-xl font-bold my-2 py-2 text-black truncate'>
                {cert?.certificateName}
              </div>
              {cert?.certificateExpirationDate && (
                <div className='flex my-auto mb-2'>
                  <FaCalendarAlt className='text-black w-6 h-6' />
                  <span className='ml-2 font-semibold'>
                    Expiration Date:{' '}
                    {cert?.certificateExpirationDate.split('T')[0]}
                  </span>
                </div>
              )}
              {cert?.certificateDescription && (
                <div className='flex my-auto'>
                  <TbLicense className='text-black w-6 h-6' />
                  <span className='ml-2 font-semibold'>
                    {cert?.certificateDescription}
                  </span>
                </div>
              )}
            </div>
            <div className='flex flex-row lg:flex-col justify-around w-full lg:w-auto mx-auto'>
              <div
                className='flex justify-center align-middle items-center cursor-pointer md:hover:scale-125 hover:text-green-600'
                onClick={() => handlerImageShow(cert?.certificateImageUrl)}
              >
                <AiFillEye title='View' className='w-5 h-5 my-2 ' />
                <p className='ml-4 block lg:hidden'>View Certify</p>
              </div>
              <div
                className='flex justify-center align-middle items-center cursor-pointer md:hover:scale-125 hover:text-red-600'
                onClick={() => handlerDelete(cert?.certificateName)}
              >
                <AiFillCloseCircle title='Delete' className='w-5 h-5 my-2 ' />
                <p className='ml-4 block lg:hidden'>Delete Certify</p>
              </div>
            </div>
          </div>
        </div>
        {showImageCertif && (
          <div className='fixed inset-0 flex items-center justify-center w-11/12 lg:w-4/5 h-4/5 mx-auto my-auto'>
            <div className='w-auto h-full bg-white shadow-lg rounded-lg p-4'>
              <img
                src={certifySelected}
                alt='Imagen Certify Selected'
                className='w-full h-full object-cover'
              />
              <button
                className='absolute top-0 z-10'
                onClick={() => {
                  setShowImageCertif(false);
                  setCertifySelected('');
                }}
              >
                <AiOutlineCloseCircle
                  title='Close'
                  className='w-20 h-20 my-2 z-20 bg-red-500 hover:bg-red-700 text-white font-bold rounded-full'
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Certif;
