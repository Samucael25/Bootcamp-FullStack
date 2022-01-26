let allPeople = null;

window.addEventListener('load', () => {
  readDataFromBackend();
});


async function readDataFromBackend() {
  const resource = await fetch('http://localhost:3001/users');
  const json = await resource.json();
  allPeople = json.map (person => {
    const { gender, name, picture } = person;
    return {
      gender,
      nameComplete: name.first + ' ' + name.last,
      picture
    };
  });
  render();
}

function render(){
  let inputSearch = document.querySelector ('#inputSearch');
  inputSearch = document.addEventListener ('keyup',filteredList);
}

function filteredList(event){
  let name = event.target.value;
  let namesFind = allPeople.filter(person => {
    return person.nameComplete.toLowerCase().includes(name.toLowerCase());
  });
  console.log(namesFind);
}