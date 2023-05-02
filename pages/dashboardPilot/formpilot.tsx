import { useState } from 'react';

export const FormPilot = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    country: "",
    city: "",
    nationality: "",
  });

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent page from refreshing

    // TODO: validate form data and submit it to the server
    // use formData object to send form data to the server
    console.log(formData);

    // clear form fields on successful submission
    setFormData({
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      country: "",
      city: "",
      nationality: "",
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="max-w-sm w-screen lg:max-w-full lg:flex w-full">
      <div className="border border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <p className="text-sm text-gray-600 flex items-center">
            <svg
              className="fill-current text-gray-500 w-3 h-3 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
            </svg>
            Members only
          </p>
          <div className="text-gray-900 font-bold text-xl mb-2">Informacion Personal</div>
          <form className="w-full px-3 mb-6 md:mb-0" onSubmit={handleFormSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="address"
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="phoneNumber"
                >
                  Phone number
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="country"
                >
                  Country
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="country"
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="city"
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="nationality"
                >
                  Nationality
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="nationality"
                  type="text"
                  name="nationality"
                  placeholder="Nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 flex justify-between items-center mt-4">
              <div className="flex space-x-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Edit
                </button>
                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
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
