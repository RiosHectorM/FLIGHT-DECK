import React from 'react';
import Stars from './Stars';

interface PilotProfileProps {
  name: string | undefined;
  photoUrl: string | undefined;
  qualification: number | undefined;
}

const PilotProfile: React.FC<PilotProfileProps> = ({
  name,
  photoUrl,
  qualification,
}) => {
  return (
    <div className='flex flex-col items-center space-y-2'>
      <div className='flex justify-center text-center'>
        <div
          className='bg-gray-500 rounded-full w-16 h-16 bg-center bg-no-repeat bg-cover'
          style={{ backgroundImage: `url(${photoUrl})` }}
        ></div>
        <div>
          <h2 className='my-auto ml-2 text-lg font-semibold text-white'>
            {name}
          </h2>
          <Stars qualify={qualification as number} />
        </div>
      </div>
    </div>
  );
};

export default PilotProfile;
