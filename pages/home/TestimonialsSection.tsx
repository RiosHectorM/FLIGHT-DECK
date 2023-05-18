import Image from 'next/image';
import { useState } from 'react';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const testimonials = [
    {
      image: '/images/testimonial1.png',
      alt: 'testimonial1',
      text: 'Es genial!, te permite hacer un seguimiento personalizado de las horas de vuelo, conectarse con instructores y programar sesiones de capacitación fácilmente. Además, se pueden generar registros en PDF para presentarlos en cualquier entidad.',
      name: 'John Doe',
      role: 'PILOT',
    },
    {
      image: '/images/testimonial2.png',
      alt: 'testimonial2',
      text: 'Desde que la comence a usar ha mejorado la gestión de las horas de vuelo de los estudiantes y permite dedicar más tiempo a la enseñanza y menos a la burocracia, por lo que el autor la recomienda a otros instructores de vuelo.',
      name: 'Jane Doe',
      role: 'INSTRUCTOR',
    },
    {
      image: '/images/testimonial3.png',
      alt: 'testimonial3',
      text: 'Nuestra empresa ha utilizado esta aplicación de registro de horas de vuelo para optimizar la gestión de horas de vuelo de nuestros pilotos, y ha sido una herramienta invaluable.',
      name: 'James Smith',
      role: 'CTO, Company Inc.',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center my-16 sm:h-[80vh]">
      <h2 className="text-4xl font-bold text-gray-200 mb-8">Testimonials</h2>
      <div className="flex flex-col md:flex-row items-center justify-center w-full space-y-8 md:space-y-0 md:space-x-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="w-full md:w-1/3"
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(-1)}
          >
            <div
              className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8"
              style={{
                transform: activeIndex === index ? 'translateX(-25%)' : 'translateX(0)',
                marginLeft: activeIndex === index ? '25%' : '0',
                opacity: activeIndex === index || activeIndex === -1 ? 1 : 0.5,
                backgroundColor: 'rgba(255, 255, 255, 0.7)', // Agregue esta línea
                transition: 'all 0.3s ease',
              }}
            >
              <Image src={testimonial.image} alt={testimonial.alt} width={100} height={100} className="rounded-full mb-4" />
              <p className="text-lg text-gray-600 text-center">{testimonial.text}</p>
              <h4 className="text-xl font-bold text-gray-800 mt-4">{testimonial.name}</h4>
              <p className="text-gray-600">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;