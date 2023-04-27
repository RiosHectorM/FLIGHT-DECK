import Image from 'next/image';
import Link from 'next/link';

const LoginPage = () => {
  return (
    
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="absolute top-0 left-0 w-full h-full z-10">
        <Image
          src="/images/background.gif"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="absolute top-8 left-8 z-20 text-white text-3xl font-bold tracking-wider">
        FLIGHTDECK
      </div>
      <div className="absolute top-8 right-8 z-20">
        <Link href="/home">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline">Volver al Home</button>
        </Link>
      </div>
      <form className="w-full max-w-sm z-20">
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
          <input type="email" id="email" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
          <input type="password" id="password" name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign in</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
