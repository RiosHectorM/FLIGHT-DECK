import Image from 'next/image';
import { useState } from 'react';

export const FormPhoto = (props: { className: string }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>('/images/Pilo.jpeg');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(fileList[0]);
      reader.onloadend = () => {
        setSelectedFile(fileList[0]);
        setImageUrl(reader.result as string);
      };
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFile) {
      // Handle file upload here
    }
  };

  return (
    <div className='max-w-full lg:max-w-full lg:flex w-full'>
      <div className='border-r border-b border-l border-t border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-full'>
        <div className='mb-8'>
          <div className='text-gray-900 font-bold text-xl mb-6'>
            Editar Foto de Perfil
          </div>
          <form className='w-full max-w-lg' onSubmit={handleSubmit}>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='profilePicture'
                >
                  Foto de Perfil
                </label>
                <label htmlFor='profilePicture' className='cursor-pointer'>
                  <span className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
                    Subir Foto
                  </span>
                  <input
                    type='file'
                    className='hidden'
                    id='profilePicture'
                    onChange={handleFileSelect}
                  />
                </label>
              </div>
            </div>
            <div className='w-full px-3 flex justify-center items-center mt-12'>
              <div className='flex space-x-4'>
                <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
        <Image
          src={imageUrl ?? '/images/Pilo.jpeg'}
          alt='Foto de Perfil'
          width={200}
          height={300}
          className='rounded-t lg:rounded-t-none lg:rounded-l'
        />
      </div>
    </div>
  );
};
