import Image from 'next/legacy/image';
import { useState } from 'react';

const FeaturesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      img: '/images/home1.jpg',
      title: 'LogBook',
      fullText: 'Manage your flight hours efficiently! Record your flight hours, search for instructors, rate their services, and request certifications. Generate a PDF document with your hour logs instantly! Download our application today.',
    },
    {
      img: '/images/home2.jpg',
      title: 'Register as an instructor today',
      fullText: 'Verify your flight hours with the truthfulness of your instructors, and communicate with them directly. Access statistics from your daily, weekly, or monthly trainings with our flight log application. Perfect your flying skills and become the best pilot you can be. Download our application today and take off to success!',
    },
    {
      img: '/images/home3.jpg',
      title: 'For companies',
      fullText: "Optimize the management of your pilots' flight hours with our flight log application for businesses. Approve pilot flight hours and access the database of registered pilots to download a history of certified and non-certified flight hours. Download our business flight log application today and take your pilot management to the next level.",
    },
  ];

  const handleMouseMove = (e:React.MouseEvent<HTMLDivElement>) => {
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
          <div className="absolute bottom-0 left-0 p-8 w-full h-1/3 bg-flightdeck-black/50 backdrop-blur-md">
            <h3 className="text-3xl font-bold text-white mb-3">{feature.title}</h3>
            <p className="text-lg text-white">{feature.fullText}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturesSection;
