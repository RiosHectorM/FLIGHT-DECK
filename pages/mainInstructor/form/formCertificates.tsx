import { useEffect, useState } from 'react';
import Certif from '../certificates/Certif';
import axios from 'axios';
import { CertificationType } from '@/types/globalTypes';
import useCertificatesModal from '@/utils/hooks/useCertificatesModal';
import ModalCertif from '../certificates/ModalCertif';

interface Props {
  setShowInfo: (show: boolean) => void;
  setShowCertificates: (show: boolean) => void;
  userId: string;
}

const FormCertificates = ({
  setShowInfo,
  setShowCertificates,
  userId,
}: Props) => {
  const addCertificateModal = useCertificatesModal();

  let [allCertificates, setAllCertificates] = useState<CertificationType[]>([]);

  const handleCancel = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setShowInfo(true);
    setShowCertificates(false);
  };

  async function getCertificates() {
    try {
      if (userId !== undefined) {
        const response = await axios.get(`/api/certificate?userId=${userId}`);
        const data = response.data;
        setAllCertificates(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCertificates();
  }, [userId, setAllCertificates.length]);

  return (
    <div className='flex flex-col w-full justify-center items-center'>
      <ModalCertif userId={userId} setAllCertificates={setAllCertificates} />
      <div className='border border-gray-300 bg-white  rounded-lg shadow-lg p-6 flex flex-col justify-center w-full'>
        {allCertificates.length > 0 ? (
          <div className=' gap-4'>
            {allCertificates.map((cert, index) => (
              <Certif
                cert={cert}
                key={index}
                userId={userId}
                getCertificates={getCertificates}
              />
            ))}
          </div>
        ) : (
          <div className='bg-gray-200 rounded-xl shadow-md mb-2'>
            <div className='px-2 py-2 sm:p-4'>
              <div className='flex lg:flex-row flex-col flex-1 justify-between'>
                <div className='flex flex-col w-full'>
                  <div className='text-xl font-bold text-black truncate '>
                    <p>You still do not have Certificates uploaded</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='flex justify-around w-full mt-4'>
        <button
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded'
          onClick={() => addCertificateModal.onOpen()}
        >
          ADD CERTIFICATE
        </button>
        <button
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded'
          onClick={handleCancel}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default FormCertificates;
