import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type FormValues = {
  folioFilter: string | undefined;
  fechaFilter: string | undefined;
  avionFilter: string | undefined;
};

interface Filtros {
  filter: {
  userId: string | undefined;
  date: string | undefined;
  aircraftId: string | undefined;
  folio: string | undefined;
  } | null
};

const FilterPilotBar: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const [filters, setFilters] = useState<Filtros>({  // Estado con los filtros del LocalStorage
    filter: {
      userId: undefined,
      date: undefined,
      aircraftId: undefined,
      folio: undefined,
    }
  });

  const onSubmit = (data: FormValues) => {
    console.log("DATA: ", data);

    const newFilter:Filtros = {
      filter: {
        userId: '64501738bf775f644956b98f',
        date: data.fechaFilter,
        aircraftId: data.avionFilter,
        folio: data.folioFilter,
      }
    }

    localStorage.setItem("filters", JSON.stringify(newFilter));
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const filter = localStorage.getItem("filters");
      
      if (filter) {
        setFilters(JSON.parse(filter));
        console.log('FILTERS HOLA: ', JSON.parse(filter));
      } 
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-wrap justify-between items-center px-4 py-2 bg-white rounded-lg shadow-lg w-full'
    >
      {/* Filtro de FOLIO */}
      <div className='w-full sm:w-1/5 flex items-center space-x-2 border border-blue-500 rounded-lg shadow hover:bg-blue-300 p-2'>
        <label htmlFor='folioFilter'>Folio:</label>
        <input
          defaultValue={filters.filter?.folio}
          type='number'
          id='folioFilter'
          className='w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md shadow-sm'
          {...register('folioFilter', { valueAsNumber: true })}
        />
      </div>

      {/* Filtro de FECHA */}
      <div className='w-full sm:w-1/5 flex items-center space-x-2 border border-blue-500 rounded-lg shadow hover:bg-blue-300 p-2'>
        <label htmlFor='fechaFilter'>Date:</label>
        <input
          defaultValue={filters.filter?.date}
          type='date'
          id='fechaFilter'
          className='w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md shadow-sm'
          {...register('fechaFilter')}
        />
      </div>

      {/* Filtro de AVION */}
      <div className='w-full sm:w-1/5 flex items-center space-x-2 border border-blue-500 rounded-lg shadow hover:bg-blue-300 p-2'>
        <label htmlFor='tipoAvion'>Avión:</label>
        <input
          defaultValue={filters.filter?.aircraftId}
          id='tipoAvion'
          className='w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md shadow-sm'
          {...register('avionFilter')}
        />
      </div>

      {/* Filtro de TIPO
      <div className='w-full sm:w-1/5 flex items-center space-x-2 border border-blue-500 rounded-lg shadow hover:bg-blue-300 p-2'>
        <label htmlFor='tipoFilter'>Type:</label>
        <select
          id='tipoFilter'
          className='w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md shadow-sm'
          {...register('tipoFilter')}
        >
          <option value=''>All</option>
          <option value='Simulador'>Simulador</option>
          <option value='Escuela'>Escuela</option>
          <option value='Copiloto'>Copiloto</option>
          <option value='Autonomo'>Autonomo</option>
        </select>
      </div> */}

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
        onClick={() => reset()}
        className='sm:w-auto w-full mt-2 sm:mt-0 px-2 py-1 text-sm text-gray-700 bg-blue-300 rounded-lg hover:bg-blue-400 focus:outline-none'
      >
        Reset Filters
      </button>

      <button onClick={handleSubmit(onSubmit)}>SEND</button>
    </form>
  );
};

export default FilterPilotBar;
