import React from 'react';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-flightdeck-black py-4 w-full">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4">
        <div className="flex items-center">
          <Image
            src="/images/logo1.png"
            alt="FlightDeck Logo"
            width={300}
            height={300}
            className="mr-9"
          />
          <p className="text-flightdeck-gold text-lm">
            &copy; {currentYear} FLIGHTDECK. Todos los derechos reservados.
          </p>
        </div>
        <div className="flex">
          <span className="mr-4 text-flightdeck-gold hover:text-flightdeck-darkgold">
            <FaFacebook size={24} />
          </span>
          <span className="mr-4 text-flightdeck-gold hover:text-flightdeck-darkgold">
            <FaTwitter size={24} />
          </span>
          <span className="text-flightdeck-gold hover:text-flightdeck-darkgold">
            <FaInstagram size={24} />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
