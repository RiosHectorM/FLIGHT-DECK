import { CldUploadWidget } from 'next-cloudinary';
import axios from 'axios';
import { useEffect, useState } from 'react';

declare global {
  var cloudinary: any;
}

const uploadPreset = 'ctpmpppl';

interface CloudinaryUploadWidgetProps {
  handleUpload: (response: any) => void;
  updateUserImage: (value: string) => void;
  userId: string | undefined;
  imageUrl: string | null;
}

const CloudinaryUploadWidget: React.FC<CloudinaryUploadWidgetProps> = ({
  handleUpload,
  updateUserImage,
  userId,
  imageUrl,
}) => {
  const handleImageUpload = async (response: { info: { secure_url: any } }) => {
    try {
      const imageUrl = response.info.secure_url;
      updateUserImage(imageUrl);
      await axios.put(`/api/user/${userId}`, { image: imageUrl });
    } catch (error) {
      console.error('Error during image upload:', error);
    }
  };

  // Variable local para almacenar la URL de la imagen
  const [localImageUrl, setLocalImageUrl] = useState<string | null>(null);

  useEffect(() => {
    setLocalImageUrl(imageUrl);
  }, [imageUrl]);

  return (
    <div>
      <CldUploadWidget
        onUpload={handleImageUpload}
        uploadPreset={uploadPreset}
        options={{
          maxFiles: 1,
        }}
      >
        {({ open }) => (
          <div
            title='Picture'
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
            rounded-md
            w-full h-full
          '
          >
            {localImageUrl && (
              <div className="rounded-md w-full">
                <img src={localImageUrl} alt="Uploaded" className="object-cover w-full h-full" />
              </div>
            )}
            {!localImageUrl && <span className="text-neutral-600 text-center">Add image or pdf file</span>}
          </div>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default CloudinaryUploadWidget;
