import axios from 'axios';
import { useState } from 'react';

export const FormPassword = (props: { className: string }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOldPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleUpdatePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent page from refreshing


    // TODO: validate form data and submit it to the server

    if (newPassword !== confirmPassword) {
      // mostrar un mensaje de error si las contraseñas no coinciden
      alert("Las contraseñas no coinciden.");
      return;
    }

    // enviar la solicitud POST a la API del servidor
    try {
      const response = await axios.post('/api/updatepassword', {
        oldPassword,
        newPassword,
        confirmPassword,
      });

      if (response.status === 200) {
        // mostrar un mensaje de éxito si la contraseña se actualiza correctamente
        alert("La contraseña se ha actualizado correctamente.");
      } else {
        // mostrar un mensaje de error si la actualización de la contraseña falla
        alert("No se pudo actualizar la contraseña. Por favor, intente de nuevo.");
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al actualizar la contraseña. Por favor, intente de nuevo.");
    }

    // limpiar los campos del formulario
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className={`w-full lg:flex h-full justify-center aling-middle ${props.className}`}>
      <div className="border border-gray-400 lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-0">
          <div className="text-gray-900 font-bold text-xl mb-5">Update Password</div>
          <form className="w-full" onSubmit={handleUpdatePassword}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="oldPassword">
                  Old Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="oldPassword"
                  type="password"
                  placeholder="**********"
                  value={oldPassword}
                  onChange={handleOldPasswordChange}
                />
              </div>
              <div className="w-full px-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                  New Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="newPassword"
                  type="password"
                  placeholder="**********"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
                <p className={`text-red-500 text-xs italic ${newPassword !== '' && (confirmPassword !== '' || newPassword === confirmPassword) ? 'hidden' : ''}`}>
                  Please choose a password.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full px-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${confirmPassword && newPassword !== confirmPassword ? 'border-red-500' : ''
                    }`}
                  id="confirmPassword"
                  type="password"
                  placeholder="**********"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-red-500 text-xs italic">Passwords do not match.</p>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 flex justify-between items-center mt-8">
              <div className="flex space-x-4">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded" type="submit">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
