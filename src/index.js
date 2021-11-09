import './css/styles.css';
import {fetchCountries} from './api.js'
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix'

const DEBOUNCE_DELAY = 300;
const listRef = document.querySelector('.country-list');
const inputRef = document.querySelector('input#search-box');
const infoRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onInputGetCountry, DEBOUNCE_DELAY));

function onInputGetCountry(){
    
    const value = inputRef.value.trim();
    fetchCountries(value)
    .then(response => {
        if(!response.ok) {
            throw Notiflix.Notify.failure("Oops, there is no country with that name");
        }
        return response.json();
    }
    ).then(countries =>{
        if(countries.length > 10) {
            console.log(countries.length)
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
        }
        if (countries.length === 1){
           return makeCountryMarkup(countries)
        }
        else{ 
        return makeCountriesMarkup(countries)}
        }).catch(console.log)
 }


 

function makeCountriesMarkup (countries) {
    listRef.innerHTML = countries.map(({name, flags}) =>`<li class="country-list__item">
    <img src="${flags.svg}" alt="${name.official} width="30" height="20">
    <span class="country-list__name">${name.official}<span>
    </li>`).join('');   
}
function makeCountryMarkup (country) {
    console.log(country[0])
    const {name, flags, capital, population, languages} = country[0]
      return  infoRef.innerHTML = `<h1><img src="${flags.svg}" alt="${name} width="50" height="50"">${name.common}<h1>
        <ul>
        <li>Capital:${capital}</li>
        <li>Population:${population}</li>
        <li>Languages:${languages.values()}</li>
        </ul>`
    }

