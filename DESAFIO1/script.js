window.addEventListener('load', start);

var numberSelected = null;

function start(){
  var rangeInput = document.querySelector ('#rangeInput');
  var eventInput = rangeInput.addEventListener ('input',numberCapture);
  numberCapture(eventInput);
}

function numberCapture(event){
  numberSelected = event.target.value;
  
  var number = document.querySelector('#number');
  number.value = numberSelected;

  var extensive = document.querySelector('#extensive');
  extensiveShow(numberSelected);
}

function extensiveShow(numberSelected){
  //extensive.value = smallerThousand(numberSelected);
  
  if (numberSelected < 10){
    extensive.value = smallerTem(numberSelected);
  }
  else if (numberSelected < 20){
    extensive.value = smallerTwenty(numberSelected);
  }
  else if (numberSelected < 100){
    extensive.value = smallerHandred(numberSelected[0]) + unity(numberSelected[1]);
  }
  else{
    extensive.value = smallerThousand(numberSelected);
  }
}

function smallerTem (numberSelected){
  var unity = 0;
  switch (numberSelected) {
    case '0':
      unity = 'zero';
      break;
    case '1':
      unity = 'um';
      break;
    case '2':
      unity = 'dois';
      break;
    case '3':
      unity = 'três';
      break;
    case '4':
      unity = 'quatro';
      break;
    case '5':
      unity = 'cinco';
      break;
    case '6':
      unity = 'seis';
      break;
    case '7':
      unity = 'sete';
      break;
    case '8':
      unity = 'oito';
      break;
    default:
      unity = 'nove';
  }
  return unity;
}

function smallerTwenty (numberSelected){
  var retorno;
  switch (numberSelected) {
    case '10':
      retorno = 'dez';
      break;
    case '11':
      retorno = 'onze';
      break;
    case '12':
      retorno = 'doze';
      break;
    case '13':
      retorno = 'treze';
      break;
    case '14':
      retorno = 'quartoze';
      break;
    case '15':
      retorno = 'quinze';
      break;
    case '16':
      retorno = 'dezesseis';
      break;
    case '17':
      retorno = 'dezessete';
      break;
    case '18':
      retorno = 'dezoito';
      break;
    default:
      retorno = 'dezenove';
  }
  return retorno;
}

function unity (numberSelected){
  var unity = 0;
  switch (numberSelected) {
    case '0':
      unity = '';
      break;
    case '1':
      unity = 'um';
      break;
    case '2':
      unity = 'dois';
      break;
    case '3':
      unity = 'três';
      break;
    case '4':
      unity = 'quatro';
      break;
    case '5':
      unity = 'cinco';
      break;
    case '6':
      unity = 'seis';
      break;
    case '7':
      unity = 'sete';
      break;
    case '8':
      unity = 'oito';
      break;
    default:
      unity = 'nove';
  }
  return unity;
}

function smallerHandred (numberSelected){
  var ten;
  switch (numberSelected) {
    case '2':
      ten = 'vinte';
      break;
    case '3':
      ten = 'trinta';
      break;
    case '4':
      ten = 'quarenta';
      break;
    case '5':
      ten = 'cinquenta';
      break;
    case '6':
      ten = 'sessenta';
      break;
    case '7':
      ten = 'setenta';
      break;
    case '8':
      ten = 'oitenta';
      break;
    default:
      ten = 'noventa';
  }
  return ten;
}

function smallerThousand (numberSelected){
  var centena = null;
  var centenaCompleta = null;
  switch (numberSelected[0]) {
    case '1':
      if(numberSelected=='100'){
        centena = 'cem'
      }else{
        centena = 'cento';
      }
      break;
    case '2':
      centena = 'duzentos';
      break;
    case '3':
      centena = 'trezentos';
      break;
    case '4':
      centena = 'quatrocentos';
      break;
    case '5':
      centena = 'quinhentos';
      break;
    case '6':
      centena = 'seiscentos';
      break;
    case '7':
      centena = 'setecentos';
      break;
    case '8':
      centena = 'oitocentos';
      break;
    default:
      centena = 'novecentos';
  }
  if(numberSelected[1]!='0'){
    centenaCompleta = centena +' e '+ten(numberSelected);
    return centenaCompleta;
  }else{
    return centena;
  }
}

function ten (numberSelected){
  var ten;
  if (numberSelected[2]=='0'){
    switch (numberSelected[1]) {
      case '0':
        ten = unity (numberSelected.substring(2));;
        break;
      case '1':
        ten = smallerTwenty (numberSelected.substring(1));
        break;
      case '2':
        ten = 'vinte'+unity(numberSelected[2]);
        break;
      case '3':
        ten = 'trinta'+unity(numberSelected[2]);
        break;
      case '4':
        ten = 'quarenta'+unity(numberSelected[2]);
        break;
      case '5':
        ten = 'cinquenta'+unity(numberSelected[2]);
        break;
      case '6':
        ten = 'sessenta'+unity(numberSelected[2]);
        break;
      case '7':
        ten = 'setenta'+unity(numberSelected[2]);
        break;
      case '8':
        ten = 'oitenta'+unity(numberSelected[2]);
        break;
      default:
        ten = 'noventa'+unity(numberSelected[2]);
    }
  }else{
    switch (numberSelected[1]) {
      case '0':
        ten = unity (numberSelected.substring(2));;
        break;
      case '1':
        ten = smallerTwenty (numberSelected.substring(1));
        break;
      case '2':
        ten = 'vinte e '+unity(numberSelected[2]);
        break;
      case '3':
        ten = 'trinta e '+unity(numberSelected[2]);
        break;
      case '4':
        ten = 'quarenta e '+unity(numberSelected[2]);
        break;
      case '5':
        ten = 'cinquenta e '+unity(numberSelected[2]);
        break;
      case '6':
        ten = 'sessenta e '+unity(numberSelected[2]);
        break;
      case '7':
        ten = 'setenta e '+unity(numberSelected[2]);
        break;
      case '8':
        ten = 'oitenta e '+unity(numberSelected[2]);
        break;
      default:
        ten = 'noventa e '+unity(numberSelected[2]);
    }
  }
  return ten;
}