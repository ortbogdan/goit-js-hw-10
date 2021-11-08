import './css/styles.css';
import {fetchCountries} from './fetchCountries.js'
import debounce from 'lodash.debounce'
const DEBOUNCE_DELAY = 300;
const listRef = document.querySelector('.country-list');
const inputRef = document.querySelector('input#search-box');

inputRef.addEventListener('input', debounce(onInputGetCountry, DEBOUNCE_DELAY));

function onInputGetCountry(){
    
    const value = inputRef.value.trim();
    fetchCountries(value).then(countries =>{return  makeMarkup(countries)})
    console.log(countries)
 }


 

function makeMarkup (countries) {
    if (countries.length > 10) {
        console.log("Too many matches found. Please enter a more specific name.")
    }
    const contryMarkup = countries.map(country =>`<li class="country-list__item"><svg class="country-list__flag"><use class="country-list__flag" href=${country.flags.svg}></use></svg>${country.name.official}</li>`).join('');
    listRef.insertAdjacentHTML('beforeend', contryMarkup)
}
