export function initPasswordToggle() {
  const toggle = document.querySelector('.field__toggle');
  const passwordInput = document.querySelector('input[name="password"]');

  if (!toggle || !passwordInput) {
    return;
  }

  toggle.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';

    passwordInput.type = isPassword ? 'text' : 'password';
    toggle.setAttribute('aria-label', isPassword ? 'Сховати пароль' : 'Показати пароль');
  });
}
