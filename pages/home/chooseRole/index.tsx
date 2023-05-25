import Role from './Role';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <div className='bg-black'>
      <motion.div
        className='flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 xl:px-20 h-1/2 '
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        <div className='flex flex-wrap justify-center md:justify-start space-x-0 md:space-x-6 mt-8  w-full'>
          <Role />
        </div>
      </motion.div>
    </div>
  );
};

export default Index;

