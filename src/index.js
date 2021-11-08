import './css/styles.css';
import {fetchCountries} from './fetchCountries.js'
const DEBOUNCE_DELAY = 300;
const listRef = document.querySelector('.country-list');
const inputRef = document.querySelector('input#search-box');


inputRef.addEventListener('input', onInputGetCountry);

function onInputGetCountry(){
const countries = fetchCountries(inputRef.value)
console.log(countries)
return countries;
 }

function makeMarkup (countries) {
    if (countries.length > 10) {
        console.log("Too many matches found. Please enter a more specific name.")
    }
    const contryMarkup = countries.map((country) => {return `<li>${country.flags.svg}${country.name.oficial}</li>`}).join('');
    listRef.insertAdjacentHTML('beforeend', contryMarkup)
}
makeMarkup(countries)