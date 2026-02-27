export function initFormValidation() {
  const form = document.querySelector('#register-form');

  if (!form) {
    return;
  }

  const firstName = form.elements.firstName;
  const lastName = form.elements.lastName;
  const email = form.elements.email;
  const phone = form.elements.phone;
  const password = form.elements.password;
  const isAdult = form.elements.isAdult;

  const fieldInputs = [firstName, lastName, email, phone, password];

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

  const validateInput = (input) => {
    let isValid = false;

    if (input === firstName || input === lastName) {
      isValid = Boolean(input.value.trim());
    }

    if (input === email) {
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    }

    if (input === phone) {
      isValid = /^\+54\(\d{3}\)\s\d{3}\s-\s\d{4}$/.test(phone.value.trim());
    }

    if (input === password) {
      isValid = password.value.trim().length >= 6;
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
    input.addEventListener('input', () => {
      validateInput(input);
    });
  });

  isAdult.addEventListener('change', () => {
    setAgeErrorVisibility(isAdult.checked);
  });

  form.addEventListener('submit', (event) => {
    const isFormValid = validateForm();

    if (!isFormValid) {
      event.preventDefault();
    }
  });
}
