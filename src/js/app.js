import { initFormValidation } from './modules/form-validation.js';
import { initPasswordToggle } from './modules/password-toggle.js';
import { initPhoneMask } from './modules/phone-select.js';

export function initApp() {
  initPhoneMask();
  initPasswordToggle();
  initFormValidation();
}
