import Container from '../../components/AuxComponents/Container';
import Role from './Role';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <Container>
      <motion.div
        className='flex flex-col items-center justify-center h-1/2'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        <motion.h2
          className='text-4xl font-bold text-gray-800'
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Join us as a
          <motion.span
            className='text-blue-500'
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {' '}
            pilot, instructor or company
          </motion.span>
        </motion.h2>
        <div className='flex justify-center space-x-6 mt-8'>
          <Role />
        </div>
      </motion.div>
    </Container>
  );
};

export default Index;

