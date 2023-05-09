import { TbPhotoPlus } from 'react-icons/tb';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

import axios from 'axios';
import { useUserStore } from '@/store/userStore';

declare global {
  var cloudinary: any;
}

const uploadPreset = 'ctpmpppl';

export const FormPhoto = () => {
  const { user, updateUserImage } = useUserStore();

  console.log('user', user);

  let value: string | null = user?.image || null;
  const handleUpload = async (response: any) => {
    console.log(response.info.secure_url);
    console.log(`/api/user/${user?.id}`);
    value = response.info.secure_url;
    updateUserImage(value?.toString() ?? '');
    await axios.put(`/api/user/${user?.id}`, { image: value?.toString() });
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className='flex flex-col items-center'>
      <h2 className='font-semibold text-lg mb-2'>Profile Picture</h2>
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
              title='Profile Picture'
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
                rounded-full   /* para hacer la imagen circular */
                w-full h-full      /* para establecer un tamaño fijo */
              '
            >
              <TbPhotoPlus size={20} />
              <div className='font-semibold text-lg text-center'>
                Click to upload
              </div>
              {value ? (
                <div
                  className='
                    absolute inset-0 w-full h-full rounded-full
                    overflow-hidden  /* para ocultar cualquier parte de la imagen que sobresalga del borde circular */
                  '
                >
                  <Image
                    fill
                    style={{ objectFit: 'cover' }}
                    src={value}
                    alt='ProfileImage'
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
                    src={value ? value.toString() : ''}
                    alt='ProfileImage'
                  />
                </div>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default FormPhoto;
