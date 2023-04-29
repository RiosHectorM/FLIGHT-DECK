'use client';

import React from "react";

type Integrante = {
    nombre: string;
    rol: string;
};

const integrantes: Integrante[] = [
    { nombre: "Luis Roca", rol: "Henry Mentor" },
    { nombre: "Hector Rios", rol: "Project Manager" },
    { nombre: "Esteban Ramirez", rol: "Desarrollador Frontend" },
    { nombre: "Martin Resnicoff", rol: "Desarrollador Frontend" },
    { nombre: "Diego Leon", rol: "Desarrollador Frontend" },
    { nombre: "Samir Diaz", rol: "Desarrollador Backend" },
    { nombre: "Leonardo Alabart", rol: "Desarrollador Backend" },
    { nombre: "Gullit Moran", rol: "Desarrollador Backend" },
    
];

const About: React.FC = () => {
    return (
        <div className="mx-auto px-4 py-12 bg-cover bg-fixed bg-[url('/images/Plane.jpg')]">
            <h1 className="text-7xl font-bold text-blue-600 mb-6 text-center">
                About Us
            </h1>
            <p className="text-lg text-black-700 text-center mb-12">
                Somos un equipo de apasionados por el desarrollo web.
            </p>
            <h1 className="flex justify-center text-5xl font-bold mt-24 text-blue-600 mb-6">
                FLIGHT DECK
            </h1>
            <div className="flex justify-center items-center mt-24">
                <div className="w-1/2 p-8 bg-white shadow-md text-center rounded-md ">
                    <p className="text-black-700">
                        Nuestro equipo ha desarrollado una Bitacora de Vuelo (LogBook)
                        donde los pilotos pueden tener un soporte digital y online
                        de sus horas de vuelo ya sean certificadas o no por un Instructor.
                        <br></br>
                        Los Pilotos podran ser visibles para las Empresas registradas e incluso
                        podran formar parte del staff de dichas Empresas y de esa forma poder
                        obtener la certificacion de sus horas sin necesidad de un Instructor.
                    </p>
                </div>
                
            </div>

            <br>
            </br>
            <h1 className="flex justify-center text-5xl font-bold mt-24 text-blue-600 mb-6">
                Our Team
            </h1>

            <ul>
                {integrantes.map((integrante) => (
                    <li
                        key={integrante.nombre}
                        className=" shadow rounded-lg p-6 mb-6 text-center"
                    >
                        <h2 className="text-2xl font-bold text-white mb-2">
                            {integrante.nombre}
                        </h2>
                        <p className="text-lg text-black-700">{integrante.rol}</p>
                    </li>
                ))}
            </ul> 
        </div>
    )
        
};

export default About;