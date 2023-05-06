import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

const FeaturesSection = () => {
  const [expanded, setExpanded] = useState([false, false, false]);

  const toggleExpanded = (index: number) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  const cardVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.5 } },
  };

  const textVariants = {
    collapsed: { height: '4.5em' },
    expanded: { height: 'auto' },
  };

  const features = [
    {
      img: '/images/feature1.jpg',
      title: 'LogBook',
      fullText: `¡Gestiona tus horas de vuelo de forma eficiente! Registra tus horas de vuelo, busca instructores, puntúa
          sus servicios y solicita certificaciones. ¡Genera un documento PDF con tus registros de horas al
          instante! Descarga nuestra aplicación hoy.`,
    },
    {
      img: '/images/feature2.jpg',
      title: 'Register as an instructor today',
      fullText: `Verifica tus horas de vuelo con la veracidad de tus instructores, y comunícate con ellos directamente.
          Accede a estadísticas de tus capacitaciones diarias, semanales o mensuales con nuestra aplicación de
          registro de horas de vuelo. Perfecciona tus habilidades de vuelo y conviértete en el mejor piloto que
          puedas ser. ¡Descarga nuestra aplicación hoy mismo y despega hacia el éxito!`,
    },
    {
      img: '/images/feature3.jpg',
      title: 'For companies',
      fullText: `Optimiza la gestión de horas de vuelo de tus pilotos con nuestra aplicación de registro de horas de vuelo
          para empresas. Aprueba las horas de vuelo de los pilotos y accede a la base de datos de pilotos
          registrados para descargar un historial de horas de vuelo certificadas y no certificadas. Descarga nuestra
          aplicación de registro de horas de vuelo para empresas hoy mismo y lleva la gestión de tus pilotos al
          siguiente nivel.`,
    },
  ];

  return (
    <div className="bg-transparent py-24">
      {/* ... */}
      <div className="flex flex-wrap -mx-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            >
            <div
              className="bg-white rounded-lg shadow-lg py-8 px-10 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-blue-500"
            >
                <div className="mb-6">
                  <Image src={feature.img} alt={`Feature ${index + 1}`} width={150} height={150} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <motion.div
                  className="text-gray-600 mb-4 overflow-hidden"
                  style={{ transition: 'height 0.5s' }}
                  variants={textVariants}
                  initial="collapsed"
                  animate={expanded[index] ? 'expanded' : 'collapsed'}
                >
                  <p>{feature.fullText}</p>
                </motion.div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => toggleExpanded(index)}
                >
                  {expanded[index] ? 'Show Less' : 'Learn More'}
                </button>
                </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;