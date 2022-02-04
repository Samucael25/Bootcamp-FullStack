let allPeople = null;
const titleFindUsers = document.querySelector('#titleFindUsers');
const titleStatistics = document.querySelector('#titleStatistics');
const statistics = document.querySelector('#statistics');
const findUsers = document.querySelector ('#findUsers');
const miniListNames = document.querySelector ('#miniListNames');

window.addEventListener('load', () => readDataFromBackend());

async function readDataFromBackend() {
  const resource = await fetch('http://localhost:3001/users');
  const json = await resource.json();
  allPeople = json.map (person => {
    const { gender, name, picture, dob } = person;
    return {
      gender,
      nameComplete: name.first + ' ' + name.last,
      picture,
      age: dob.age
    };
  });
  render();
}

function render(){
  const inputSearch = document.querySelector ('#inputSearch');
  const inputButton = document.querySelector ('#inputButton');
  startPage();
  inputSearch.addEventListener('keyup',(event) => {
    if (event.key === 'Enter') {
      return filteredList(inputSearch.value, keyPressed = 'yes');
    }
    return miniList(inputSearch.value, keyPressed = 'no');
  });
  return inputButton.addEventListener('click',(event) => filteredList(inputSearch.value, keyPressed = 'yes'));
}

function startPage(){
  titleFindUsers.innerHTML = `<div>Nenhum usuário encontrado</div>`;
  titleStatistics.innerHTML = `<div>Nenhuma estatística calculada</div>`;
  findUsers.innerHTML = ``;
  statistics.innerHTML = ``;
}

function miniList (name, keyPressed){
  let namesFind = allPeople.filter(person => {
    return person.nameComplete.toLowerCase().includes(name.toLowerCase());
  });
  if (keyPressed === 'yes') {
    miniListNames.innerHTML = ``;
    return namesFind;
  }
  showMiniList(namesFind);
}

function showMiniList (namesFindMinilist){
  let namesMiniListHtml = '<div class="namesMiniList">';
  namesFindMinilist.forEach(person => {
    let peopleMiniListHtml = `
      <div class="namesMinilist">
        ${person.nameComplete}, 
      </div>
    `;
    namesMiniListHtml += peopleMiniListHtml;
  });
  namesMiniListHtml += '</div>';
  miniListNames.innerHTML = namesMiniListHtml;
};

function filteredList(name, keyPressed){
  let namesFind = miniList(name, keyPressed);
  if (!((namesFind.length === 0) || (namesFind.length === allPeople.length) || (inputSearch.value === ''))){    
    return showFilteredList(namesFind);
  }
  render();
}

function showFilteredList (namesFindList) {
  let namesHtml = '<div class="namesList">';
  let countNames = 0;
  namesFindList.forEach(person => {
    let peopleHtml = `
      <div class="dataPerson">
        <img src="${person.picture.thumbnail}" id="picture"> <div class="nameAge">${person.nameComplete}, ${person.age} anos</div>
      </div>
    `;
    namesHtml += peopleHtml;
    countNames++;
  });
  namesHtml += '</div>';
  findUsers.innerHTML = namesHtml;
  calculateStatistics (namesFindList, countNames);
}

function calculateStatistics (namesForStatistics, countNames){ 
  let countMale = namesForStatistics.filter(person => {
    return person.gender === 'male';
  }).length;

  let countFemale = namesForStatistics.filter(person => {
    return person.gender === 'female';
  }).length;

  let sumAge = namesForStatistics.reduce((accumulator, current) => {
    return accumulator + current.age;
  },0);

  let averageAge = (sumAge/countNames).toFixed(2);

  statistics.innerHTML = `
      <p id='countMale'>Sexo masculino: ${countMale}</p>
      <p id='countFemale'>Sexo feminino: ${countFemale}</p>
      <p id='sumAge'>Soma das idades: ${sumAge} anos</p>
      <p id='averageAge'>Média das idades: ${averageAge} anos</p>
    `;
    modifyTitles (countNames);
}

function modifyTitles (countNames){
  titleFindUsers.innerHTML = `<div>${countNames} usuários encontrados</div>`;
  titleStatistics.innerHTML = `<div>Estatísticas</div>`;
}