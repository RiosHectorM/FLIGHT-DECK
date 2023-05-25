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
      className='bg-gray-800 h-8 w-12 flex flex-row justify-center items-center'
    >
      <div
        id='numbers'
        className='w-8 h-8 rounded-full bg-azure flex flex-row flex-wrap justify-center items-center cursor-pointer'
        onClick={handleClick}
      >
        {props.number}
      </div>
    </div>
  );
};

export default BarraPaginacion;
