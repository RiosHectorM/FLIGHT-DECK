import React from 'react';

interface RequestFlightLogProps {
  pilotName: string;
}

const RequestFlightLog: React.FC<RequestFlightLogProps> = ({ pilotName }) => {
  return (
    <div className="flex flex-col items-start space-y-4 bg-gray-700 p-4 rounded-md">
      <h2 className="text-lg font-semibold text-white">Solicitar bitácora de vuelo de {pilotName}</h2>
      <p className="text-white">
        Complete the following form to request a copy of the flight log PDF document of {pilotName}.
      </p>
      <form className="space-y-2">
        <div className="flex flex-col items-start">
          <label htmlFor="requestName" className="text-white font-semibold mb-1">
            Name
          </label>
          <input
            type="text"
            id="requestName"
            placeholder="Enter your name"
            className="w-72 bg-gray-500 border-gray-400 border rounded-md py-2 px-3 text-white"
          />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="requestEmail" className="text-white font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            id="requestEmail"
            placeholder="Enter your email"
            className="w-72 bg-gray-500 border-gray-400 border rounded-md py-2 px-3 text-white"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600">
          Send request
        </button>
      </form>
    </div>
  );
};

export default RequestFlightLog;
