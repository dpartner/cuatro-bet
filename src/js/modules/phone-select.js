import { PHONE_MASK, PHONE_PREFIX } from '../constants.js';

export function initPhoneMask() {
  const phoneInput = document.querySelector('input[name="phone"]');

  if (!phoneInput) {
    return;
  }

  if (typeof window.IMask !== 'function') {
    return;
  }

  const maskOptions = {
    mask: PHONE_MASK,
    lazy: true,  // Show placeholder only when focused
    placeholderChar: '_' // Standard placeholder char
  };

  const mask = window.IMask(phoneInput, maskOptions);

  // 1. Force prefix on focus
  phoneInput.addEventListener('focus', () => {
    if (mask.value === '') {
      mask.value = PHONE_PREFIX;
      // Move cursor to end
      setTimeout(() => {
        const len = mask.value.length;
        phoneInput.setSelectionRange(len, len);
      }, 0);
    }
  });

  // 2. Clear on blur if only prefix remains
  phoneInput.addEventListener('blur', () => {
    if (mask.value === PHONE_PREFIX) {
      mask.value = '';
      mask.updateValue();
    }
  });

  // 3. Cursor constraint & Backspace blocking
  // We use keydown to intercept backspace and arrow keys
  phoneInput.addEventListener('keydown', (e) => {
    const prefixLength = PHONE_PREFIX.length;
    const cursorPos = phoneInput.selectionStart;

    // Block Backspace if cursor is at or before the end of prefix
    if (e.key === 'Backspace' && cursorPos <= prefixLength) {
      e.preventDefault();
      return;
    }

    // Block Left Arrow if cursor is at the end of prefix
    if (e.key === 'ArrowLeft' && cursorPos <= prefixLength) {
      e.preventDefault();
      return;
    }
    
    // Block Home key to go to start of editable part
    if (e.key === 'Home') {
        e.preventDefault();
        phoneInput.setSelectionRange(prefixLength, prefixLength);
        return;
    }
  });
  
  // 4. Ensure cursor never goes into prefix on click/mouseup
  const checkCursorPosition = () => {
      const prefixLength = PHONE_PREFIX.length;
      if (phoneInput.selectionStart < prefixLength) {
          phoneInput.setSelectionRange(prefixLength, prefixLength);
      }
  };

  phoneInput.addEventListener('click', checkCursorPosition);
  phoneInput.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'Home') {
          checkCursorPosition();
      }
  });

  // 5. Restore prefix if cleared while focused (handled by mask logic mostly, but let's ensure)
  phoneInput.addEventListener('input', () => {
      if (!mask.value.startsWith(PHONE_PREFIX)) {
          const cleanVal = mask.unmaskedValue;
          mask.value = PHONE_PREFIX + cleanVal; 
      }
      checkCursorPosition();
  });
}
