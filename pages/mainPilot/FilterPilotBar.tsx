import React, { FC, useEffect, useState, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';

type FormValues = {
  tipoFilter: string | undefined;
  fechaFilter: string | undefined;
  avionFilter: string | undefined;
  estadoFilter: string | undefined;
};

interface Filtros {
  filter: {
    userId?: string;
    date?: string;
    aircraftId?: string;
    estado?: string;
    tipo?: string
  } | null;
}

interface FilterPilotBarProps {
  updateFilters: () => void;
}

const FilterPilotBar: FC<FilterPilotBarProps> = ({ updateFilters }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const [filters, setFilters] = useState<Filtros>({
    // Estado con los filtros del LocalStorage
    filter: {
      userId: undefined,
      date: undefined,
      aircraftId: undefined,
      tipo: undefined,
      estado: undefined,
    },
  });

  const onSubmit = (data: FormValues) => {
    let newFilter: Filtros = {
      filter: {
        userId: '64501738bf775f644956b98g',
        date: data.fechaFilter,
        aircraftId: data.avionFilter,
        tipo: data.tipoFilter,
        estado: data.estadoFilter,
      },
    };
    localStorage.setItem('filters', JSON.stringify(newFilter));
    updateFilters();
  };

  const handleReset = () => {
    reset();

    let newFilter: Filtros = {
      filter: null,
    };
    localStorage.setItem('filters', JSON.stringify(newFilter));
    setFilters(newFilter);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const filter = localStorage.getItem('filters');

      if (filter) {
        setFilters(JSON.parse(filter));
      }
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-wrap justify-between items-center px-4 py-2 bg-white rounded-lg shadow-lg w-full mt-9'
    >

      {/* Filtro de FECHA */}
      <div className='w-full sm:w-1/5 flex items-center space-x-2 rounded-lg hover:shadow-lg p-2'>
        <label htmlFor='fechaFilter' className='text-gray-600'>
          Date:
        </label>
        <input
          defaultValue={filters.filter?.date}
          type='date'
          id='fechaFilter'
          className='w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md shadow-sm'
          {...register('fechaFilter')}
        />
      </div>

      {/* Filtro de AVION */}
      <div className='w-full sm:w-1/5 flex items-center space-x-2 rounded-lg hover:shadow-lg p-2'>
        <label htmlFor='tipoAvion' className='text-gray-600'>
          Airplane:
        </label>
        <input
          defaultValue={filters.filter?.aircraftId}
          id='tipoAvion'
          className='w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md shadow-sm'
          {...register('avionFilter')}
        />
      </div>
            {/* Filtro de tipo */}
            <div className='w-full sm:w-1/5 flex items-center space-x-2 border border-blue-500 rounded-lg shadow hover:bg-blue-300 p-2'>
        <label htmlFor='tipoFilter'>Kind</label>
        <select
          id='estadoFilter'
          className='w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md shadow-sm'
          {...register('tipoFilter')}
        >
              <option value=''>All</option>
              <option value='Simulador'>Simulator</option>
              <option value='Escuela'>Training</option>
              <option value='Copiloto'>Copilot</option>
              <option value='Autonomo'>Autonomous</option>
        </select>
      </div>

      {/* Filtro de estado */}
      <div className='w-full sm:w-1/5 flex items-center space-x-2 border border-blue-500 rounded-lg shadow hover:bg-blue-300 p-2'>
        <label htmlFor='tipoFilter'>Status</label>
        <select
          id='estadoFilter'
          className='w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md shadow-sm'
          {...register('estadoFilter')}
        >
          <option value='Todas'>All</option>
          <option value='Cargadas'>Cargadas</option>
          <option value='Pedidas'>Certif. Pedida</option>
          <option value='Certificadas'>Certificadas</option>
        </select>
      </div>

      {/* Filtro de ETAPAS
      <div className='w-full sm:w-1/5 flex items-center space-x-2 border border-blue-500 rounded-lg shadow hover:bg-blue-300 p-2'>
        <label htmlFor='etapasFilter'>Stages:</label>
        <input
          type='text'
          id='etapasFilter'
          className='w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md shadow-sm'
          {...register('etapasFilter')}
        />
      </div> */}

      {/* Botón de Reset Filters */}
      <button
        type='button'
        onClick={handleReset}
        className='sm:w-auto w-full mt-2 sm:mt-0 px-2 py-1 text-sm text-gray-700 bg-red-300 rounded-lg hover:bg-red-400 focus:outline-none transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110'
      >
        Reset Filters
      </button>

      <button
        onClick={handleSubmit(onSubmit)}
        type='submit'
        className='sm:w-auto w-full mt-2 sm:mt-0 px-2 py-1 text-sm text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110'
      >
        Apply Filters
      </button>
    </form>
  );
};

export default FilterPilotBar;
