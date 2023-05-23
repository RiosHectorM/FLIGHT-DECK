import { FieldErrors } from 'react-hook-form';

type ValidationRules = {
  required?: string;
  maxLength?: { value: number; message: string };
  minLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
};

export const validateField = (
  fieldName: string,
  value: string,
  rules: ValidationRules,
  errors: FieldErrors<any>
): void => {
  if (rules.required && !value) {
    errors[fieldName] = {
      type: 'required',
      message: rules.required,
    };
  }

  if (rules.maxLength && value.length > rules.maxLength.value) {
    errors[fieldName] = {
      type: 'maxLength',
      message: rules.maxLength.message,
    };
  }

  if (rules.minLength && value.length < rules.minLength.value) {
    errors[fieldName] = {
      type: 'minLength',
      message: rules.minLength.message,
    };
  }

  if (rules.pattern && !rules.pattern.value.test(value)) {
    errors[fieldName] = {
      type: 'pattern',
      message: rules.pattern.message,
    };
  }
};
