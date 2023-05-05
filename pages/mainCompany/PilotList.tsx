
import React, { useState, useEffect } from 'react';
import PilotDetails from './PilotDetails';

interface Pilot {
  name: string;
  id: string;
  photoUrl: string;
  location: string;
  hoursOfFlight: number;
  aircraftType: string;
  availability: string;
  bio: string;
  flightLogUrl: string;
  email:string;
}

const PilotList: React.FC = () => {
  const [pilots, setPilots] = useState<Pilot[]>([]);
  const [selectedPilot, setSelectedPilot] = useState<Pilot | null>(null);

  useEffect(() => {
    async function fetchPilots() {
      const response = await fetch('http://localhost:3000/api/pilot');
      const data = await response.json();
      setPilots(data);
    }
    fetchPilots();
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-lg font-semibold text-blue">Lista de pilotos</h2>
      <ul className="divide-y divide-white">
        {pilots.map((pilot) => (
          <li className="flex justify-between py-2" key={pilot.id}>
            <span className="text-red-500 font-semibold">{pilot.name}</span>
            <button
              className="text-blue-500"
              onClick={() => setSelectedPilot(pilot)}
            >
              Ver detalles
            </button>
          </li>
        ))}
      </ul>
      {selectedPilot && <PilotDetails {...selectedPilot} />}
    </div>
  );
};

export default PilotList;
