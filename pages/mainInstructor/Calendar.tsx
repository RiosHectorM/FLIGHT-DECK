import { FC, useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import ReminderForm from './ReminderForm';

type CalendarProps = {
  currentDate: Date;
  onDateChange: (newDate: Date) => void;
};

const Calendar: FC<CalendarProps> = ({ currentDate, onDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState(currentDate);
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handlePrevClick = () => {
    const newMonth = subMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
  };

  const handleNextClick = () => {
    const newMonth = addMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
  };

  const monthName = format(currentMonth, 'MMMM yyyy');

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowReminderForm(true);
  };

  const handleReminderFormClose = () => {
    setSelectedDate(null);
    setShowReminderForm(false);
  };
  const handleReminderFormSubmit = (text: string, color: string) => {
    // Aquí puedes hacer lo que necesites con los datos del recordatorio, como guardarlos en el estado de la app
    console.log(text, color, selectedDate);
    handleReminderFormClose();
  };

  return (
    <div className='border rounded-lg p-4'>
      <div className='flex items-center justify-between mb-4'>
        <button className='text-white focus:outline-none' onClick={handlePrevClick}>
          {'<'}
        </button>
        <h2 className='text-lg font-bold text-white'>{monthName}</h2>
        <button className='text-white focus:outline-none' onClick={handleNextClick}>
          {'>'}
        </button>
      </div>
      <div className='grid grid-cols-7 gap-2'>
        <div className='text-sm font-bold text-white'>S</div>
        <div className='text-sm font-bold text-white'>M</div>
        <div className='text-sm font-bold text-white'>T</div>
        <div className='text-sm font-bold text-white'>W</div>
        <div className='text-sm font-bold text-white'>T</div>
        <div className='text-sm font-bold text-white'>F</div>
        <div className='text-sm font-bold text-white'>S</div>
        {Array.from({ length: 42 }).map((_, index) => {
          const dayOfMonth = index - new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() + 1;
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayOfMonth);
          const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
          const isToday = date.toDateString() === new Date().toDateString();
          const className = `
            ${!isCurrentMonth ? 'text-white' : 'text-white font-medium'}
            ${isToday && 'bg-blue-500'}
            text-sm border rounded-full h-8 w-8 flex items-center justify-center
          `;
          const isDisabled = date < new Date();
  
          return (
            <div key={index} className={className} onClick={() => !isDisabled && handleDateClick(date)}>
              {dayOfMonth > 0 && isCurrentMonth && dayOfMonth}
            </div>
          );
        })}
      </div>
      {showReminderForm && selectedDate && (
        <ReminderForm 
          date={selectedDate}
          onSubmit={handleReminderFormSubmit} 
          onCancel={handleReminderFormClose}
          onClose={handleReminderFormClose} // Agregar esta línea
        />
      )}
    </div>
  );
  
};

export default Calendar;
