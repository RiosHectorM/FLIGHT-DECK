import { useEffect, useState } from 'react';
import Certif from '../certificates/Certif';
import axios from 'axios';
import { CertificationType } from '@/types/globalTypes';
import useCertificatesModal from '@/utils/hooks/useCertificatesModal';
import ModalCertif from '../certificates/ModalCertif';
import Loader from '@/pages/components/Loader';

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
  let [image, setImage] = useState<string | null>(null);
  let [name, setName] = useState<string | null>(null);
  let [expiration, setExpiration] = useState<string | null>(null);
  let [descrip, setDescrip] = useState<string | null>(null);

  const handleCancel = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setShowInfo(true);
    setShowCertificates(false);
  };
  const handleADD = () => {
    setImage(null);
    setName(null);
    setExpiration(Date().toString());
    setDescrip(null);
    addCertificateModal.onOpen();
  };

  const [isLoading, setIsLoading] = useState(false);

  async function getCertificates() {
    try {
      setIsLoading(true);
      if (userId !== undefined) {
        const response = await axios.get(`/api/certificate?userId=${userId}`);
        const data = response.data;
        setAllCertificates(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCertificates();
  }, [userId, setAllCertificates.length]);

  return (
    <div className='flex flex-col w-full justify-center items-center'>
      <ModalCertif
        userId={userId}
        setAllCertificates={setAllCertificates}
        image={image}
        name={name}
        expiration={expiration}
        descrip={descrip}
      />
      {isLoading && <Loader />}
      <div className='border border-gray-300 bg-white  rounded-lg shadow-lg p-6 flex flex-col justify-center w-full'>
        {allCertificates.length > 0 ? (
          <div className=' gap-4'>
            {allCertificates.map((cert, index) => (
              <Certif
                cert={cert}
                key={index}
                userId={userId}
                getCertificates={getCertificates}
                setImage={(value) => setImage(value as string)}
                setName={(value) => setName(value as string)}
                setExpiration={(value) => setExpiration(value as string)}
                setDescrip={(value) => setDescrip(value as string)}
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
          className='font-sans bg-flightdeck-black text-flightdeck-lightgold my-4 rounded-md py-2 hover:bg-flightdeck-darkgold hover:text-black px-8'
          onClick={handleADD}
        >
          ADD CERTIFICATE
        </button>
        <button
          className='font-sans bg-flightdeck-black text-flightdeck-lightgold my-4 rounded-md py-2 hover:bg-flightdeck-darkgold hover:text-black px-8'
          onClick={handleCancel}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default FormCertificates;
