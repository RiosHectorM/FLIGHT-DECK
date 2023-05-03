import React from 'react';

const PilotList: React.FC = () => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-lg font-semibold text-white">Lista de pilotos</h2>
      <ul className="divide-y divide-white">
        <li className="flex justify-between py-2">
          <span className="text-black">John Doe</span>
          <button className="text-blue-500">Ver detalles</button>
        </li>
        <li className="flex justify-between py-2">
          <span className="text-black">Jane Smith</span>
          <button className="text-blue-500">Ver detalles</button>
        </li>
        <li className="flex justify-between py-2">
          <span className="text-black">Bob Johnson</span>
          <button className="text-blue-500">Ver detalles</button>
        </li>
      </ul>
    </div>
  );
};

export default PilotList;
