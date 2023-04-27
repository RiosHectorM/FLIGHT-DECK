import { useState } from 'react';

interface Option {
  id: number;
  label: string;
}

interface DropdownProps {
  options: Option[];
}

const Dropdown = ({ options }: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className='relative'>
      <button
        className='flex items-center justify-between w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedOption ? (
          <span>{selectedOption.label}</span>
        ) : (
          <span className='text-gray-400'>Seleccionar opción</span>
        )}
        <svg
          className={`w-5 h-5 ml-2 transition-transform duration-200 transform ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M10 15a.5.5 0 00.5-.5v-9a.5.5 0 00-1 0v9a.5.5 0 00.5.5zM5.646 8.854a.5.5 0 01.708 0L10 12.293l3.646-3.646a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 010-.708z'
            clipRule='evenodd'
          />
        </svg>
      </button>
      {isDropdownOpen && (
        <div className='absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg'>
          {options.map((option) => (
            <button
              key={option.id}
              className={`block w-full px-4 py-2 text-left text-gray-800 hover:bg-blue-500 hover:text-white ${
                selectedOption?.id === option.id ? 'bg-blue-500 text-white' : ''
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
