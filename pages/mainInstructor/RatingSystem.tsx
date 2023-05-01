import { useState } from 'react';

const RatingSystem = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRating = (value: number) => {
    setRating(value);
  };

  const handleMouseEnter = (value: number) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className='flex items-center'>
      {[1, 2, 3, 4, 5].map((value) => {
        return (
          <svg
            key={value}
            xmlns='http://www.w3.org/2000/svg'
            className={`h-8 w-8 ${value <= rating || value <= hoverRating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            onClick={() => handleRating(value)}
            onMouseEnter={() => handleMouseEnter(value)}
            onMouseLeave={() => handleMouseLeave()}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M5 11l7-7 7 7M5 19l7-7 7 7'
            />
          </svg>
        );
      })}
      <p className='text-gray-500 ml-3'>{rating}/5</p>
    </div>
  );
};

export default RatingSystem;
