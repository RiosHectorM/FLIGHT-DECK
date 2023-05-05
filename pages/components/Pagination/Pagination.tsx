import React from 'react';

interface PaginationProps {
  flightsPerPage: number;
  totalItems: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  flightsPerPage,
  totalItems,
  currentPage,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / flightsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (pageNumber: number | 'prev' | 'next') => {
    if (pageNumber === 'prev') {
      paginate(currentPage - 1);
    } else if (pageNumber === 'next') {
      paginate(currentPage + 1);
    } else {
      paginate(pageNumber);
    }
  };

  return (
    <div className='flex justify-center items-center space-x-2'>
      <button
        className={`${
          currentPage === 1
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-white text-gray-600 hover:text-gray-700 hover:bg-gray-200'
        } py-2 px-4 border border-gray-300 rounded-l focus:outline-none`}
        onClick={() => handleClick('prev')}
        disabled={currentPage === 1}
      >
        &lt; Prev
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => handleClick(number)}
          className={`${
            currentPage === number
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-600 hover:text-gray-700 hover:bg-gray-200'
          } py-2 px-4 border border-gray-300 focus:outline-none`}
        >
          {number}
        </button>
      ))}
      <button
        className={`${
          currentPage === pageNumbers.length
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-white text-gray-600 hover:text-gray-700 hover:bg-gray-200'
        } py-2 px-4 border border-gray-300 rounded-r focus:outline-none`}
        onClick={() => handleClick('next')}
        disabled={currentPage === pageNumbers.length}
      >
        Next &gt;
      </button>
    </div>
  );
};

export default Pagination;
