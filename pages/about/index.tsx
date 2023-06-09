'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';

type Integrante = {
  nombre: string;
  rol: string;
  image: string;
  github: string;
  linkedin: string;
};

const integrantes: Integrante[] = [
  {
    nombre: 'Luis Roca',
    rol: 'Henry Mentor',
    image: '/images/luis.jpg',
    github: 'https://github.com/LuisRocca',
    linkedin:
      'https://www.linkedin.com/in/luis-miguel-alfonzo-roca-software-enginer/',
  },
  {
    nombre: 'Hector Rios',
    rol: 'Project Manager',
    image: '/images/hector.jpg',
    github: 'https://github.com/RiosHectorM',
    linkedin: 'https://www.linkedin.com/in/rioshectormartin/',
  },
  {
    nombre: 'Esteban Ramirez',
    rol: 'Frontend Developer',
    image: '/images/henry.jpg',
    github: 'https://github.com/esteban7712',
    linkedin: 'https://www.linkedin.com/in/esteban7712/',
  },
  {
    nombre: 'Martin Resnicoff',
    rol: 'Frontend Developer',
    image: '/images/martin.jpg',
    github: 'https://github.com/mresnicoff',
    linkedin: 'https://www.linkedin.com/in/martinresnicoff/',
  },
  {
    nombre: 'Diego Leon',
    rol: 'Frontend Developer',
    image: '/images/diego.jpg',
    github: 'https://github.com/DALGO0927',
    linkedin: 'https://www.linkedin.com/in/diegoleon09/',
  },
  {
    nombre: 'Samir Diaz',
    rol: 'Backend Developer',
    image: '/images/samir.jpg',
    github: 'https://github.com/SamirAlexander',
    linkedin: 'https://www.linkedin.com/in/samiralexanderdiaz/',
  },
  {
    nombre: 'Leonardo Alabart',
    rol: 'Backend Developer',
    image: '/images/leo.jpg',
    github: 'https://github.com/Leonbart',
    linkedin: 'https://www.linkedin.com/in/leonardo-alabart-80067813/',
  },
  {
    nombre: 'Gullit Moran',
    rol: 'Backend Developer',
    image: '/images/gulit.jpg',
    github: 'https://github.com/morangullit',
    linkedin:
      'https://www.linkedin.com/in/gullit-enrique-moran-escobar-731272a5',
  },
];

const About: React.FC = () => {
  return (
    <div className="mx-auto px-4 py-12 bg-cover bg-fixed bg-[url('/images/2301.w018.n002.1587B.p15.1587.jpg')]">
      <h1 className='text-7xl font-bold text-flightdeck-cream mb-20 text-center transform scale-90 md:scale-100'>
        About Us
      </h1>
      <div className='text-4xl font-bold text-flightdeck-cream mt-9 text-center'>
        {Array.from('FLIGHT DECK').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2 + index * 0.1,
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      <div className='flex justify-center mt-24 mx-auto'>
        <div className='md:w-1/2 xl:md:w-1/2 sm:w-full mx-auto p-8 text-lg bg-flightdeck-lightgold text-flightdeck-black transform scaleY(-1) shadow-xl text-center rounded-md bg-opacity-60'>
          <p
            className='
                        first-letter:text-7xl first-letter:font-bold first-letter:text-black
                        first-letter:mr-3 first-letter:float-left text-justify'
          >
            Our team has developed a Flight LogBook where pilots can have
            digital and online support for their flight hours, whether certified
            or not by an Instructor.
            <br />
            <br />
            Pilots can be visible to registered companies and even become part
            of the staff of such companies, thus being able to obtain
            certification of their hours without the need for an Instructor.
          </p>
        </div>
      </div>

      <br></br>
      <h1 className='flex justify-center text-5xl font-bold mt-24 text-flightdeck-cream mb-6'>
        Our Team
      </h1>

      <div className='grid gap-8 md:grid-cols-3 xl:grid-cols-3 sm:grid-cols-1'>
        {integrantes.map((integrante) => (
          <div
            key={integrante.nombre}
            className='bg-flightdeck-cream shadow-xl rounded-lg p-6 text-center bg-opacity-60 w-full'
          >
            <img
              src={integrante.image}
              alt={integrante.nombre}
              className='mx-auto shadow-xl rounded-full mb-4'
            />
            <h2 className='text-2xl font-bold text-flightdeck-black mb-2'>
              {integrante.nombre}
            </h2>
            <p className='text-lg text-flightdeck-black'>{integrante.rol}</p>
            <div className='flex justify-center mt-4'>
              <a
                href={integrante.github}
                target='_blank'
                rel='noopener noreferrer'
                className='mr-4'
              >
                <FontAwesomeIcon icon={faGithub} size='2x' />
              </a>
              <a
                href={integrante.linkedin}
                target='_blank'
                rel='noopener noreferrer'
              >
                <FontAwesomeIcon icon={faLinkedin} size='2x' />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
