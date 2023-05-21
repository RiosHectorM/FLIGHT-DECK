import React, { useState } from 'react';
import { FaCalendarAlt, FaEdit } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import { TbLicense } from 'react-icons/tb';
import { CertificationType } from '@/types/globalTypes';
import { AiFillCloseCircle, AiFillEdit, AiFillEye } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Loader from '@/pages/components/Loader';

interface Props {
  cert: CertificationType;
  userId: string;
  getCertificates: () => void;
}

const Certif = ({ cert, userId, getCertificates }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const handlerDelete = async (name: string) => {
    console.log(userId);
    console.log(name);
    setIsLoading(true);
    await axios
      .delete(`/api/certificate?userId=${userId}&certificateName=${name}`)
      .then(() => {
        getCertificates();
        toast.success('Certificate Deleted Successfully');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className='bg-gray-200 rounded-xl shadow-md mb-2'>
        <div className='px-2 py-2 sm:p-4'>
          <div className='flex lg:flex-row flex-col flex-1 justify-between'>
            <div className='flex flex-col w-full'>
              <div className='text-xl font-bold text-black truncate '>
                {cert.certificateName}
              </div>
              {cert.certificateExpirationDate && (
                <div className='flex'>
                  <FaCalendarAlt className='text-indigo-500 w-6 h-6' />
                  <span className='ml-2'>
                    Expiration Date:{' '}
                    {cert.certificateExpirationDate.split('T')[0]}
                  </span>
                </div>
              )}
              {cert.certificateDescription && (
                <div className='flex'>
                  <TbLicense className='text-indigo-500 w-6 h-6' />
                  <span className='ml-2'>{cert.certificateDescription}</span>
                </div>
              )}
            </div>
            <div className='flex flex-row lg:flex-col justify-around w-full lg:w-auto mx-auto'>
              <div className='flex justify-center align-middle items-center cursor-pointer hover:scale-125 hover:text-green-600'>
                <AiFillEye
                  title='View'
                  className='w-5 h-5 my-2 '
                  onClick={() => {}}
                />
                <p className='ml-4 block lg:hidden'>View Certify</p>
              </div>
              <div className='flex justify-center align-middle items-center cursor-pointer hover:scale-125 hover:text-green-600'>
                <AiFillEdit
                  title='Edit'
                  className='w-5 h-5 my-2 '
                  onClick={() => {}}
                />
                <p className='ml-4 block lg:hidden'>Edit Certify</p>
              </div>
              <div className='flex justify-center align-middle items-center cursor-pointer hover:scale-125 hover:text-red-600'>
                <AiFillCloseCircle
                  title='Delete'
                  className='w-5 h-5 my-2 '
                  onClick={() => handlerDelete(cert.certificateName)}
                />
                <p className='ml-4 block lg:hidden'>Delete Certify</p>
              </div>
            </div>

            {/* <div>
                <div className='text-lg font-small text-gray-900 flex items-center'>
                  {expirationDate ? (
                    <>
                      {expirationDate.toLocaleDateString()}
                      <button
                        className='ml-2 focus:outline-none'
                        onClick={() => setModalIsOpen(true)}
                      >
                        <FaEdit className='text-indigo-500 w-6 h-6' />
                      </button>
                    </>
                  ) : (
                    <button
                      className='flex items-center focus:outline-none'
                      onClick={() => setModalIsOpen(true)}
                    >
                      <FaCalendarAlt className='text-indigo-500 w-6 h-6' />
                      <span className='ml-2'>Add License</span>
                    </button>
                  )}
                </div>
              </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Certif;
