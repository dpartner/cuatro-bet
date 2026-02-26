function markFieldState(field, isValid) {
  if (!field) {
    return;
  }

  field.classList.toggle('field--invalid', !isValid);
}

export function initFormValidation() {
  const form = document.querySelector('#register-form');
  const message = document.querySelector('#form-message');

  if (!form || !message) {
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const firstName = form.elements.firstName;
    const lastName = form.elements.lastName;
    const email = form.elements.email;
    const phone = form.elements.phone;
    const password = form.elements.password;
    const isAdult = form.elements.isAdult;

    const fields = [firstName, lastName, email, phone, password];
    const validByField = new Map([
      [firstName, Boolean(firstName.value.trim())],
      [lastName, Boolean(lastName.value.trim())],
      [email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)],
      [phone, /^[0-9]{6,15}$/.test(phone.value.replace(/\s/g, ''))],
      [password, password.value.trim().length >= 8]
    ]);

    fields.forEach((input) => markFieldState(input.closest('.field'), validByField.get(input)));

    const allFieldsValid = fields.every((input) => validByField.get(input));
    const ageAccepted = isAdult.checked;
    const isValid = allFieldsValid && ageAccepted;

    message.classList.toggle('register-form__message--error', !isValid);
    message.textContent = isValid
      ? 'Реєстрація успішно пройдена (демо).'
      : 'Перевірте поля форми та підтвердіть вік 18+.';
  });
}
