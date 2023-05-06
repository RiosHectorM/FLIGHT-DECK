import Image from 'next/image';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center z-50 focus:outline-none bg-violet-200/70 animated-gradient">
      <div className="mx-auto p-8 rounded-3xl shadow-xl bg-white">
        <div className="relative w-40 h-40">
          <Image src="/images/loader.gif" alt="Loader" layout="fill" objectFit="contain" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
