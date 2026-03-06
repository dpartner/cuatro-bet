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
    lazy: false,  // Always show mask
    placeholderChar: 'X' // 'X' as placeholder char
  };

  const mask = window.IMask(phoneInput, maskOptions);
  const maskEl = document.querySelector('.phone-mask');

  const updateMaskVisual = () => {
    if (!maskEl) return;
    
    const value = mask.value;
    const firstPlaceholderIndex = value.indexOf('X');
    // If no placeholder (full), index is length
    const limit = firstPlaceholderIndex === -1 ? value.length : firstPlaceholderIndex;

    let html = '';
    
    for (let i = 0; i < value.length; i++) {
      const char = value[i];
      let isWhite = false;

      // Always white for +54 prefix (indices 0, 1, 2)
      if (i < 3) {
        isWhite = true;
      } 
      // Digits are always white
      else if (/\d/.test(char)) {
        isWhite = true;
      }
      // Placeholders are always muted
      else if (char === 'X') {
        isWhite = false;
      }
      // Formatting chars
      else {
        // If we are before the first placeholder
        if (i < limit) {
          // If this char is immediately before the placeholder, it means we haven't "passed" it yet
          // e.g. "+54(XXX" -> '(' is at 3, X at 4. 3 is limit-1. So '(' is muted.
          // e.g. "+54(123) X" -> ' ' is at 8, X at 9. 8 is limit-1. So ' ' is muted.
          if (i === limit - 1) {
            isWhite = false;
          } else {
            isWhite = true;
          }
        } else {
          // After placeholder -> muted
          isWhite = false;
        }
      }

      if (isWhite) {
        html += `<span class="mask-white">${char}</span>`;
      } else {
        html += `<span class="mask-muted">${char}</span>`;
      }
    }
    
    maskEl.innerHTML = html;
  };

  // Initial render
  updateMaskVisual();

  // Update on change
  mask.on('accept', updateMaskVisual);

  // 1. Force prefix on focus - Not needed with lazy: false, but good to ensure cursor pos
  phoneInput.addEventListener('focus', () => {
    // Move cursor to end of filled part or after prefix
    setTimeout(() => {
        // Find first placeholder char 'X'
        const firstPlaceholder = mask.value.indexOf('X');
        if (firstPlaceholder !== -1) {
             phoneInput.setSelectionRange(firstPlaceholder, firstPlaceholder);
        } else {
             // Or end if full
             phoneInput.setSelectionRange(mask.value.length, mask.value.length);
        }
    }, 0);
  });

  // 2. Clear on blur - REMOVED as per request "+54 never disappears"
  
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
      // With lazy: false, mask handles this well, but we ensure prefix integrity
      if (!mask.value.startsWith(PHONE_PREFIX)) {
          // If user somehow deleted prefix, restore it
          // But IMask usually prevents this if configured right, or we just reset
          mask.value = PHONE_PREFIX + mask.unmaskedValue; 
      }
      checkCursorPosition();
  });
}
