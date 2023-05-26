import Image from 'next/image';
import { useState } from 'react';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const testimonials = [
    {
      image: '/images/testimonial1.png',
      alt: 'testimonial1',
      text: "It's great! It allows you to do personalized tracking of flight hours, connect with instructors, and easily schedule training sessions. Plus, you can generate PDF logs to present to any entity.",
      name: 'John Doe',
      role: 'PILOT',
    },
    {
      image: '/images/testimonial2.png',
      alt: 'testimonial2',
      text: "Since I started using it, the management of the students' flight hours has improved and it allows for more time to be devoted to teaching and less to bureaucracy, so the author recommends it to other flight instructors.",
      name: 'Jane Doe',
      role: 'INSTRUCTOR',
    },
    {
      image: '/images/testimonial3.png',
      alt: 'testimonial3',
      text: "Our company has used this flight log application to optimize the management of our pilots' flight hours, and it has been an invaluable tool",
      name: 'James Smith',
      role: 'CTO, Company Inc.',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center my-16 sm:h-[100vh]">
      <h2 className="text-4xl font-bold text-flightdeck-cream mb-8">Testimonials</h2>
      <div className="flex flex-col md:flex-row items-center justify-center w-full space-y-8 md:space-y-0 md:space-x-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="w-full md:w-1/3"
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(-1)}
          >
            <div
              className="flex flex-col items-center justify-center bg-flightdeck-cream rounded-lg shadow-md p-8"
              style={{
                transform: activeIndex === index ? 'translateX(-25%)' : 'translateX(0)',
                marginLeft: activeIndex === index ? '25%' : '0',
                opacity: activeIndex === index || activeIndex === -1 ? 1 : 0.5,
                backgroundColor: 'rgba(229, 217, 182, 0.7)',
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
