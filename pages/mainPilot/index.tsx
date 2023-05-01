import ToasterProvider from '../providers/ToasterProvider';
import FilterPilotBar from './FilterPilotBar';
import TableHoursPilot from './TableHours';

const index = () => {
  return (
    <div className='flex flex-col h-full'>
      <ToasterProvider />
      <FilterPilotBar />
      <TableHoursPilot />
    </div>
  );
};

export default index;
