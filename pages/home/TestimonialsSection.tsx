import Image from 'next/image'

const TestimonialsSection = () => {
  return (
    <div className="flex flex-col items-center justify-center my-16">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Testimonials</h2>
      <div className="flex flex-col md:flex-row items-center justify-center w-full space-y-8 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-1/3">
          <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8">
            <Image src="/images/testimonial1.png" alt="testimonial1" width={100} height={100} className="rounded-full mb-4" />
            <p className="text-lg text-gray-600 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae sapien non tellus accumsan blandit sit amet id justo.</p>
            <h4 className="text-xl font-bold text-gray-800 mt-4">John Doe</h4>
            <p className="text-gray-600">CEO, Company Inc.</p>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8">
            <Image src="/images/testimonial2.png" alt="testimonial2" width={100} height={100} className="rounded-full mb-4" />
            <p className="text-lg text-gray-600 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae sapien non tellus accumsan blandit sit amet id justo.</p>
            <h4 className="text-xl font-bold text-gray-800 mt-4">Jane Doe</h4>
            <p className="text-gray-600">Marketing Manager, Company Inc.</p>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8">
            <Image src="/images/testimonial3.png" alt="testimonial3" width={100} height={100} className="rounded-full mb-4" />
            <p className="text-lg text-gray-600 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae sapien non tellus accumsan blandit sit amet id justo.</p>
            <h4 className="text-xl font-bold text-gray-800 mt-4">James Smith</h4>
            <p className="text-gray-600">CTO, Company Inc.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestimonialsSection
