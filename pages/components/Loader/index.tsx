import Image from 'next/image';
import { BeatLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center z-50 focus:outline-none bg-yellow-100/70 animated-gradient">
      <div className="mx-auto p-8 rounded-3xl shadow-xl bg-flightdeck-cream">
        <BeatLoader color={"black"} loading={true} />
      </div>
    </div>
  );
};

export default Loader;
