import { findEvent } from './fetchCountries.js';

const input = document.querySelector('.input');
const countryList = document.querySelector('.list');
import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

input.addEventListener('input', e => {
  setTimeout(() => {
    const searchName = input.value.trim();
    if (searchName) {
      findEvent(searchName).then(data => {
        console.log(data[0]);
        countryList.innerHTML = '';
        if (data.length > 10) {
          error({
            text: 'Too many matches found. Please enter a more specific query!',
          });
        } else if (data.length === 1) {
          countryList.style.listStyle = 'none';
          const country = data[0];
          const countryInfo = `
          <li class="country-item">
          <h2 class="country-name">${country.name.common}</h2>
          <div class="country-item--wrap">
          <div class="country-info">
          <p class="country-text"><b>Capital:</b> ${country.capital}</p>
          <p class="country-text"><b>Population:</b> ${country.population}</p>
          <p class="country-text"><b>Languages:</b></p>
          <ul class="country-languages">
          ${Object.values(country.languages)
            .map(lang => `<li>${lang}</li>`)
            .join('')}
          </ul>
          </div>
          <img src="${country.flags.png}" alt="Flag of ${
            country.name.common
          }" width="140" height="140">
          </div>
          </li>
        `;
          countryList.innerHTML = countryInfo;
        } else {
          // If multiple results, display the list of countries
          data.forEach(country => {
            const listItem = document.createElement('li');
            listItem.textContent = country.name.common;
            countryList.appendChild(listItem);
          });
        }
      });
    } else {
      countryList.innerHTML = ''; // Clear the list if input is empty
    }
  }, 500);
}); // Debounce the input event to avoid too many requests
