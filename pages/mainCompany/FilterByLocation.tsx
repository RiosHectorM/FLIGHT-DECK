import React from 'react';

interface FilterByLocationProps {
  onFilterChange: (newLocation: string) => void;
}

const FilterByLocation: React.FC<FilterByLocationProps> = ({ onFilterChange }) => {
  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange(event.target.value);
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <h2 className="text-lg font-semibold">Filtrar por ubicación</h2>
      <input type="text" placeholder="Escriba una ubicación" className="border border-gray-400 rounded-md p-2 mt-2" onChange={handleLocationChange} />
    </div>
  );
};

export default FilterByLocation;
