import { FC, useState } from 'react';
import { format } from 'date-fns';

type ReminderFormProps = {
  date: Date;
  onSubmit: (text: string, date: Date) => void;
  onCancel: () => void;
  onClose: () => void; // Agregar esta línea
};


const ReminderForm: FC<ReminderFormProps> = ({ date, onSubmit, onCancel }) => {
  const [text, setText] = useState('');
  const formattedDate = format(date, 'MMMM d, yyyy');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(text, date);
    setText('');
  };

  return (
    <div className='absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center'>
      <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-xl font-bold mb-4'>Add Reminder</h2>
        <p className='text-gray-600 mb-4'>{formattedDate}</p>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 font-bold mb-2' htmlFor='text'>
              Reminder
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='text'
              type='text'
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='button'
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReminderForm;
