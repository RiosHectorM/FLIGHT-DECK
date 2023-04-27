import { useState } from 'react';
import FilterToggle from './FilterToggle';
import Dropdown from './Dropdown';
import DateRangePicker from './FromFilter/DatePicker';

enum FilterOption {
  All = 'All',
  Verified = 'Verified',
  Unverified = 'Unverified',
  Active = 'Active',
  Expired = 'Expired',
}

interface FilterButtonProps {
  option: FilterOption;
  active: boolean;
  onClick: () => void;
}

const FilterButton = ({ option, active, onClick }: FilterButtonProps) => {
  return (
    <button
      className={`${
        active ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
      } px-4 py-2 bg-blue-500 text-black rounded-md shadow-md hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out`}
      onClick={onClick}
    >
      {option}
    </button>
  );
};

const FiltersBar = () => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>(
    FilterOption.All
  );

  const handleFilterClick = (option: FilterOption) => {
    setActiveFilter(option);
    // Aquí llamarías a la función que aplica el filtro correspondiente
  };

  const options = [
    { label: 'Instructor 1', id: 1 },
    { label: 'Instructor 2', id: 2 },
    { label: 'Instructor 3', id: 3 },
  ];

  const options2 = [
    { label: 'Avion 1', id: 1 },
    { label: 'Avion 2', id: 2 },
    { label: 'Avion 3', id: 3 },
  ];

  interface FilterProps {
    filter1: React.ReactNode;
    filter2: React.ReactNode;
  }

  const [selectedFilter, setSelectedFilter] = useState(1);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilter(Number(event.target.value));
  };

  return (
    <nav className='bg-gray-100 py-60 '>
      <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-10'>
          <FilterToggle
            filter1={
              <div className='flex justify-around w-full'>
                <div className='flex bg-gradient-to-t from-cyan-100 to-sky-400 p-5 w-5/12 rounded-3xl relative justify-around '>
                  <p className=' absolute peer-placeholder-shown:scale-100 -translate-y-10 font-semibold bg-sky-400 rounded-t-3xl px-5'>
                    Filter Hours
                  </p>
                  <FilterButton
                    option={FilterOption.All}
                    active={activeFilter === FilterOption.All}
                    onClick={() => handleFilterClick(FilterOption.All)}
                  />
                  <FilterButton
                    option={FilterOption.Verified}
                    active={activeFilter === FilterOption.Verified}
                    onClick={() => handleFilterClick(FilterOption.Verified)}
                  />
                  <FilterButton
                    option={FilterOption.Unverified}
                    active={activeFilter === FilterOption.Unverified}
                    onClick={() => handleFilterClick(FilterOption.Unverified)}
                  />
                </div>
                <div className='flex bg-gradient-to-t from-cyan-100 to-sky-400 p-5 w-6/12 rounded-3xl relative justify-around '>
                  <p className=' absolute peer-placeholder-shown:scale-100 -translate-y-10 font-semibold bg-sky-400 rounded-t-3xl px-5'>
                    Date Filter
                  </p>
                  <div className='flex flex-col justify-center text-center'>
                    <div>
                      <label className='inline-flex items-center'>
                        <input
                          type='radio'
                          className='form-radio h-5 w-5 text-blue-600'
                          name='filter'
                          value='1'
                          checked={selectedFilter === 1}
                          onChange={handleFilterChange}
                        />
                        <span className='ml-2 text-gray-700'>Date Filter</span>
                      </label>
                      <label className='inline-flex items-center ml-4'>
                        <input
                          type='radio'
                          className='form-radio h-5 w-5 text-blue-600'
                          name='filter'
                          value='2'
                          checked={selectedFilter === 2}
                          onChange={handleFilterChange}
                        />
                        <span className='ml-2 text-gray-700'>
                          Instructor Filter
                        </span>
                      </label>
                      <label className='inline-flex items-center ml-4'>
                        <input
                          type='radio'
                          className='form-radio h-5 w-5 text-blue-600'
                          name='filter'
                          value='3'
                          checked={selectedFilter === 3}
                          onChange={handleFilterChange}
                        />
                        <span className='ml-2 text-gray-700'>
                          Airplain Filter
                        </span>
                      </label>
                    </div>
                    <div className='ml-4'>
                      {selectedFilter === 1 ? (
                        <DateRangePicker />
                      ) : selectedFilter === 2 ? (
                        <Dropdown options={options} />
                      ) : (
                        <Dropdown options={options2} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            }
            filter2={
              <div className='flex bg-gradient-to-t from-cyan-100 to-sky-400 p-5 w-5/12 rounded-3xl relative justify-around '>
                <p className=' absolute peer-placeholder-shown:scale-100 -translate-y-10 font-semibold bg-sky-400 rounded-t-3xl px-5'>
                  Filter Certificates
                </p>
                <FilterButton
                  option={FilterOption.Active}
                  active={activeFilter === FilterOption.Active}
                  onClick={() => handleFilterClick(FilterOption.Active)}
                />
                <FilterButton
                  option={FilterOption.Expired}
                  active={activeFilter === FilterOption.Expired}
                  onClick={() => handleFilterClick(FilterOption.Expired)}
                />
              </div>
            }
          />
        </div>
      </div>
    </nav>
  );
};

export default FiltersBar;
