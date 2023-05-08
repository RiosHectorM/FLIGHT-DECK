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
  const [expandedPilots, setExpandedPilots] = useState<string[]>([]);

  useEffect(() => {
    async function fetchPilots() {
      const response = await fetch('http://localhost:3000/api/pilot');
      const data = await response.json();
      setPilots(data);
    }
    fetchPilots();
  }, []);

  return (
    <div className="flex flex-col items-center space-y-5 mt-5">
      <h2 className="text-lg font-semibold text-blue">Lista de pilotos</h2>
      <table className="border-collapse border-blue-500 border">
        <thead>
          <tr>
            <th className="p-2 border-blue-500 border text-white">Nombre</th>
            <th className="p-2 border-blue-500 border text-white">Ubicación</th>
            <th className="p-2 border-blue-500 border text-white">Horas de vuelo</th>
            <th className="p-2 border-blue-500 border text-white">Detalles</th>
          </tr>
        </thead>
        <tbody>
          {pilots.map((pilot) => (
            <React.Fragment key={pilot.id}>
              <tr>
                <td className="p-2 border-blue-500 border text-white">{pilot.name}</td>
                <td className="p-2 border-blue-500 border text-white">{pilot.location}</td>
                <td className="p-2 border-blue-500 border text-white">{pilot.hoursOfFlight}</td>
                <td className="p-2 border-blue-500 border text-white">
                  <button
                    className="text-blue-500 text-white"
                    onClick={() => {
                      if (expandedPilots.includes(pilot.id)) {
                        setExpandedPilots(expandedPilots.filter(id => id !== pilot.id));
                      } else {
                        setExpandedPilots([...expandedPilots, pilot.id]);
                      }
                    }}
                  >
                    {expandedPilots.includes(pilot.id) ? 'Cerrar detalles' : 'Ver detalles'}
                  </button>
                </td>
              </tr>
              {expandedPilots.includes(pilot.id) && (
                <tr>
                  <td colSpan={4}>
                    <PilotDetails {...pilot} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {selectedPilot && <PilotDetails {...selectedPilot} />}
    </div>
  );
};

export default PilotList;
