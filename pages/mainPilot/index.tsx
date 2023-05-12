import ToasterProvider from '../providers/ToasterProvider';
import TableHoursPilot from './TableHours';

const index = () => {
  return (
    <div className='flex flex-col min-h-screen' style={{ backgroundImage: "url('/images/mainpiloto.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>

      <ToasterProvider />
      <TableHoursPilot />
    </div>
  );
};

export default index;
