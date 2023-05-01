import { FC, useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';

type CalendarProps = {
  currentDate: Date;
  onDateChange: (newDate: Date) => void;
};

const Calendar: FC<CalendarProps> = ({ currentDate, onDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState(currentDate);

  const handlePrevClick = () => {
    const newMonth = subMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
  };

  const handleNextClick = () => {
    const newMonth = addMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
  };

  const monthName = format(currentMonth, 'MMMM yyyy');

  return (
    <div className='border rounded-lg p-4'>
      <div className='flex items-center justify-between mb-4'>
        <button className='text-gray-700 focus:outline-none' onClick={handlePrevClick}>
          {'<'}
        </button>
        <h2 className='text-lg font-bold text-gray-800'>{monthName}</h2>
        <button className='text-gray-700 focus:outline-none' onClick={handleNextClick}>
          {'>'}
        </button>
      </div>
      <div className='grid grid-cols-7 gap-2'>
        <div className='text-sm font-bold text-gray-500'>S</div>
        <div className='text-sm font-bold text-gray-500'>M</div>
        <div className='text-sm font-bold text-gray-500'>T</div>
        <div className='text-sm font-bold text-gray-500'>W</div>
        <div className='text-sm font-bold text-gray-500'>T</div>
        <div className='text-sm font-bold text-gray-500'>F</div>
        <div className='text-sm font-bold text-gray-500'>S</div>
        {Array.from({ length: 42 }).map((_, index) => {
          const dayOfMonth = index - new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() + 1;
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayOfMonth);
          const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
          const isToday = date.toDateString() === new Date().toDateString();
          const className = `
            ${!isCurrentMonth ? 'text-gray-400' : 'text-gray-800 font-medium'}
            ${isToday && 'bg-gray-200'}
            text-sm border rounded-full h-8 w-8 flex items-center justify-center
          `;

          return (
            <div key={index} className={className} onClick={() => onDateChange(date)}>
              {dayOfMonth > 0 && isCurrentMonth && dayOfMonth}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
