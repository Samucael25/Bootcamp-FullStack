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
  rederSumary();
  handleCountryButtons();
}

function renderCountryList() {
  let contriesHTML = "<div>";
  allCountries.forEach(country => {
    const { name, flag, id, population } = country;
    const countryHTML = `
      <div class="country">
        <div>
        </div>

        <div>
        </div>

        <div>
        </div>
      </div>
    `;
  });
}

function renderFavorites() {

}

function rederSumary() {}
function handleCountryButtons() {}





