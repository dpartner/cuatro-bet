import { initFormValidation } from './modules/form-validation.js';
import { initPasswordToggle } from './modules/password-toggle.js';
import { initPhoneSelect } from './modules/phone-select.js';

export function initApp() {
  initPhoneSelect();
  initPasswordToggle();
  initFormValidation();
}
