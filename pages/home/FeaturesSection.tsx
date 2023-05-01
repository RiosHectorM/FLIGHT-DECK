import Image from 'next/image';
import { motion } from 'framer-motion';

const FeaturesSection = () => {
  const cardVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.5 } },
  };

  return (
    <div className="bg-transparent py-24">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Our <span className="text-red-500">features</span>
          </h2>
        </div>
        <div className="flex flex-wrap -mx-4">
          <motion.div
            className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8"
            variants={cardVariants}
            initial="initial"
            animate="animate"
          >
            <div className="bg-white rounded-lg shadow-lg py-8 px-10 hover:shadow-2xl transition-shadow duration-300">
              <div className="mb-6">
                <Image src="/images/feature1.jpg" alt="Feature 1" width={150} height={150} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">LogBook</h3>
              <p className="text-gray-600 mb-4">
                ¡Gestiona tus horas de vuelo de forma eficiente! Registra tus horas de vuelo, busca instructores, puntúa
                sus servicios y solicita certificaciones. ¡Genera un documento PDF con tus registros de horas al
                instante! Descarga nuestra aplicación hoy.
              </p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Learn More
              </button>
            </div>
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8"
            variants={cardVariants}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.4, duration: 0.5 } }}
          >
            <div className="bg-white rounded-lg shadow-lg py-8 px-10 hover:shadow-2xl transition-shadow duration-300">
              <div className="mb-6">
                <Image src="/images/feature2.jpg" alt="Feature 2" width={150} height={150} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Register as an instructor today</h3>
              <p className="text-gray-600 mb-4">
                Verifica tus horas de vuelo con la veracidad de tus instructores, y comunícate con ellos directamente.
                Accede a estadísticas de tus capacitaciones diarias, semanales o mensuales con nuestra aplicación de
                registro de horas de vuelo. Perfecciona tus habilidades de vuelo y conviértete en el mejor piloto que
                puedas ser. ¡Descarga nuestra aplicación hoy mismo y despega          hacia el éxito!
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Learn More
          </button>
        </div>
      </motion.div>
      <motion.div
        className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8"
        variants={cardVariants}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.6, duration: 0.5 } }}
      >
        <div className="bg-white rounded-lg shadow-lg py-8 px-10 hover:shadow-2xl transition-shadow duration-300">
          <div className="mb-6">
            <Image src="/images/feature3.jpg" alt="Feature 3" width={150} height={150} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">For companies</h3>
          <p className="text-gray-600 mb-4">
            Optimiza la gestión de horas de vuelo de tus pilotos con nuestra aplicación de registro de horas de vuelo
            para empresas. Aprueba las horas de vuelo de los pilotos y accede a la base de datos de pilotos
            registrados para descargar un historial de horas de vuelo certificadas y no certificadas. Descarga nuestra
            aplicación de registro de horas de vuelo para empresas hoy mismo y lleva la gestión de tus pilotos al
            siguiente nivel.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Learn More
          </button>
        </div>
      </motion.div>
    </div>
  </div>
</div>
);
};

export default FeaturesSection;
