export function initPhoneMask() {
  const phoneInput = document.querySelector('input[name="phone"]');

  if (!phoneInput) {
    return;
  }

  phoneInput.placeholder = '+54(XXX) XXX - XXXX';
  phoneInput.inputMode = 'numeric';

  if (typeof window.IMask !== 'function') {
    return;
  }

  window.IMask(phoneInput, {
    mask: '+{54}(000) 000 - 0000'
  });
}
