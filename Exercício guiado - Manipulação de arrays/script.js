let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let favoriteCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

//https://restcountries.com/v2/all
window.addEventListener ('load', () => {
  tabCountries = document.querySelector ('#tabCountries');
  tabFavorites = document.querySelector ('#tabFavorites');

  countCountries = document.querySelector ('#countCountries');
  countFavorites = document.querySelector ('#countFavorites');

  totalPopulationList = document.querySelector ('#totalPopulationList');
  totalPopulationFavorites = document.querySelector ('#totalPopulationFavorites');

  numberFormat = Intl.NumberFormat('pt-BR');

  fetchCountries();

});

async function fetchCountries () {
  const res = await fetch('https://restcountries.com/v2/all');
  const json = await res.json();
  allCountries = json.map(country => {

    const { numericCode, translations, population, flag } = country;

    return {
      id: numericCode,
      name: translations.pt,
      population,
      flag
    };
  });
  
  render();
}

function render(){
  renderCountryList();
  renderFavorites();
  renderSumary();
  handleCountryButtons();
}

function renderCountryList() {
  let countriesHTML = "<div>";
  allCountries.forEach(country => {
    const { name, flag, id, population } = country;
    const countryHTML = `
      <div class='country'>
        <div>
          <a id="${id}" class="waves-effect waves-light btn">+</a>
        </div>
          
        <div>
          <img src="${flag}" alt="${name}">
        </div>

        <div>
          <ul>
            <li>${name}</li>
            <li>${population}</li>
          </ul>
        </div>
      </div>
    `;
    countriesHTML += countryHTML;
  });
  countriesHTML += '</div>';
  tabCountries.innerHTML = countriesHTML;
}

function renderFavorites() {
  let favoritesHTML = '<div>';
  favoriteCountries.forEach (country =>{
    const { name, flag, id, population } = country;
    const favoriteCountryHTML = `
      <div class='country'>
        <div>
          <a id="${id}" class="waves-effect waves-light btn red darken-4">-</a>
        </div>
          
        <div>
          <img src="${flag}" alt="${name}">
        </div>

        <div>
        <ul>
          <li>${name}</li>
          <li>${population}</li>
        </ul>
        </div>
      </div>
    `;
    favoritesHTML += favoriteCountryHTML;
  });

  favoritesHTML += '</div>';
  tabFavorites.innerHTML = favoritesHTML;
}

function renderSumary() {
  countCountries.textContent = allCountries.length;
  countFavorites.textContent = favoriteCountries.length;

  const totalPopulation = allCountries.reduce((accumulator, current) =>{
    return accumulator + current.population;
  }, 0);

  const totalFavorites = favoriteCountries.reduce((accumulator, current) =>{
    return accumulator + current.population;
  }, 0);

  totalPopulationList.textContent = totalPopulation;
  totalPopulationFavorites.textContent = totalFavorites;
}
function handleCountryButtons() {
  const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));
  const favoritesButtons = Array.from(tabFavorites.querySelectorAll('.btn'));
  
  countryButtons.forEach(button => {
    button.addEventListener('click', () => addToFavorites(button.id));
  });

  favoritesButtons.forEach(button => {
    button.addEventListener('click', () => removeFromFavorites(button.id));
  });
}

function addToFavorites (id){
  const countryToAdd = allCountries.find(button => button.id === id);
  favoriteCountries = [...favoriteCountries,countryToAdd];
}

function removeFromFavorites (id){

}




