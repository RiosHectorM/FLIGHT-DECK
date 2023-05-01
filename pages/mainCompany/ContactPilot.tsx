import React from 'react';

interface ContactPilotProps {
  name: string;
  pilotName: string;
  email: string;
}

const ContactPilot: React.FC<ContactPilotProps> = ({ pilotName }) => {
  return (
    <div className="flex flex-col items-start space-y-4 bg-gray-700 p-4 rounded-md">
      <h2 className="text-lg font-semibold text-white mb-2">Contactar a {pilotName}</h2>
      <p className="text-white mb-2">
        Póngase en contacto con {pilotName} para concertar una entrevista o coordinar un vuelo de prueba.
      </p>
      <form className="space-y-2">
        <div className="flex flex-col items-start">
          <label htmlFor="contactName" className="text-white font-semibold mb-1">
            Nombre
          </label>
          <input
            type="text"
            id="contactName"
            placeholder="Ingrese su nombre"
            className="w-72 bg-gray-500 border-gray-400 border rounded-md py-2 px-3 text-white"
          />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="contactEmail" className="text-white font-semibold mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            id="contactEmail"
            placeholder="Ingrese su correo electrónico"
            className="w-72 bg-gray-500 border-gray-400 border rounded-md py-2 px-3 text-white"
          />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="contactMessage" className="text-white font-semibold mb-1">
            Mensaje
          </label>
          <textarea
            id="contactMessage"
            placeholder="Ingrese su mensaje"
            className="w-72 h-32 bg-gray-500 border-gray-400 border rounded-md py-2 px-3 text-white"
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600">
          Enviar mensaje
        </button>
      </form>
    </div>
  );
};

export default ContactPilot;
