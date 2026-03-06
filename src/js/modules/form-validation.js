import { handleFormSubmit } from './form-submit.js';
import { PHONE_REGEX } from '../constants.js';

export function initFormValidation() {
  const form = document.querySelector('#register-form');

  if (!form) {
    return;
  }

  const email = form.elements.email;
  const phone = form.elements.phone;
  const password = form.elements.password;
  const isAdult = form.elements.isAdult;

  const fieldInputs = [email, phone, password];

  const setErrorVisibility = (input, isValid) => {
    const field = input.closest('.field');
    const error = field?.querySelector('.field__error');

    if (!field) {
      return;
    }

    field.classList.toggle('field--invalid', !isValid);

    if (error) {
      error.classList.toggle('shown', !isValid);
    }
  };

  const setAgeErrorVisibility = (isValid) => {
    const check = form.querySelector('.check');
    const ageError = form.querySelector('.check .field__error');

    if (!ageError) {
      return;
    }
    check.classList.toggle('check--invalid', !isValid);
    ageError.classList.toggle('shown', !isValid);
  };

  const updatePasswordRequirement = () => {
    const isValid = password.value.trim().length >= 6;
    const field = password.closest('.field');
    const reqElement = field?.querySelector('.password-requirements');
    
    if (reqElement) {
      reqElement.classList.toggle('valid', isValid);
    }
  };

  password.addEventListener('input', updatePasswordRequirement);

  const validateInput = (input) => {
    let isValid = false;

    if (input === email) {
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    }

    if (input === phone) {
      // Check if phone matches the mask pattern defined in constants.js
      isValid = PHONE_REGEX.test(phone.value.trim());
    }

    if (input === password) {
      isValid = password.value.trim().length >= 6; // Updated to match HTML minlength=6
    }

    setErrorVisibility(input, isValid);
    return isValid;
  };

  const validateForm = () => {
    const fieldValidity = fieldInputs.map((input) => validateInput(input));

    const areFieldsValid = fieldValidity.every(Boolean);
    const isAgeValid = isAdult.checked;

    setAgeErrorVisibility(isAgeValid);

    return areFieldsValid && isAgeValid;
  };

  fieldInputs.forEach((input) => {
    input.addEventListener('blur', () => {
      validateInput(input);
    });

    input.addEventListener('input', () => {
      // If field is already invalid, re-validate on input to clear error immediately
      if (input.closest('.field').classList.contains('field--invalid')) {
        validateInput(input);
      }
    });
  });

  form.addEventListener('submit', (event) => {
    const isFormValid = validateForm();

    if (!isFormValid) {
      event.preventDefault();
    } else {
      handleFormSubmit(event);
    }
  });
}
