'use client';

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

type Integrante = {
    nombre: string;
    rol: string;
    image: string;
    github: string;
    linkedin: string
};

const integrantes: Integrante[] = [
    { nombre: "Luis Roca",
      rol: "Henry Mentor",
      image: "https://media.licdn.com/dms/image/D4E35AQFAcfkPHfpvHA/profile-framedphoto-shrink_200_200/0/1678131873780?e=1684206000&v=beta&t=zwiP3P51ot4JgLACK4WvEwAvdfLcq2EBIrj1cMnY1fc",
      github: "https://github.com/LuisRocca",
      linkedin: "https://www.linkedin.com/in/luis-miguel-alfonzo-roca-software-enginer/" 
    },
    { nombre: "Hector Rios",
      rol: "Project Manager", 
      image: "https://media.licdn.com/dms/image/D4D35AQGLmLJrw_gGzQ/profile-framedphoto-shrink_200_200/0/1662646665729?e=1684108800&v=beta&t=bht4F3iB9hV--tohRHaaz7NcfIsQhiwonrC2ZBY4_lA",
      github: "https://github.com/RiosHectorM",
      linkedin: "https://www.linkedin.com/in/rioshectormartin/"
    },
    { nombre: "Esteban Ramirez", 
      rol: "Frontend Developer", 
      image: "https://media.licdn.com/dms/image/D4E03AQEYlKm3F7RbuQ/profile-displayphoto-shrink_200_200/0/1683505683094?e=1689206400&v=beta&t=oc375UOXMQdArWrryuOkcEPHr--Kda-bXTTSL-vfNUs", 
      github: "https://github.com/esteban7712",
      linkedin: "https://www.linkedin.com/in/esteban7712/"
    },
    { nombre: "Martin Resnicoff", 
      rol: "Frontend Developer", 
      image: "https://media.licdn.com/dms/image/D4D35AQE432SnKtmJ8w/profile-framedphoto-shrink_200_200/0/1677156557692?e=1684108800&v=beta&t=T6tT9oftdCCZhKCkTaEiItknOmxzmDcjn_ccMkT-QNs", 
      github: "https://github.com/mresnicoff",
      linkedin: "https://www.linkedin.com/in/martinresnicoff/"
    },
    { nombre: "Diego Leon", 
      rol: "Frontend Developer", 
      image: "https://media.licdn.com/dms/image/D4D35AQHe-6-KOnIqJA/profile-framedphoto-shrink_200_200/0/1678240089759?e=1684198800&v=beta&t=bzxEZits89nD2NWOaN2_1y8jFUiimX0XDzTHy02cC2g",
      github: "https://github.com/DALGO0927",
      linkedin: "https://www.linkedin.com/in/diegoleon09/"
    },
    { nombre: "Samir Diaz", 
      rol: "Backend Developer", 
      image: "https://media.licdn.com/dms/image/D4E03AQHiiNsEj8-90Q/profile-displayphoto-shrink_200_200/0/1675523925928?e=1689206400&v=beta&t=2_ceOQTMWGKP8gsAlRDngmzMHo2Ti7ZdrXyAVt2BzrA",
      github: "https://github.com/SamirAlexander",
      linkedin: "https://www.linkedin.com/in/samiralexanderdiaz/"
    },
    { nombre: "Leonardo Alabart", 
      rol: "Backend Developer", 
      image: "https://media.licdn.com/dms/image/C4E03AQGkCvWol3snfw/profile-displayphoto-shrink_200_200/0/1647807298164?e=1689206400&v=beta&t=D_lhKfg7sMgxcJ3t0iCSs3QTi6m5Q0fJzstXkKfpSJE",
      github: "https://github.com/Leonbart",
      linkedin: "https://www.linkedin.com/in/leonardo-alabart-80067813/"
    },
    { nombre: "Gullit Moran", 
      rol: "Backend Developer", 
      image: "https://media.licdn.com/dms/image/D4E03AQHHEsf7qnoV3g/profile-displayphoto-shrink_200_200/0/1677531330933?e=1689206400&v=beta&t=yhdsycFXs69Ksk4rUwq5FJSG6zGfu6PrbV59uKM2PKA",
      github: "https://github.com/morangullit",
      linkedin: "https://www.linkedin.com/in/gullit-enrique-moran-escobar-731272a5"
    },

];

const About: React.FC = () => {
    return (
        <div className="mx-auto px-4 py-12 bg-cover bg-fixed bg-[url('/images/background-image2.jpg')]">
            <h1 className="text-7xl font-bold text-black-600 mb-20 text-center transform scale-90 md:scale-100">
                About Us
            </h1>
            <div className='text-4xl font-bold text-slate-900 mt-9 text-center'>
                {Array.from('FLIGHT DECK').map((char, index) => (
                    <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.2 + index * 0.1,
                            duration: 2,
                            repeat: Infinity,
                            repeatType: 'reverse',
                        }}
                    >
                        {char}
                    </motion.span>
                ))}
            </div>

            <div className="flex justify-center mt-24">
                <div className="w-1/2 p-8 text-lg bg-white text-black transform scaleY(-1) shadow-xl text-center rounded-md bg-opacity-60" >
                    <p className="
                        first-letter:text-7xl first-letter:font-bold first-letter:text-black
                        first-letter:mr-3 first-letter:float-left text-justify">
                        Our team has developed a Flight LogBook where pilots can have digital
                        and online support for their flight hours, whether certified
                        or not by an Instructor.
                        <br />
                        <br />
                        Pilots can be visible to registered companies and even become part of 
                        the staff of such companies, thus being able to obtain certification
                        of their hours without the need for an Instructor.
                    </p>
                </div>
            </div>

            <br>
            </br>
            <h1 className="flex justify-center text-5xl font-bold mt-24 text-slate-900 mb-6">
                Our Team
            </h1>

            <div className="grid grid-cols-3 gap-8">
                {integrantes.map((integrante) => (
                    <div key={integrante.nombre} className="bg-white shadow-xl rounded-lg p-6 text-center bg-opacity-60">
                        <img src={integrante.image} alt={integrante.nombre} className="mx-auto shadow-xl rounded-full mb-4" />
                        <h2 className="text-2xl font-bold text-black-800 mb-2">{integrante.nombre}</h2>
                        <p className="text-lg text-gray-800">{integrante.rol}</p>
                        <div className="flex justify-center mt-4">
                            <a href={integrante.github} target="_blank" rel="noopener noreferrer" className="mr-4">
                                <FontAwesomeIcon icon={faGithub} size="2x" />
                            </a>
                            <a href={integrante.linkedin} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faLinkedin} size="2x" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )

};

export default About;