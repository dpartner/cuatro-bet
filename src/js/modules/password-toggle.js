export function initPasswordToggle() {
  const toggle = document.querySelector('.field__toggle');
  const passwordInput = document.querySelector('input[name="password"]');

  if (!toggle || !passwordInput) {
    return;
  }

  toggle.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';

    passwordInput.type = isPassword ? 'text' : 'password';
    toggle.style.opacity = isPassword ? 1 : 0.5;
    toggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
  });
}
