import Image from 'next/image';

const Loader = () => {
  return (
    <div
      className='fixed inset-0 flex items-center z-50 focus:outline-none
          bg-violet-200/70'
    >
      <div className='mx-auto p-8 rounded-3xl shadow-xl bg-gradient-to-t from-zinc-300 to-indigo-600'>
        <div className='relative w-96 h-96'>
          <Image
            src='/images/loader.gif'
            alt='Loader'
            layout='fill'
            objectFit='contain'
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
