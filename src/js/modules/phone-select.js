import { countries } from '../data/countries.js';

export function initPhoneSelect() {
  const select = document.querySelector('#country-code');

  if (!select) {
    return;
  }

  const optionsMarkup = countries
    .map(
      (country) =>
        `<option value="${country.value}" ${country.value === '+54' ? 'selected' : ''}>${country.label}</option>`
    )
    .join('');

  select.innerHTML = optionsMarkup;
}
