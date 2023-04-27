import { useState } from 'react';

interface FilterProps {
  filter1: React.ReactNode;
  filter2: React.ReactNode;
}

const FilterToggle = ({ filter1, filter2 }: FilterProps) => {
  const [showFilter1, setShowFilter1] = useState(true);

  const toggleFilters = () => {
    setShowFilter1((prev) => !prev);
  };

  return (
    <div className='flex w-full justify-around'>
      <button
        className='px-4 py-2 bg-blue-500 text-white rounded-md shadow-md mr-2'
        onClick={toggleFilters}
      >
        {showFilter1 ? 'Filter Certificates' : 'Filter Hours'}
      </button>
      {showFilter1 ? filter1 : filter2}
    </div>
  );
};

export default FilterToggle;
