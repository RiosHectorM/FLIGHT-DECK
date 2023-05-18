import Image from 'next/legacy/image';
import { useState } from 'react';

const FeaturesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      img: '/images/feature1.jpg',
      title: 'LogBook',
      fullText: '¡Gestiona tus horas de vuelo de forma eficiente! Registra tus horas de vuelo, busca instructores, puntúa sus servicios y solicita certificaciones.Genera un documento PDF con tus registros de horas al instante! Descarga nuestra aplicación hoy.',
    },
    {
      img: '/images/feature2.png',
      title: 'Register as an instructor today',
      fullText: 'Verifica tus horas de vuelo con la veracidad de tus instructores, y comunícate con ellos directamente. Accede a estadísticas de tus capacitaciones diarias, semanales o mensuales con nuestra aplicación de registro de horas de vuelo. Perfecciona tus habilidades de vuelo y conviértete en el mejor piloto que puedas ser. ¡Descarga nuestra aplicación hoy mismo y despega hacia el éxito!',
    },
    {
      img: '/images/feature3.png',
      title: 'For companies',
      fullText: 'Optimiza la gestión de horas de vuelo de tus pilotos con nuestra aplicación de registro de horas de vuelo para empresas. Aprueba las horas de vuelo de los pilotos y accede a la base de datos de pilotos registrados para descargar un historial de horas de vuelo certificadas y no certificadas. Descarga nuestra aplicación de registro de horas de vuelo para empresas hoy mismo y lleva la gestión de tus pilotos al siguiente nivel.',
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const screenWidth = window.innerWidth;
    const newIndex = Math.floor((e.clientX / screenWidth) * features.length);
    setActiveIndex(newIndex);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden mt-20" onMouseMove={handleMouseMove}>
      {features.map((feature, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-500 ${
            activeIndex === index ? 'z-10' : 'z-0'
          }`}
          style={{
            transform:
              activeIndex === index ? 'translateX(0)' : `translateX(${(index - activeIndex) * 100}%)`,
          }}
        >
          <Image
            src={feature.img}
            alt={`Feature ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className="pointer-events-none"
          />
          <div className="absolute bottom-0 left-0 p-8 w-full h-1/3 bg-gradient-to-t from-black/50 to-transparent backdrop-blur-md">
            <h3 className="text-3xl font-bold text-white mb-3">{feature.title}</h3>
            <p className="text-lg text-white">{feature.fullText}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturesSection;
