import { TbPhotoPlus } from 'react-icons/tb';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

declare global {
  var cloudinary: any;
}

const uploadPreset = 'ctpmpppl';

export const FormPhoto = () => {

  // 'esto harcodea una imagen pero se deberia tomar de la base de datos de mongo de la propiedad image de cada usuario..... DEJO PENDIENTE ESTA IMPLEMENTACION PARA VER SI USAMOS ZUSTAND (durante el dia de hoy lo analizo y se los comento)'
  let value =
    'https://res.cloudinary.com/dvm47pxdm/image/upload/v1683276810/ktof9o3m2kowyn9eabgr.jpg';
  const handleUpload = (response: any) => {
    console.log(response.info.secure_url);
    value = response.info.secure_url;
    //este response.info.secure_url es la imagen subida por el usuario es lo q hay q guardar en la BD de mongo en el campo IMAGE
  };

  return (
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
            '
          >
            <TbPhotoPlus size={50} />
            <div className='font-semibold text-lg'>Click to upload</div>
            {value && (
              <div
                className='
              absolute inset-0 w-full h-full'
              >
                <Image
                  fill
                  style={{ objectFit: 'cover' }}
                  src={value}
                  alt='ProfileImage'
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default FormPhoto;
