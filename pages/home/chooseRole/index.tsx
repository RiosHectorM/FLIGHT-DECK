import Container from '../../components/AuxComponents/Container';
import Role from './Role';

const index = () => {
  return (
    <Container>
      <div className='flex flex-col items-center justify-center h-1/2'>
        <h2 className='text-4xl font-bold text-gray-800'>Join us as a</h2>
        <div className='flex justify-center space-x-6 mt-8'>
          <Role />
        </div>
      </div>
    </Container>
  );
};

export default index;
