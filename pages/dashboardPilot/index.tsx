import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import validateFormData from './validation';
import { patchFetch } from 'next/dist/server/lib/patch-fetch';

const Dashboard = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [pdfFile, setPdfFile] = useState<File | null>(null);


    const onSubmit = (data: any) => {
        // Aquí se enviarían los datos del formulario a la API para actualizar el perfil del usuario
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setProfileImage(files[0]);
        }
    };

    const onPdfFileUpload = (acceptedFiles: any) => {
        setPdfFile(acceptedFiles[0]);
    };

    const handleDragOver = (event: any) => {
        event.preventDefault();
    };

    const handleDrop = (event: any) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setProfileImage(file);
    };


    const uploadProfileImage = async () => {
        const formData = new FormData();
        const image = profileImage || '';
        formData.append('image', image);

        try {
            const response = await axios.post('/api/uploadProfileImage', formData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const uploadPdfFile = async () => {
        const formData = new FormData();
        const pdf = pdfFile || '';
        formData.append('pdf', pdf);

        try {
            const response = await axios.post('/api/uploadPdfFile', formData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold mb-10">Actualizar perfil de Piloto</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-bold mb-6">Datos del Usuario:</h2>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="firstName">
                            Nombre
                        </label>
                        <input {...register("firstName", { required: true, pattern: /^[a-zA-Z ]*$/, maxLength: 50 })} type="text" className="border-gray-400 border-2 p-2 w-full" />
                        {errors.firstName && errors.firstName.type === "required" && <span className="text-red-500">Este campo es requerido</span>}
                        {errors.firstName && errors.firstName.type === "pattern" && <span className="text-red-500">No se permiten números en este campo</span>}
                        {errors.firstName && errors.firstName.type === "maxLength" && <span className="text-red-500">Este campo no puede tener más de 50 caracteres</span>}

                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="lastName">
                            Apellido
                        </label>
                        <input {...register("lastName", { required: true, pattern: /^[a-zA-Z ]*$/, maxLength: 50 })} type="text" className="border-gray-400 border-2 p-2 w-full" />
                        {errors.firstName && errors.firstName.type === "required" && <span className="text-red-500">Este campo es requerido</span>}
                        {errors.firstName && errors.firstName.type === "pattern" && <span className="text-red-500">No se permiten números en este campo</span>}
                        {errors.firstName && errors.firstName.type === "maxLength" && <span className="text-red-500">Este campo no puede tener más de 50 caracteres</span>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="address">
                            Dirección
                        </label>
                        <input {...register("address", { required: true, maxLength: 50 })} type="text" className="border-gray-400 border-2 p-2 w-full" />
                        {errors.address?.type === "required" && <span className="text-red-500">Este campo es requerido</span>}
                        {errors.address?.type === "maxLength" && <span className="text-red-500">El campo no puede tener más de 50 caracteres</span>}

                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                            Correo electrónico
                        </label>
                        <input {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} type="email" className="border-gray-400 border-2 p-2 w-full" />
                        {errors.email && <span className="text-red-500">Este campo es requerido</span>}
                        {errors.email && <span className="text-red-500">Ingrese un correo electrónico válido</span>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="phoneNumber">
                            Teléfono
                        </label>
                        <input {...register("phoneNumber", { required: true, pattern: /^[0-9]+$/, maxLength: 10 })} type="tel" className="border-gray-400 border-2 p-2 w-full" />
                        {errors.phoneNumber && errors.phoneNumber.type === "required" && <span className="text-red-500">Este campo es requerido</span>}
                        {errors.phoneNumber && errors.phoneNumber.type === "pattern" && <span className="text-red-500">Este campo solo debe contener números</span>}
                        {errors.phoneNumber && errors.phoneNumber.type === "maxLength" && <span className="text-red-500">Este campo no debe exceder los 10 caracteres</span>}

                    </div>
                    <div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Guardar cambios
                        </button>
                    </div>
                </div>
            </form>

            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-bold mb-6">Datos de Nacionalidad:</h2>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="country">
                            País
                        </label>
                        <input {...register("country", {
                            required: true,
                            maxLength: 20,
                            pattern: /^[a-zA-Z\s]+$/
                        })} type="text" className="border-gray-400 border-2 p-2 w-full" />
                        {errors.country?.type === "required" && <span className="text-red-500">Este campo es requerido</span>}
                        {errors.country?.type === "maxLength" && <span className="text-red-500">El país no puede tener más de 20 caracteres</span>}
                        {errors.country?.type === "pattern" && <span className="text-red-500">El país solo puede contener letras</span>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="city">
                            Ciudad
                        </label>
                        <input {...register("city", {
                            required: true,
                            maxLength: 20,
                            pattern: /^[a-zA-Z\s]+$/
                        })}
                            type="text" className="border-gray-400 border-2 p-2 w-full" />
                        {errors.city?.type === "required" && <span className="text-red-500">Este campo es requerido</span>}
                        {errors.city?.type === "maxLength" && <span className="text-red-500">La ciudad no puede tener más de 20 caracteres</span>}
                        {errors.city?.type === "pattern" && <span className="text-red-500">La ciudad solo puede contener letras</span>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="nationality">
                            Nacionalidad
                        </label>
                        <input {...register("nationality", {
                            required: true,
                            maxLength: 20,
                            pattern: /^[a-zA-Z\s]+$/
                        })}
                            type="text" className="border-gray-400 border-2 p-2 w-full" />
                        {errors.nationality?.type === "required" && <span className="text-red-500">Este campo es requerido</span>}
                        {errors.nationality?.type === "maxLength" && <span className="text-red-500">La nacionalidad no puede tener más de 20 caracteres</span>}
                        {errors.nationality?.type === "pattern" && <span className="text-red-500">La nacionalidad solo puede contener letras</span>}
                    </div>
                    <div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Guardar cambios
                        </button>
                    </div>
                </div>
            </form>

            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-bold mb-6">Actualizar contraseña:</h2>
                    <br />
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                            Contraseña actual
                        </label>
                        <input {...register("password", { required: true })} type="password" className="border-gray-400 border-2 p-2 w-full" />
                        {errors.password && <span className="text-red-500">Este campo es requerido</span>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="currentPassword">
                            Nueva Contraseña
                        </label>
                        <input {...register("currentPassword", { required: true })} type="password" className="border-gray-400 border-2 p-2 w-full" />
                        {errors.currentPassword && <span className="text-red-500">Este campo es requerido</span>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="confirmPassword">
                            Confirmar contraseña
                        </label>
                        <input {...register("confirmPassword", { required: true })} type="password" className="border-gray-400 border-2 p-2 w-full" />
                        {errors.confirmPassword && <span className="text-red-500">Este campo es requerido</span>}
                    </div>

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Guardar cambios
                    </button>
                </div>
            </form>

            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200" onDrop={handleDrop} onDragOver={handleDragOver}>
                    <div className="mt-1">
                        <h2 className="text-2xl font-bold mb-6">Actualizar foto de perfil</h2>
                        <div className="mb-6">
                            {profileImage ? (
                                <>
                                    <img src={URL.createObjectURL(profileImage)} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
                                    <button onClick={() => setProfileImage(null)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                        Eliminar imagen
                                    </button>
                                </>
                            ) : (
                                <>
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="profileImage">
                                        Seleccione una imagen o arrástrela aquí
                                    </label>
                                    <input type="file" accept="image/*" onChange={handleImageChange} onDrop={handleDrop} onDragOver={handleDragOver} />
                                </>
                            )}
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Actualizar foto de perfil
                        </button>
                    </div>
                </div>
            </form>

            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                    <div className="mt-1">
                        <h2 className="text-2xl font-bold mb-6">Subir archivos PDF</h2>

                        <div className="mb-6">
                            {pdfFile ? (
                                <>
                                    <p className="text-gray-700">{pdfFile.name}</p>
                                    <button onClick={() => setPdfFile(null)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                        Eliminar archivo
                                    </button>
                                </>
                            ) : (
                                <>
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="pdfFile">
                                        Seleccione un archivo PDF
                                    </label>
                                    <input type="file" accept="application/pdf" onChange={(e) => {
                                        const file = e.target.files && e.target.files[0];
                                        if (file) {
                                            if (file.type !== 'application/pdf') {
                                                alert('Por favor, seleccione un archivo PDF.');
                                                return;
                                            }
                                            if (file.size > 10 * 1024 * 1024) {
                                                alert('El archivo seleccionado es demasiado grande. Por favor, seleccione un archivo más pequeño.');
                                                return;
                                            }
                                            setPdfFile(file);
                                        }
                                    }} />
                                </>
                            )}
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Subir archivo PDF
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Dashboard;
