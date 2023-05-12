import React, { useState } from 'react';
import { sendContactForm } from '@/lib/api';

interface ContactPilotProps {
  name: string;
  pilotName: string;
  email: string;
}

const ContactPilot: React.FC<ContactPilotProps> = ({
  name,
  pilotName,
  email,
}) => {
  let [message, setMessage] = useState('');

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };

  const values = {
    name: 'Flight Deck App',
    email: email,
    subject: `${name} wants to contact you`,
    message: `${name} quiere ponerse en contacto con vos`,
    html: `<div style="background-color: #f7f7f7; padding: 20px; text-align: center;"><h1 style="color: #333333; font-size: 28px;">¡${name} te esta buscando!</h1><img src="https://res.cloudinary.com/dvm47pxdm/image/upload/v1683420911/yq7qmpvsenhmxgrtjpyd.png" alt="ImagenFlightDeck" style="width: 300px; margin-bottom: 20px;"><p style="color: #666666; font-size: 18px;">${message}</p></div>`,
  };

  const handlerSend = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    sendContactForm(values);
    setMessage('');
    alert('Mail Enviado');
  };

  return (
    <div className='flex flex-col items-start space-y-4 bg-gray-700 p-4 rounded-md'>
      <h2 className='text-lg font-semibold text-white mb-2'>
        Contactar a {pilotName}
      </h2>
      <p className='text-white mb-2'>
        Póngase en contacto con {pilotName} para concertar una entrevista o
        coordinar un vuelo de prueba.
      </p>
      <form className='space-y-2 w-full'>
        <div className='flex flex-col items-start'>
          <label
            htmlFor='contactName'
            className='text-white font-semibold mb-1'
          >
            Nombre
          </label>
          <input
            type='text'
            id='contactName'
            value={pilotName}
            className='w-full bg-gray-500 border-gray-400 border rounded-md py-2 px-3 text-white'
          />
        </div>
        <div className='flex flex-col items-start'>
          <label
            htmlFor='contactEmail'
            className='text-white font-semibold mb-1'
          >
            Correo electrónico
          </label>
          <input
            type='email'
            id='contactEmail'
            value={email}
            className='w-full bg-gray-500 border-gray-400 border rounded-md py-2 px-3 text-white'
          />
        </div>
        <div className='flex flex-col items-start'>
          <label
            htmlFor='contactMessage'
            className='text-white font-semibold mb-1'
          >
            Mensaje
          </label>
          <textarea
            id='contactMessage'
            placeholder='Ingrese su mensaje'
            value={message}
            onChange={handleMessageChange}
            className='w-full h-32 bg-gray-500 border-gray-400 border rounded-md py-2 px-3 text-white'
          ></textarea>
        </div>
        <button
          onClick={handlerSend}
          className='bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600'
        >
          Enviar mensaje
        </button>
      </form>
    </div>
  );
};

export default ContactPilot;
