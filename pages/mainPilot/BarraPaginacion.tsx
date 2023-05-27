import React, { MouseEvent } from 'react';

interface BarraPaginacionProps {
  number: number;
  handleClick: (number: number) => void;
}

const BarraPaginacion: React.FC<BarraPaginacionProps> = (props) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const num = Number(e.currentTarget.innerText);
    props.handleClick(num);
  };

  return (
    <div
      id='numbersContainer'
      className='bg-flightdeck-black  h-12 w-12 flex flex-row rounded-full mx-2 flex-wrap hover:bg-flightdeck-darkgold hover:text-black border hover:border-black '
    >
      <div
        className='flex flex-row justify-center items-center cursor-pointer hover:bg-flightdeck-lightgold w-full rounded-full hover:text-black text-flightdeck-lightgold font-bold'
        onClick={handleClick}
      >
        {props.number}
      </div>
    </div>
  );
};

export default BarraPaginacion;
