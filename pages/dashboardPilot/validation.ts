interface FormData {
    name: string;
    email: string;
    address: string;
    phoneNumber: string;
    country: string;
    city: string;
    nationality: string;
    password: string;
    photo: File;
    pdf: File;
  }
  
  const validateName = (name: string): string | undefined => {
    if (!/^[a-zA-Z]{3,50}$/.test(name)) {
      return 'El nombre no puede contener números y debe estar entre 3 y 50 caracteres';
    }
    return undefined;
  };
  
  const validateEmail = (email: string): string | undefined => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return 'Debe ingresar un correo válido';
    }
    return undefined;
  };
  
  const validateAddress = (address: string): string | undefined => {
    if (address.length > 50) {
      return 'La dirección no puede tener más de 50 caracteres';
    }
    return undefined;
  };
  
  const validatePhoneNumber = (phoneNumber: string): string | undefined => {
    if (!/^\S{1,15}$/.test(phoneNumber)) {
      return 'Debe ingresar un número de teléfono válido';
    }
    return undefined;
  };
  
  const validateCountry = (country: string): string | undefined => {
    const countries = ['USA', 'UK', 'Spain']; // Add more valid countries as needed
    if (!countries.includes(country)) {
      return 'Debe ingresar un país válido';
    }
    return undefined;
  };
  
  const validateCity = (city: string): string | undefined => {
    const cities = ['New York', 'London', 'Madrid']; // Add more valid cities as needed
    if (!cities.includes(city)) {
      return 'Debe ingresar una ciudad válida';
    }
    return undefined;
  };
  
  const validateNationality = (nationality: string): string | undefined => {
    const validNationalities = ['USA', 'UK', 'Spain']; // Add more valid nationalities as needed
    if (!validNationalities.includes(nationality)) {
      return 'Debe ingresar una nacionalidad válida';
    }
    return undefined;
  };
  
  const validatePassword = (password: string): string | undefined => {
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/.test(password)) {
      return 'La contraseña debe tener entre 6 y 20 caracteres y contener al menos una letra mayúscula, una letra minúscula y un número';
    }
    return undefined;
  };
  
  const validatePhoto = (photo: File): string | undefined => {
    // Check that the photo file is not larger than 5 MB and is an image (JPG, PNG, GIF)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (photo.size > 5 * 1024 * 1024) {
      return 'La foto no debe tener un tamaño superior a 5 MB';
    }
    if (!allowedTypes.includes(photo.type)) {
      return 'La foto debe ser en formato JPG, PNG o GIF';
    }
    return undefined;
  };
  
  const validatePDF = (pdf: File): string | undefined => {
    // Check that the PDF file is not larger than 10 MB and is a PDF file
    if (pdf.size > 10 * 1024 * 1024) {
      return 'El archivo PDF no debe tener un tamaño superior a 10 MB';
    }
    if (pdf.type !== 'application/pdf') {
      return 'El archivo debe ser en formato PDF';
    }
    return undefined;
  };
  
  const validateFormData = async (formData: FormData): Promise<Record<keyof FormData, string>> => {
    const errors: Record<keyof FormData, string> = {
        name: "",
        email: "",
        address: "",
        phoneNumber: "",
        country: "",
        city: "",
        nationality: "",
        password: "",
        photo: "",
        pdf: ""
    };
  
    const nameError = validateName(formData.name);
    if (nameError) {
      errors.name = nameError;
    }
  
    const emailError = validateEmail(formData.email);
    if (emailError) {
      errors.email = emailError;
    }
  
    const addressError = validateAddress(formData.address);
    if (addressError) {
      errors.address = addressError;
    }
  
    const phoneNumberError = validatePhoneNumber(formData.phoneNumber);
    if (phoneNumberError) {
      errors.phoneNumber = phoneNumberError;
    }
  
    const countryError = validateCountry(formData.country);
    if (countryError) {
      errors.country = countryError;
    }
  
    const cityError = validateCity(formData.city);
    if (cityError) {
      errors.city = cityError;
    }
  
    const nationalityError = validateNationality(formData.nationality);
    if (nationalityError) {
      errors.nationality = nationalityError;
    }
  
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      errors.password = passwordError;
    }
  
    const photoError = await validatePhoto(formData.photo);
    if (photoError) {
      errors.photo = photoError;
    }
  
    const pdfError = await validatePDF(formData.pdf);
    if (pdfError) {
      errors.pdf = pdfError;
    }
  
    return errors;
  };
  
  export default validateFormData;