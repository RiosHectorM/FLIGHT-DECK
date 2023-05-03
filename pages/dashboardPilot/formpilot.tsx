import { useState } from 'react';
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validateAddress,
  validatePhoneNumber,
  validateCountry,
  validateCity,
  validateNationality
} from './validation';

export const FormPilot = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
    country: "",
    city: "",
    nationality: "",
  });
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isCountryValid, setIsCountryValid] = useState(true);
  const [isCityValid, setIsCityValid] = useState(true);
  const [isNationlityValid, setIsNationalityValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);


  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent page from refreshing

    // TODO: validate form data and submit it to the server
    // use formData object to send form data to the server
    const { firstName, lastName, address, phoneNumber, country, city, nationality, email } = formData;

    const firstNameValidation = validateFirstName(firstName);
    if (!firstNameValidation.isValid) {
      alert(firstNameValidation.errorMessage);
      return;
    }
    const lastNameValidation = validateLastName(lastName);
    if (!lastNameValidation.isValid) {
      alert(lastNameValidation.errorMessage);
      return;
    }
    const addressValidation = validateAddress(address);
    if (!addressValidation.isValid) {
      alert(addressValidation.errorMessage);
      return;
    }
    const phoneValidation = validatePhoneNumber(phoneNumber);
    if (!phoneValidation.isValid) {
      alert(phoneValidation.errorMessage);
      return;
    }
    const countryValidation = validateCountry(country);
    if (!countryValidation.isValid) {
      alert(countryValidation.errorMessage);
      return;
    }
    const cityValidation = validateCity(city);
    if (!cityValidation.isValid) {
      alert(cityValidation.errorMessage);
      return;
    }
    const nationalityValidation = validateNationality(nationality);
    if (!nationalityValidation.isValid) {
      alert(nationalityValidation.errorMessage);
      return;
    }
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      alert(emailValidation.errorMessage);
      return;
    }

    console.log(formData);


    // clear form fields on successful submission
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      phoneNumber: "",
      country: "",
      city: "",
      nationality: "",
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'firstName') {
      setIsFirstNameValid(validateFirstName(value).isValid);
    }
    if (name === 'lastName') {
      setIsLastNameValid(validateLastName(value).isValid);
    }
    if (name === 'email') {
      setIsEmailValid(validateEmail(value).isValid);
    }
    if (name === 'address') {
      setIsAddressValid(validateAddress(value).isValid);
    }
    if (name === 'phoneNumber') {
      setIsPhoneValid(validatePhoneNumber(value).isValid);
    }
    if (name === 'country') {
      setIsCountryValid(validateCountry(value).isValid);
    }
    if (name === 'city') {
      setIsCityValid(validateCity(value).isValid);
    }
    if (name === 'nationality') {
      setIsNationalityValid(validateNationality(value).isValid);
    }


    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-sm lg:max-w-full lg:flex w-full">
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
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${!isFirstNameValid ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                {!isFirstNameValid && <p className="text-red-500 text-sm mt-1">{validateFirstName(formData.firstName).errorMessage}</p>}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${!isLastNameValid ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                {!isLastNameValid && <p className="text-red-500 text-sm mt-1">{validateLastName(formData.lastName).errorMessage}</p>}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${!isEmailValid ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {!isEmailValid && <p className="text-red-500 text-sm mt-1">{validateEmail(formData.email).errorMessage}</p>}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${!isAddressValid ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="address"
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                {!isAddressValid && <p className="text-red-500 text-sm mt-1">{validateAddress(formData.address).errorMessage}</p>}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="phoneNumber"
                >
                  Phone number
                </label>
                <input
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${!isPhoneValid ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
                {!isPhoneValid && <p className="text-red-500 text-sm mt-1">{validatePhoneNumber(formData.phoneNumber).errorMessage}</p>}
              </div>
              <div className="w-full md:w-1/2 px-3 ">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="country"
                >
                  Country
                </label>
                <input
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${!isCountryValid ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="country"
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
                {!isCountryValid && <p className="text-red-500 text-sm mt-1">{validateCountry(formData.country).errorMessage}</p>}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2 px-3 ">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${!isCityValid ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="city"
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                />
                {!isCityValid && <p className="text-red-500 text-sm mt-1">{validateCity(formData.city).errorMessage}</p>}
              </div>
              <div className="w-full md:w-1/2 px-3 ">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="nationality"
                >
                  Nationality
                </label>
                <input
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${!isNationlityValid ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="nationality"
                  type="text"
                  name="nationality"
                  placeholder="Nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                />
                {!isNationlityValid && <p className="text-red-500 text-sm mt-1">{validateNationality(formData.nationality).errorMessage}</p>}
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
