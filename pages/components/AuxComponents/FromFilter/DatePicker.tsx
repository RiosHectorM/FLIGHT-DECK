import { useState } from 'react';

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const date = new Date(event.target.value);
    setStartDate(date);
    if (endDate && date > endDate) {
      setDateError(true);
    } else {
      setDateError(false);
    }
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setEndDate(date);
    if (startDate && date < startDate) {
      setDateError(true);
    } else {
      setDateError(false);
    }
  };

const [dateError, setDateError] = useState<boolean>(false);

  return (
    <div className='flex items-center flex-col'>
  <div className='flex'>
    <label htmlFor='start-date' className='mr-2'>
      Start date:
    </label>
    <input
      type='date'
      id='start-date'
      className='border border-gray-300 p-1 rounded-md mr-2'
      onChange={handleStartDateChange}
    />
    <label htmlFor='end-date' className='mr-2'>
      End date:
    </label>
    <input
      type='date'
      id='end-date'
      className={`border border-gray-300 p-1 rounded-md mr-2 ${
        dateError ? 'border-red-500' : ''
      }`}
      onChange={handleEndDateChange}
    />
  </div>
  <div>
    {dateError && (
      <p className='text-red-500'>End date cannot be before start date</p>
    )}
    {startDate && endDate && (
      <p className='bg-cyan-600 py-1 px-2 text-white'>
        Selected range: {startDate.toDateString()} - {endDate.toDateString()}
      </p>
    )}
  </div>
</div>
  );
};

export default DateRangePicker;
