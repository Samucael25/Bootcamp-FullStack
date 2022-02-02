let allPeople = null;
let inputSearch = document.querySelector ('#inputSearch');
let numberFindUsers = document.querySelector('#numberFindUsers');
let titleStatistics = document.querySelector('#titleStatistics');
let statistics = document.querySelector('#statistics');

window.addEventListener('load', () => {
  readDataFromBackend();
});


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
  numberFindUsers.innerHTML = `<div>Nenhum usuário encontrado</div>`;
  titleStatistics.innerHTML = `<div>Nenhuma estatística calculada</div>`;
  inputSearch = document.addEventListener ('keyup',filteredList);
}

function filteredList(event){
  let name = event.target.value;
  let namesFind = allPeople.filter(person => {
    return person.nameComplete.toLowerCase().includes(name.toLowerCase());
  });
  //console.log(namesFind);
  showFilteredList(namesFind);
  calculateStatistics (namesFind);
}

function showFilteredList (namesFindList) {
  let findUsers = document.querySelector ('#findUsers');
  let namesHtml = '<div>';
  let countNames = 0;
  
  namesFindList.forEach(person => {
    let peopleHtml = `
    <div class = "namesList">
      <div>
        <img src="${person.picture.thumbnail}"> ${person.nameComplete}, ${person.age} anos
      </div>
    `;
    namesHtml += peopleHtml;
    countNames++;
    //console.log(person.picture.thumbnail);
  });
  
  if (namesFindList.length===allPeople.length){
    namesHtml = '<div>';
  }

  modifyTitles (countNames);
  namesHtml += '</div>';
  findUsers.innerHTML = namesHtml;
}

function calculateStatistics (namesForStatistics){  
  let countMale = namesForStatistics.filter(person => {
    return person.gender === 'male';
  }).length;
  //console.log(countMale);

  let countFemale = namesForStatistics.filter(person => {
    return person.gender === 'female';
  }).length;
  //console.log(countFemale);

  let sumAge = namesForStatistics.reduce((accumulator, current) => {
    return accumulator + current.age;
  },0);
  //console.log(sumAge);

  let averageAge = sumAge/namesForStatistics.length;
    //console.log(averageAge);

  statistics.innerHTML = `
    <p id='countMale'>Sexo masculino: ${countMale}</p>
    <p id='countFemale'>Sexo feminino: ${countFemale}</p>
    <p id='sumAge'>Soma das idades: ${sumAge}</p>
    <p id='averageAge'>Média das idades: ${averageAge}</p>
  `;

  if ((namesForStatistics.length===allPeople.length)){
    statistics.innerHTML = ``;
  }
}

function modifyTitles (countNames){
  if (countNames === 0 || countNames === 100){
    render();
  } else {
    numberFindUsers.innerHTML = `<div>${countNames} usuários encontrados</div>`;
    titleStatistics.innerHTML = `<div>Estatísticas</div>`;
  }
}