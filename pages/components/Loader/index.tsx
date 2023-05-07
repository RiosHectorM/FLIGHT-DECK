import Image from 'next/image';
import { BeatLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center z-50 focus:outline-none bg-violet-200/70 animated-gradient">
      <div className="mx-auto p-8 rounded-3xl shadow-xl bg-white">
        <BeatLoader color={"#000000"} loading={true} />
      </div>
    </div>
  );
};

export default Loader;
