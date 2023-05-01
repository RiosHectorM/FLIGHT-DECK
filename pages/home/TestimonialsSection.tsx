import Image from 'next/image'

const TestimonialsSection = () => {
  return (
    <div className="flex flex-col items-center justify-center my-16">
      <h2 className="text-4xl font-bold text-gray-200 mb-8">Testimonials</h2>
      <div className="flex flex-col md:flex-row items-center justify-center w-full space-y-8 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-1/3">
          <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8">
            <Image src="/images/testimonial1.png" alt="testimonial1" width={100} height={100} className="rounded-full mb-4" />
            <p className="text-lg text-gray-600 text-center">Esta aplicación de registro de horas de vuelo es increíblemente útil para llevar un seguimiento personalizado de mis horas de vuelo. Con la capacidad de conectarme con instructores y programar sesiones de capacitación en un abrir y cerrar de ojos, ¡me siento más seguro y confiado en mi habilidad para volar! También aprecio mucho la capacidad de generar un documento PDF de mis registros de horas de vuelo para presentarlo en cualquier entidad que lo requiera.</p>
            <h4 className="text-xl font-bold text-gray-800 mt-4">John Doe</h4>
            <p className="text-gray-600">PILOT.</p>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8">
            <Image src="/images/testimonial2.png" alt="testimonial2" width={100} height={100} className="rounded-full mb-4" />
            <p className="text-lg text-gray-600 text-center">Desde que empecé a usar esta aplicación de registro de horas de vuelo, ha sido un cambio radical en la forma en que gestiono las horas de vuelo de mis estudiantes. Ahora puedo validar sus horas de vuelo de forma rápida y eficiente, lo que me permite dedicar más tiempo a la enseñanza y menos tiempo a la burocracia. ¡Recomiendo encarecidamente esta aplicación a todos los instructores de vuelo!</p>
            <h4 className="text-xl font-bold text-gray-800 mt-4">Jane Doe</h4>
            <p className="text-gray-600">INSTRUCTOR.</p>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8">
            <Image src="/images/testimonial3.png" alt="testimonial3" width={100} height={100} className="rounded-full mb-4" />
            <p className="text-lg text-gray-600 text-center">Nuestra empresa ha utilizado esta aplicación de registro de horas de vuelo para optimizar la gestión de horas de vuelo de nuestros pilotos, y ha sido una herramienta invaluable. Ahora podemos aprobar las horas de vuelo de los pilotos de manera rápida y eficiente, y acceder a la base de datos de pilotos registrados para descargar un historial de horas de vuelo certificadas y no certificadas según sea necesario. ¡Esta aplicación ha mejorado significativamente la forma en que gestionamos las horas de vuelo de nuestros pilotos y la recomendamos altamente a otras empresas de aviación!</p>
            <h4 className="text-xl font-bold text-gray-800 mt-4">James Smith</h4>
            <p className="text-gray-600">CTO, Company Inc.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestimonialsSection
