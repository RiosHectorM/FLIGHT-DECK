import React from 'react';

const BarraPaginacion = (props) => {
  return (
    <div
      id="numbersContainer"
      className="bg-gray-800 h-8 w-12 flex flex-row  justify-center items-center"
    >
      <div
        id="numbers"
        className="w-8 h-8 rounded-full bg-azure flex flex-row flex-wrap justify-center items-center cursor-pointer"
        onClick={(e) => {
          props.handleClick(e.target.innerText);
        }}
      >
        {props.number}{' '}
      </div>
    </div>
  );
};

export default BarraPaginacion;
