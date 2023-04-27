import Image from 'next/image'

const FeaturesSection = () => {
  return (
    <div className="bg-blue-50 py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our features</h2>
        </div>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-lg py-8 px-10">
              <div className="mb-6">
                <Image src="/images/feature1.jpg" alt="Feature 1" width={150} height={150} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Feature 1</h3>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
              </p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Learn More
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-lg py-8 px-10">
              <div className="mb-6">
                <Image src="/images/feature2.jpg" alt="Feature 2" width={150} height={150} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Feature 2</h3>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
              </p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Learn More
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-lg py-8 px-10">
              <div className="mb-6">
                <Image src="/images/feature3.jpg" alt="Feature 3" width={150} height={150} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Feature 3</h3>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
              </p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturesSection
