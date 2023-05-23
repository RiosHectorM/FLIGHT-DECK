import { FaStar } from "react-icons/fa";

interface Props {
  qualify: number;
}

const Stars = ({ qualify }: Props) => {

  const elements = [];

  for (let i = 1; i <= qualify; i++) {
    elements.push(<FaStar key={i} className='text-yellow-400 h-6 w-6' />);
  }

  return <div className='flex items-center w-full justify-center'>{elements}</div>;
};

export default Stars;
