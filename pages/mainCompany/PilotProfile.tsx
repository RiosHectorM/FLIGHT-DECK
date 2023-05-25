import React from 'react';

interface PilotProfileProps {
  name: string;
  photoUrl: string;
  location: string;
  hoursOfFlight: number;
}

const PilotProfile: React.FC<PilotProfileProps> = ({ name, photoUrl, location, hoursOfFlight }) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div
        className="bg-gray-500 rounded-full w-24 h-24 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${photoUrl})` }}
      ></div>
      <h2 className="text-lg font-semibold text-white">{name}</h2>
      <div className="text-white">
        <p>{location}</p>
        <p>Accumulated flight hours: {hoursOfFlight}</p>
      </div>
    </div>
  );
};

export default PilotProfile;
