import React from 'react';
import PilotProfile from './PilotProfile';
import ContactPilot from './ContactPilot';
import FlightLog from './FlightLog';
import { useSession } from 'next-auth/react';

interface PilotDetailsProps {
  name: string;
  photoUrl: string;
  location: string;
  hoursOfFlight: number;
  aircraftType: string;
  availability: string;
  bio: string;
  flightLogUrl: string;
  email: string;
  id: string;
}

const PilotDetails: React.FC<PilotDetailsProps> = ({
  name,
  photoUrl,
  location,
  hoursOfFlight,
  flightLogUrl,
  email,
  id,
}) => {
  const [showContact, setShowContact] = React.useState(false);
  const [showFlightLog, setShowFlightLog] = React.useState(false);

  const handleContactClick = () => {
    setShowContact(true);
    setShowFlightLog(false);
  };

  const handleFlightLogClick = () => {
    setShowFlightLog(true);
    setShowContact(false);
  };

  const { data } = useSession();
  const userData = data?.user;

  return (
    <div className='flex flex-col items-center bg-flightdeck-dark bg-opacity-70 p-4 rounded-md'>
      <PilotProfile
        name={name}
        photoUrl={photoUrl}
        location={location}
        hoursOfFlight={hoursOfFlight}
      />
      <div className='space-x-2 mt-4'>
        <button
          onClick={handleContactClick}
          className='bg-flightdeck-darkgold text-white rounded-md py-2 px-4 hover:bg-flightdeck-lightgold'
        >
          Contact {name}
        </button>
        <button
          onClick={handleFlightLogClick}
          className='bg-flightdeck-darkgold text-white rounded-md py-2 px-4 hover:bg-flightdeck-lightgold'
        >
          See flight log of {name}
        </button>
      </div>
      {showContact && userData?.name && (
        <ContactPilot name={userData?.name} pilotName={name} email={email} />
      )}
      {showFlightLog && (
        <FlightLog
          pilotName={name}
          flightNumber='AC1234'
          date='2023-05-01'
          duration='2 horas 30 minutos'
          origin='Toronto, Canada'
          destination='London, UK'
          aircraft='Boeing 777'
          flightLogUrl={flightLogUrl}
          hourCount={''}
          flightDate={''}
          planeBrandAndModel={''}
          pilotFullName={''}
          userId={id}
        />
      )}
    </div>
  );
};

export default PilotDetails;
