import React from 'react';

interface RequestFlightLogProps {
  pilotName: string;
}

const RequestFlightLog: React.FC<RequestFlightLogProps> = ({ pilotName }) => {
  return (
    <div className="flex flex-col items-start space-y-4 bg-gray-700 p-4 rounded-md">
      <h2 className="text-lg font-semibold text-white">Solicitar bitácora de vuelo de {pilotName}</h2>
      <p className="text-white">
        Complete el siguiente formulario para solicitar una copia del documento PDF de la bitácora de vuelo de {pilotName}.
      </p>
      <form className="space-y-2">
        <div className="flex flex-col items-start">
          <label htmlFor="requestName" className="text-white font-semibold mb-1">
            Nombre
          </label>
          <input
            type="text"
            id="requestName"
            placeholder="Ingrese su nombre"
            className="w-72 bg-gray-500 border-gray-400 border rounded-md py-2 px-3 text-white"
          />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="requestEmail" className="text-white font-semibold mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            id="requestEmail"
            placeholder="Ingrese su correo electrónico"
            className="w-72 bg-gray-500 border-gray-400 border rounded-md py-2 px-3 text-white"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600">
          Enviar solicitud
        </button>
      </form>
    </div>
  );
};

export default RequestFlightLog;
