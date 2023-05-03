import React, { useState, useEffect } from 'react';

interface Pilot {
  name: string;
  id: string;
}

const PilotList: React.FC = () => {
  const [pilots, setPilots] = useState<Pilot[]>([]);

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
      <h2 className="text-lg font-semibold text-white">Lista de pilotos</h2>
      <ul className="divide-y divide-white">
        {pilots.map((pilot) => (
          <li className="flex justify-between py-2" key={pilot.id}>
            <span className="text-black">{pilot.name}</span>
            <button className="text-blue-500">Ver detalles</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PilotList;
