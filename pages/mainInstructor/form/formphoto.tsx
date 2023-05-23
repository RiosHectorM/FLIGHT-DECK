import { TbPhotoPlus } from 'react-icons/tb';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

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
    const { secure_url } = response.info;
    console.log(secure_url);
    console.log(`/api/user/${user?.id}`);

    // Validar el tipo de archivo en el backend
    const fileExtension = secure_url.split('.').pop()?.toLowerCase();
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    if (!allowedExtensions.includes(fileExtension)) {
      toast.error('The selected file is not a valid image.');
      return;
    }


    value = secure_url;
    updateUserImage(value?.toString() ?? '');
    await axios.put(`/api/user/${user?.id}`, { image: value?.toString() });
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className='flex flex-col items-center h-full w-full'>
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
              onClick={() => open && open()}
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
                rounded-full
                w-full 
                h-full
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
                    overflow-hidden
                  '
                >
                  <Image
                    fill
                    sizes="(max-width: 640px) 100vw, 640px"
                    style={{ objectFit: 'cover' }}
                    src={value}
                    alt='ProfileImage'
                  />
                </div>
              ) : (
                <div
                  className='
                    absolute inset-0 w-full h-full rounded-full
                    overflow-hidden
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
