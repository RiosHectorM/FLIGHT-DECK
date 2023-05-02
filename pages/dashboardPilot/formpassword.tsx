import { useState } from 'react';

export const FormPassword = (props: { className: string }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent page from refreshing
    

    // TODO: validate form data and submit it to the server

    // clear form fields on successful submission
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className={`w-full lg:flex h-full justify-center aling-middle ${props.className}`}>
      <div className="border border-gray-400 lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-0">
          <div className="text-gray-900 font-bold text-xl mb-5">Actualizar Contraseña</div>
          <form className="w-full" onSubmit={handleFormSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="old-password">
                  Old Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="old-password"
                  type="password"
                  placeholder="******************"
                  value={oldPassword}
                  onChange={(event) => setOldPassword(event.target.value)}
                />
              </div>
              <div className="w-full px-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new-password">
                  New Password
                </label>
                <input
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="new-password"
                  type="password"
                  placeholder="******************"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                />
                <p className="text-red-500 text-xs italic">Please choose a password.</p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full px-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                  Confirm Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="confirm-password"
                  type="password"
                  placeholder="******************"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
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
