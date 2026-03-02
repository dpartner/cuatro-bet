export function initPhoneMask() {
  const phoneInput = document.querySelector('input[name="phone"]');

  if (!phoneInput) {
    return;
  }

  if (typeof window.IMask !== 'function') {
    return;
  }

  window.IMask(phoneInput, {
    mask: '+{54}(000) 000 - 0000',
    lazy: true,
    placeholderChar: 'X'
  });
}
