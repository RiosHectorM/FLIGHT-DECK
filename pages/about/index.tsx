'use client';

import { motion } from "framer-motion";
import React from "react";

type Integrante = {
    nombre: string;
    rol: string;
    image: string;
};

const integrantes: Integrante[] = [
    { nombre: "Luis Roca", rol: "Henry Mentor", image: "https://i.pravatar.cc/150?img=8" },
    { nombre: "Hector Rios", rol: "Project Manager", image: "https://i.pravatar.cc/150?img=11" },
    { nombre: "Esteban Ramirez", rol: "Desarrollador Frontend", image: "https://i.pravatar.cc/150?img=14" },
    { nombre: "Martin Resnicoff", rol: "Desarrollador Frontend", image: "https://i.pravatar.cc/150?img=52" },
    { nombre: "Diego Leon", rol: "Desarrollador Frontend", image: "https://i.pravatar.cc/150?img=3" },
    { nombre: "Samir Diaz", rol: "Desarrollador Backend", image: "https://i.pravatar.cc/150?img=59" },
    { nombre: "Leonardo Alabart", rol: "Desarrollador Backend", image: "https://i.pravatar.cc/150?img=18" },
    { nombre: "Gullit Moran", rol: "Desarrollador Backend", image: "https://i.pravatar.cc/150?img=13" },

];

const About: React.FC = () => {
    return (
        <div className="mx-auto px-4 py-12 bg-cover bg-fixed bg-[url('/images/background-image.jpg')]">
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
                <div className="w-1/2 p-8 bg-gray-900 text-white transform scaleY(-1) shadow-xl text-center rounded-md" style={{opacity: 0.9}}>
                    <p className="first-line:uppercase first-line:tracking-widest
                        first-letter:text-7xl first-letter:font-bold first-letter:text-white
                        first-letter:mr-3 first-letter:float-left text-justify">
                        Nuestro equipo ha desarrollado una Bitacora de Vuelo (LogBook)
                        donde los pilotos pueden tener un soporte digital y online
                        de sus horas de vuelo ya sean certificadas o no por un Instructor.
                        <br />
                        <br />
                        Los Pilotos podran ser visibles para las Empresas registradas e incluso
                        podran formar parte del staff de dichas Empresas y de esa forma poder
                        obtener la certificacion de sus horas sin necesidad de un Instructor.
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
                    <div key={integrante.nombre} className="bg-white shadow-md rounded-lg p-6 text-center">
                        <img src={integrante.image} alt={integrante.nombre} className="mx-auto rounded-full mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{integrante.nombre}</h2>
                        <p className="text-lg text-gray-600">{integrante.rol}</p>
                    </div>
                ))}
            </div>
        </div>
    )

};

export default About;