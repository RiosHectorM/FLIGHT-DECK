'use client';

import Image from 'next/image';

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      className='rounded-full w-7 h-7'
      layout='fixed'
      height={40}
      width={40}
      alt='Avatar'
      src={src || '/images/avatar.jpg'}
    />
  );
};

export default Avatar;
