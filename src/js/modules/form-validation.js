import { handleFormSubmit } from './form-submit.js';

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

  const validateForm = () => {
    const fieldValidity = fieldInputs.map((input) => {
      let isValid = false;

      if (input === email) {
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      }

      if (input === phone) {
        // Check if phone matches the mask pattern: +54(XXX) XXX - XXXX
        // The regex needs to match the specific format including spaces and parentheses
        // Note: The value from input might contain the mask characters depending on IMask settings,
        // but usually we validate the value.
        // Let's use a regex that matches the visible mask format.
        isValid = /^\+54\(\d{3}\)\s\d{3}\s-\s\d{4}$/.test(phone.value.trim());
      }

      if (input === password) {
        isValid = password.value.trim().length >= 8; // Updated to match HTML minlength=8
      }

      setErrorVisibility(input, isValid);
      return isValid;
    });

    const areFieldsValid = fieldValidity.every(Boolean);
    const isAgeValid = isAdult.checked;

    setAgeErrorVisibility(isAgeValid);

    return areFieldsValid && isAgeValid;
  };

  form.addEventListener('submit', (event) => {
    const isFormValid = validateForm();

    if (!isFormValid) {
      event.preventDefault();
    } else {
      handleFormSubmit(event);
    }
  });
}
