import React, { useState } from 'react';
import { sendContactForm } from '@/lib/api';
import { toast } from 'react-hot-toast';

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
  const [message, setMessage] = useState('');

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };

  const values = {
    name: 'Flight Deck App',
    email: email,
    subject: `${name} wants to contact you`,
    message: `${name} wants to contact you`,
    html: `<div style="background-color: #f7f7f7; padding: 20px; text-align: center;"><h1 style="color: #333333; font-size: 28px;">¡${name} she is looking for you!</h1><img src="https://res.cloudinary.com/dvm47pxdm/image/upload/v1683420911/yq7qmpvsenhmxgrtjpyd.png" alt="ImagenFlightDeck" style="width: 300px; margin-bottom: 20px;"><p style="color: #666666; font-size: 18px;">${message}</p></div>`,
  };

  const handlerSend = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    sendContactForm(values);
    setMessage('');
    toast.success('Email OK');
  };

  return (
    <div className='bg-flightdeck-dark p-4 rounded-md'>
      <h2 className='text-flightdeck-lightgold text-lg font-semibold mb-2'>
        Contact {pilotName}
      </h2>
      <p className='text-white mb-2'>
        Keep in contact with {pilotName} to arrange an interview or coordinate a test flight.
      </p>
      <form className='space-y-2 w-full'>
        <div className='flex flex-col items-start'>
          <label
            htmlFor='contactName'
            className='text-flightdeck-lightgold font-semibold mb-1'
          >
            Name
          </label>
          <input
            type='text'
            id='contactName'
            value={pilotName}
            className='w-full bg-flightdeck-black border-flightdeck-lightgold border rounded-md py-2 px-3 text-white'
          />
        </div>
        <div className='flex flex-col items-start'>
          <label
            htmlFor='contactEmail'
            className='text-flightdeck-lightgold font-semibold mb-1'
          >
            Email
          </label>
          <input
            type='email'
            id='contactEmail'
            value={email}
            className='w-full bg-flightdeck-black border-flightdeck-lightgold border rounded-md py-2 px-3 text-white'
          />
        </div>
        <div className='flex flex-col items-start'>
          <label
            htmlFor='contactMessage'
            className='text-flightdeck-lightgold font-semibold mb-1'
          >
            Message
          </label>
          <textarea
            id='contactMessage'
            placeholder='Enter your message'
            value={message}
            onChange={handleMessageChange}
            className='w-full h-32 bg-flightdeck-black border-flightdeck-lightgold border rounded-md py-2 px-3 text-white'
          ></textarea>
        </div>
        <button
          onClick={handlerSend}
          className='bg-flightdeck-darkgold text-white rounded-md py-2 px-4 hover:bg-flightdeck-gold'
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactPilot;
