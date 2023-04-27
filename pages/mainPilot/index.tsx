import Navbar from '../components/Navbar/Navbar';
import ToasterProvider from '../providers/ToasterProvider';
import TableHoursPilot from './TableHours';

const index = () => {
  return (
    <div className='flex flex-col h-full'>
      <div>
        <Navbar />
      </div>
      <div>
        <ToasterProvider />
        <TableHoursPilot />
      </div>
    </div>
  );
};

export default index;
