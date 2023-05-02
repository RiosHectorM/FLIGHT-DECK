import ToasterProvider from '../providers/ToasterProvider';
import TableHoursPilot from './TableHours';

const index = () => {
  return (
    <div className='flex flex-col h-full'>
      <ToasterProvider />
      <TableHoursPilot />
    </div>
  );
};

export default index;
