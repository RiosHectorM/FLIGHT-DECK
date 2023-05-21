import { TbPhotoPlus } from 'react-icons/tb';
import { CldUploadWidget } from 'next-cloudinary';

import DatePicker from 'react-datepicker';
//import 'react-datepicker/dist/react-datepicker.css';

import Image from 'next/image';

import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import Loader from '@/pages/components/Loader';
import { CertificationType } from '@/types/globalTypes';

declare global {
  var cloudinary: any;
}

interface PropsPhoto {
  userId: string;
  name?: string | null;
  descrip?: string | null;
  expiration?: string | null;
  image?: string | null;
  onClose: () => void;
  setAllCertificates: React.Dispatch<React.SetStateAction<CertificationType[]>>;
}

const uploadPreset = 'ctpmpppl';

export const CertificatePhoto = ({
  userId,
  name,
  descrip,
  image,
  expiration,
  onClose,
  setAllCertificates,
}: PropsPhoto) => {
  const [isLoading, setIsLoading] = useState(false);
  const [nameCertificate, setNameCertificate] = useState(name || null);
  const [description, setDescription] = useState(descrip || null);
  const [valueImage, setValueImage] = useState(image || null);
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);

  const handleUpload = (response: any) => {
    setValueImage(response.info.secure_url);
  };

  const handlerNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNameCertificate(event.target.value);
  };
  const handlerDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handlerClickSave = async () => {
    if (
      valueImage == null ||
      expirationDate == undefined ||
      nameCertificate == ''
    ) {
      toast.error('Incomplete Fields');
      return;
    }
    console.log(nameCertificate);
    console.log(valueImage);
    console.log(expirationDate?.toISOString());
    setIsLoading(true);
    await axios
      .post(`/api/certificate`, {
        userId: userId,
        certificateName: nameCertificate,
        certificateDescription: description,
        certificateExpirationDate: expirationDate?.toISOString(),
        certificateImageUrl: valueImage,
      })
      .then((response) => {
        const newCertificate: CertificationType = response.data;
        toast.success('Certificate Saved Successfully');
        setAllCertificates((prevCertificates) => [
          newCertificate,
          ...prevCertificates,
        ]);
        onClose();
      })
      .finally(() => setIsLoading(false));
  };

  const handlerClickCancel = () => {
    console.log('cancel');
    onClose();
  };

  return (
    <div className='flex flex-col items-center'>
      {isLoading && <Loader />}
      <div className='flex flex-col items-center'>
        <h2 className='font-semibold text-lg mb-2'>Certificate Name</h2>
        <input
          type='text'
          className='text-gray-500 border-2 border-blue-500 rounded-md p-2 shadow-md mb-4'
          value={nameCertificate as string}
          onChange={handlerNameChange}
        />
      </div>
      <div className='flex flex-col items-center'>
        <h2 className='font-semibold text-lg mb-2'>Certificate Picture</h2>
        <CldUploadWidget
          onUpload={handleUpload}
          uploadPreset={uploadPreset}
          options={{
            maxFiles: 1,
          }}
        >
          {({ open }) => {
            return (
              <div
                title='Certificate Picture'
                onClick={() => open?.()}
                className='
                  relative
                  cursor-pointer
                  hover:opacity-70
                  transition
                  border-dashed 
                  border-2 
                  p-20 
                  border-neutral-300
                  flex
                  flex-col
                  justify-center
                  items-center
                  gap-4
                  text-neutral-600
                  rounded-md   /* para hacer la imagen circular */
                  w-full h-full      /* para establecer un tamaño fijo */
                '
              >
                <TbPhotoPlus size={20} />
                <div className='font-semibold text-lg text-center'>
                  Click to upload
                </div>
                {valueImage ? (
                  <div
                    className='
                      absolute inset-0 w-full h-full rounded-md
                      overflow-hidden  /* para ocultar cualquier parte de la imagen que sobresalga del borde circular */
                    '
                  >
                    <Image
                      fill
                      style={{ objectFit: 'cover' }}
                      src={valueImage}
                      alt='CertificateImage'
                    />
                  </div>
                ) : (
                  <div
                    className='
                      absolute inset-0 w-150 h-150 rounded-full
                      overflow-hidden  /* para ocultar cualquier parte de la imagen que sobresalga del borde circular */
                    '
                  >
                    <Image
                      fill
                      style={{ objectFit: 'cover' }}
                      src={valueImage ? valueImage.toString() : ''}
                      alt='Certificate Image'
                    />
                  </div>
                )}
              </div>
            );
          }}
        </CldUploadWidget>
      </div>
      <div className='flex flex-col items-center'>
        <h2 className='font-semibold text-lg mb-2'>Certificate Description</h2>
        <input
          type='text'
          className='text-gray-500 border-2 border-blue-500 rounded-md p-2 shadow-md mb-4'
          value={description as string}
          onChange={handlerDescriptionChange}
        />
      </div>
      <div className='flex flex-col items-center'>
        <h2 className='font-semibold text-lg mb-2'>
          Certificate Expiration Date
        </h2>
        <DatePicker
          selected={expirationDate}
          onChange={(date) => setExpirationDate(date)}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode='select'
          className='text-gray-500 border-2 border-blue-500 rounded-md p-2 shadow-md mb-4'
          placeholderText='Enter Date'
        />

        <div className='flex justify-around w-full'>
          <button
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded'
            onClick={handlerClickSave}
          >
            Save
          </button>
          <button
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded'
            onClick={handlerClickCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificatePhoto;
