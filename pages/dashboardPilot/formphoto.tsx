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
                w-80 h-80      /* para establecer un tamaño fijo */
              '
            >
              <TbPhotoPlus size={50} />
              <div className='font-semibold text-lg text-center'>Click to upload</div>
              {value && (
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
              )}
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};  

export default FormPhoto;
