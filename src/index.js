import './css/styles.css';
import {fetchCountries} from './fetchCountries.js'
import debounce from 'lodash.debounce'
const DEBOUNCE_DELAY = 300;
const listRef = document.querySelector('.country-list');
const inputRef = document.querySelector('input#search-box');

inputRef.addEventListener('input', debounce(onInputGetCountry, DEBOUNCE_DELAY));

function onInputGetCountry(){
    
    let value = inputRef.value.trim();
    fetchCountries(value)
    .then(response => {
        if(!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    }
    ).then(countries =>{
        if(countries.length > 10) {
            console.log ("Too many matches found. Please enter a more specific name.")
        }
        else{ 
        return makeMarkup(countries)}
        }).catch(error=> console.log("Oops, there is no country with that name"))
 }


 

function makeMarkup (countries) {
    
    listRef.innerHTML = countries.map(({name, flags}) =>`<li class="country-list__item">
    <img src="${flags.svg}" alt="${name.official} width="30" height="20">
    <span class="country-list__name">${name.official}<span>
    </li>`).join('');
    
}
