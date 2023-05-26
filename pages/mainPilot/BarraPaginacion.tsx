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
      className='bg-flightdeck-darkgold h-12 w-12 flex flex-row rounded-full mx-2 flex-wrap'
    >
      <div
        className='flex flex-row justify-center items-center cursor-pointer hover:bg-flightdeck-lightgold w-full rounded-full'
        onClick={handleClick}
      >
        {props.number}
      </div>
    </div>
  );
};

export default BarraPaginacion;
