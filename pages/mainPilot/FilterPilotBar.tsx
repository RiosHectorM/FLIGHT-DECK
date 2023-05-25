import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';

interface FilterPilotBarProps {
  updateFilters: () => void;
}
interface Filtros {
  filter: {
    userId?: string;
    date?: string;
    aircraftId?: string;
    folio?: string;
    estado?: string;
    tipo?: string;
  } | null;
}

type FormValues = {
  tipoHoras: string;
  estadoHoras: string;
  matricula: string;
  fecha: string;
};

const FilterPilotBar: React.FC<FilterPilotBarProps> = ({ updateFilters }) => {
  const [filters, setFilters] = useState<Filtros | null>({
    filter: {
      date: '',
      aircraftId: '',
      tipo: '',
      estado: '',
    },
  });

  const [formData, setFormData] = useState<FormValues>({
    tipoHoras: filters && filters.filter?.tipo ? filters.filter.tipo : '',
    estadoHoras: filters && filters.filter?.estado ? filters.filter.estado : '',
    matricula:
      filters && filters.filter?.aircraftId ? filters.filter.aircraftId : '',
    fecha: filters && filters.filter?.date ? filters.filter.date : '',
  });
  useEffect(() => {
    if (typeof window !== undefined && window.localStorage) {
      const filter = localStorage.getItem('filters');
      if (filter) {
        const objFilter = JSON.parse(filter);
        setFilters(JSON.parse(filter));
        setFormData({
          tipoHoras: objFilter.filter?.tipo ? objFilter.filter.tipo : '',
          estadoHoras: objFilter.filter?.estado ? objFilter.filter.estado : '',
          matricula: objFilter.filter?.aircraftId
            ? objFilter.filter.aircraftId
            : '',
          fecha: objFilter.filter?.date ? objFilter.filter.date : '',
        });
      }
    }
  }, []);
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleReset = () => {
    setFormData({
      tipoHoras: '',
      estadoHoras: '',
      matricula: '',
      fecha: '',
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    let newFilter: Filtros = {
      filter: {
        date: formData?.fecha ? formData.fecha : '',
        aircraftId: formData?.matricula ? formData.matricula : '',
        tipo: formData?.tipoHoras ? formData.tipoHoras : '',
        estado: formData?.estadoHoras ? formData.estadoHoras : '',
      },
    };
    localStorage.setItem('filters', JSON.stringify(newFilter));
    updateFilters();
    console.log(localStorage.getItem('filters'));
  };

  return (
    <form
      className='flex flex-wrap justify-between items-center px-4 py-2 bg-white rounded-lg shadow-lg w-full mt-9'
      onSubmit={handleSubmit}
    >
      <div className='w-full sm:w-1/5 flex items-center space-x-2 rounded-lg hover:shadow-lg p-2'>
        <label htmlFor='Fecha' className='text-gray-600'>
          Date:
        </label>
        <input
          className='w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md shadow-sm'
          type='date'
          id='fecha'
          name='fecha'
          value={formData.fecha}
          onChange={handleInputChange}
        />
      </div>
      <div className='w-full sm:w-1/5 flex items-center space-x-2 rounded-lg hover:shadow-lg p-2'>
        <label htmlFor='matricula' className='text-gray-600'>
          Airplane:
        </label>
        <input
          className='w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md shadow-sm'
          type='text'
          id='matricula'
          name='matricula'
          value={formData.matricula}
          onChange={handleInputChange}
        />
      </div>
      <div className='w-full sm:w-1/5 flex items-center space-x-2 border border-blue-500 rounded-lg shadow hover:bg-blue-300 p-2'>
        <label htmlFor='tipoHoras'>Type:</label>
        <select
          className='w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md shadow-sm'
          id='tipoHoras'
          name='tipoHoras'
          value={formData.tipoHoras}
          onChange={handleSelectChange}
        >
          <option value=''>All</option>
          <option value='Simulador'>Simulator</option>
          <option value='Escuela'>Training</option>
          <option value='Copiloto'>Copilot</option>
          <option value='Autonomo'>Autonomous</option>
        </select>
      </div>
      <div className='w-full sm:w-1/5 flex items-center space-x-2 border border-blue-500 rounded-lg shadow hover:bg-blue-300 p-2'>
        <label htmlFor='estadoHoras'>State:</label>
        <select
          className='w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md shadow-sm'
          id='estadoHoras'
          name='estadoHoras'
          value={formData.estadoHoras}
          onChange={handleSelectChange}
        >
          <option value='Todas'>All</option>
          <option value='Cargadas'>Loaded</option>
          <option value='Pedidas'>Waiting to Certify</option>
          <option value='Certificadas'>Certified</option>
        </select>
      </div>
      <button
        className='sm:w-auto w-full mt-2 sm:mt-0 px-2 py-1 text-sm text-gray-700 bg-red-300 rounded-lg hover:bg-red-400 focus:outline-none transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110'
        type='button'
        onClick={handleReset}
      >
        Reset Filters
      </button>
      <button
        type='submit'
        onClick={handleSubmit}
        className='sm:w-auto w-full mt-2 sm:mt-0 px-2 py-1 text-sm text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110'
      >
        {' '}
        Apply Filters
      </button>
    </form>
  );
};

export default FilterPilotBar;
