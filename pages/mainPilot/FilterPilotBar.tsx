import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

type FormValues = {
  folioFilter: string;
  fechaFilter: string;
  tipoFilter: string;
  etapasFilter: string;
};

const FilterPilotBar: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-wrap justify-between items-center px-4 py-2 bg-white rounded-lg shadow-lg w-full'
    >
      {/* Filtro de FOLIO */}
      <div className='w-full sm:w-1/5 flex items-center space-x-2 border border-blue-500 rounded-lg shadow hover:bg-blue-300 p-2'>
        <label htmlFor='folioFilter'>Folio:</label>
        <input
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
          type='date'
          id='fechaFilter'
          className='w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md shadow-sm'
          {...register('fechaFilter')}
        />
      </div>

      {/* Filtro de TIPO */}
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
      </div>

      {/* Filtro de ETAPAS */}
      <div className='w-full sm:w-1/5 flex items-center space-x-2 border border-blue-500 rounded-lg shadow hover:bg-blue-300 p-2'>
        <label htmlFor='etapasFilter'>Stages:</label>
        <input
          type='text'
          id='etapasFilter'
          className='w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md shadow-sm'
          {...register('etapasFilter')}
        />
      </div>

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
