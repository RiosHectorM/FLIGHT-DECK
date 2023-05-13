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
  email: string;
}

const PilotList: React.FC = () => {
  const [pilots, setPilots] = useState<Pilot[]>([]);
  const [selectedPilot, setSelectedPilot] = useState<Pilot | null>(null);
  const [expandedPilots, setExpandedPilots] = useState<string[]>([]);

  useEffect(() => {
    async function fetchPilots() {
      const response = await fetch('/api/pilot');
      const data = await response.json();
      setPilots(data);
    }
    fetchPilots();
  }, []);

  return (
    <div className='mx-auto w-3/4 bg-white bg-opacity-70 rounded-lg shadow-lg p-6 '>
      <h2 className='text-center font-bold mb-10 uppercase'>
        Lista de pilotos
      </h2>
      <table className='table-auto w-full'>
        <thead>
          <tr className='text-left'>
            <th className='px-4 py-2 font-medium'>Nombre</th>
            <th className='px-4 py-2 font-medium'>Ubicación</th>
            <th className='px-4 py-2 font-medium'>Horas de vuelo</th>
            <th className='px-4 py-2 font-medium'>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {pilots.map((pilot) => (
            <React.Fragment key={pilot.id}>
              <tr>
                <td className='border px-4 py-2'>{pilot.name}</td>
                <td className='border px-4 py-2'>{pilot.location}</td>
                <td className='border px-4 py-2'>{pilot.hoursOfFlight}</td>
                <td className='border px-4 py-2'>
                  <button
                    className='text-blue-500'
                    onClick={() => {
                      if (expandedPilots.includes(pilot.id)) {
                        setExpandedPilots(
                          expandedPilots.filter((id) => id !== pilot.id)
                        );
                      } else {
                        setExpandedPilots([...expandedPilots, pilot.id]);
                      }
                    }}
                  >
                    {expandedPilots.includes(pilot.id)
                      ? 'Cerrar detalles'
                      : 'Ver detalles'}
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
