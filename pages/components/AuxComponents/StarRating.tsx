import { useState } from 'react';
const StarRating = ({
  rating,
  rankear,
}: {
  rating: number;
  rankear: (index: number) => void;
}) => {
  const [hover, setHover] = useState(0);
  return (
    <div className='star-rating'>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type='button'
            key={index}
            className={
              index <= (hover || rating)
                ? 'text-5xl bg-transparent border-0 outline-0 cursor-pointer text-yellow-500 font-black'
                : 'text-5xl bg-transparent border-0 outline-0 cursor-pointer font-black '
            }
            onClick={() => rankear(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className='star'>&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};
export default StarRating;
