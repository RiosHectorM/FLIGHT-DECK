import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface FlightLogProps {
  flightNumber: string;
  pilotName: string;
  date: string;
  hourCount: string;
  duration: string;
  flightDate: string;
  planeBrandAndModel: string;
  pilotFullName: string;
  origin: string;
  userId: string;
  destination: string;
  aircraft: string;
  flightLogUrl: string;
}

const FlightLog: React.FC<FlightLogProps> = ({
  flightNumber,
  date,
  hourCount,
  origin,
  flightDate,
  planeBrandAndModel,
  pilotFullName,
  userId,
}) => {
  const [flightData, setFlightData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const response = await axios.get(
          `/api/flight/getMiniLogByUserId?id=${userId}`
        );
        const data = response.data;
        setFlightData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchFlightData();
  }, [pilotFullName]);

  if (loading) {
    return (
      <div className='bg-flightdeck-lightgold mt-4 p-8'>Loading flight data...</div>
    );
  }

  return (
    <div className='bg-white p-4 rounded-md shadow-md w-full lg:w-2/3 mt-4'>
      <h2 className='text-lg font-extrabold w-full text-center'>
        {flightData?.pilotFullName || pilotFullName}
      </h2>
      <h2 className='text-lg font-bold mt-2'>Last Flight:</h2>
      <p className='font-semibold flex w-full justify-between'>
        Class Airplain:{' '}
        <p className='italic'>
          {flightData?.planeBrandAndModel || planeBrandAndModel}
        </p>
      </p>
      <p className='font-semibold flex w-full justify-between'>
        Airplain ID:
        <p className='italic'>{flightData?.registrationId || flightNumber} </p>
      </p>

      <p className='font-semibold flex w-full justify-between'>
        Date Last Fligth:
        <p className='italic'>
          {flightData?.flightDate.split('T')[0] || flightDate}
        </p>
      </p>
      <p className='font-semibold flex w-full justify-between'>
        Duration:{' '}
        <p className='italic'>{flightData?.hourCount || hourCount} </p>
      </p>
    </div>
  );
};

export default FlightLog;
export type { FlightLogProps };
