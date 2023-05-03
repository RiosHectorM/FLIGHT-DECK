import React from 'react';

interface FlightLogProps {
  flightNumber: string;
  date: string;
  duration: string;
  origin: string;
  destination: string;
  aircraft: string;
  flightLogUrl: string;
  pilotName: string;
}

const FlightLog: React.FC<FlightLogProps> = ({ flightNumber, date, duration, origin, destination, aircraft, pilotName }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-lg font-semibold">{flightNumber}</h2>
      <p>{date} | {duration}</p>
      <p>{origin} - {destination}</p>
      <p>{aircraft}</p>
      <p>Piloto: {pilotName}</p>
    </div>
  );
};

export default FlightLog;
export type { FlightLogProps };
