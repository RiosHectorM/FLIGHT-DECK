
export const validateName = (Name: string): { isValid: boolean, errorMessage?: string } => {
    if (!Name) {
      return { isValid: false, errorMessage: 'First Name is required' };
    }
  
    if (Name.length > 50) {
      return { isValid: false, errorMessage: 'First Name should be at most 50 characters long' };
    }
  
    if (!/^[a-zA-Z]+$/.test(Name)) {
      return { isValid: false, errorMessage: 'First Name should only contain letters' };
    }
  
    return { isValid: true };
  };


export const validateLastName = (lastName: string): { isValid: boolean, errorMessage?: string } => {
  if (!lastName) {
    return { isValid: false, errorMessage: 'Last Name is required' };
  }

  if (lastName.length > 50) {
    return { isValid: false, errorMessage: 'Last Name should be at most 50 characters long' };
  }

  if (!/^[a-zA-Z\s]+$/.test(lastName)) {
    return { isValid: false, errorMessage: 'Last Name should only contain letters and spaces' };
  }

  return { isValid: true };
}

export const validateEmail = (email: string): { isValid: boolean, errorMessage?: string } => {
  if (!email) {
    return { isValid: false, errorMessage: 'Email is required' };
  }

  if (email.length > 50) {
    return { isValid: false, errorMessage: 'Email should be at most 50 characters long' };
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return { isValid: false, errorMessage: 'Email is not valid' };
  }

  return { isValid: true };
};



export const validateAddress = (address: string): { isValid: boolean, errorMessage?: string } => {
    if (address.length > 60) {
    return { isValid: false, errorMessage: 'Address should be at most 60 characters long' };
  }
  return { isValid: true };
}

export const validatePhoneNumber = (phoneNumber: string): { isValid: boolean, errorMessage?: string } => {
    const phoneRegex = /^\+?[0-9]+$/;
    if (!phoneRegex.test(phoneNumber)) {
      return { isValid: false, errorMessage: 'Phone number should only contain digits and the "+" character' };
    }
    if (phoneNumber.length > 15) {
      return { isValid: false, errorMessage: 'Phone number should not exceed 12 characters' };
    }
    return { isValid: true };
  };

  export const validateCountry = (country: string): { isValid: boolean, errorMessage?: string } => {
    if (!country) {
      return { isValid: false, errorMessage: 'First Name is required' };
    }
  
    if (country.length > 50) {
      return { isValid: false, errorMessage: 'First Name should be at most 50 characters long' };
    }
  
    if (!/^[a-zA-Z]+$/.test(country)) {
      return { isValid: false, errorMessage: 'First Name should only contain letters' };
    }
  
    return { isValid: true };
  };

  export const validateCity = (city: string): { isValid: boolean, errorMessage?: string } => {
    if (!city) {
      return { isValid: false, errorMessage: 'First Name is required' };
    }
  
    if (city.length > 50) {
      return { isValid: false, errorMessage: 'First Name should be at most 50 characters long' };
    }
  
    if (!/^[a-zA-Z]+$/.test(city)) {
      return { isValid: false, errorMessage: 'First Name should only contain letters' };
    }
  
    return { isValid: true };
  };

  export const validateNationality = (nationality: string): { isValid: boolean, errorMessage?: string } => {
    if (!nationality) {
      return { isValid: false, errorMessage: 'First Name is required' };
    }
  
    if (nationality.length > 20) {
      return { isValid: false, errorMessage: 'First Name should be at most 50 characters long' };
    }
  
    if (!/^[a-zA-Z]+$/.test(nationality)) {
      return { isValid: false, errorMessage: 'First Name should only contain letters' };
    }
  
    return { isValid: true };
  };
  
  


