export function initPasswordToggle() {
  const toggle = document.querySelector('.field__toggle');
  const passwordInput = document.querySelector('input[name="password"]');
  const icon = toggle?.querySelector('img');

  if (!toggle || !passwordInput || !icon) {
    return;
  }

  const getPath = (path) => `${import.meta.env.BASE_URL}${path}`;

  toggle.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';

    passwordInput.type = isPassword ? 'text' : 'password';
    toggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    
    // Update icon
    icon.src = isPassword 
      ? getPath('images/icons/eye.svg')
      : getPath('images/icons/eye-false.svg');
  });
}
