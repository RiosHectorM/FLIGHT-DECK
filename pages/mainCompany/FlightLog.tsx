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
  origin:string
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
        const response = await axios.get(`/api/flight/getMiniLogByUserId?userId=${userId}`);
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
    return <p>Loading flight data...</p>;
  }

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-lg font-semibold">{flightData?.registrationId || flightNumber}</h2>
      <p>{flightData?.flightDate || flightDate} | {flightData?.hourCount || hourCount}</p>
      <p>{flightData?.flightDate || flightDate}</p>
      <p>{flightData?.planeBrandAndModel || planeBrandAndModel}</p>
      <p>{flightData?.pilotFullName || pilotFullName}</p>
    </div>
  );
};

export default FlightLog;
export type { FlightLogProps };
