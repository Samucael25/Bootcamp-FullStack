window.addEventListener('load', start);

function start(){
  var rangeInput = document.querySelector ('#rangeInput');
  var eventInput = rangeInput.addEventListener ('input',numberCapture);
  numberCapture(eventInput);
}

function numberCapture(event){
  var numberSelected = event.target.value;

  var number = document.querySelector('#number');
  number.value = numberSelected;
  
  var stringNormalize = normalizeNumber(numberSelected);
  extensiveShow(stringNormalize);
}

function normalizeNumber (numberSelected){
  var normalizeString = '';
  if (numberSelected.length === 1){
    normalizeString = '00'+numberSelected;
  }else if (numberSelected.length === 2){
    normalizeString = '0'+numberSelected;
  }else{
    normalizeString = numberSelected;
  }
  return normalizeString;
}

function extensiveShow(stringNormalized){
  var extensive = document.querySelector('#extensive');
  extensive.value = hundred(stringNormalized);
}

function smallerTwenty (numberSelected){
  var number;
  switch (numberSelected) {
    case '10':
      number = 'dez';
      break;
    case '11':
      number = 'onze';
      break;
    case '12':
      number = 'doze';
      break;
    case '13':
      number = 'treze';
      break;
    case '14':
      number = 'quartoze';
      break;
    case '15':
      number = 'quinze';
      break;
    case '16':
      number = 'dezesseis';
      break;
    case '17':
      number = 'dezessete';
      break;
    case '18':
      number = 'dezoito';
      break;
    default:
      number = 'dezenove';
  }
  return number;
}

function unity (numberSelected){
  var unity = 0;
  switch (numberSelected[2]) {
    case '0':
      if(numberSelected[0]=='0' && numberSelected[1]== '0') return 'zero';
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

function ten (numberSelected){
  var ten;
  switch (numberSelected[1]) {
    case '0':
      ten = unity (numberSelected);;
      break;
    case '1':
      ten = smallerTwenty (numberSelected.substring(1));
      break;
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
  if((numberSelected[1] > 1) && (numberSelected[2]) != '0'){
    return (ten + ' e ' + unity(numberSelected));
  }
  return ten;
}

function hundred (numberSelected){
  var hundred = null;
  switch (numberSelected[0]) {
    case '0':
      return ten(numberSelected);
      break;
    case '1':
      if(numberSelected=='100'){
        hundred = 'cem'
      }else{
        hundred = 'cento';
      }
      break;
    case '2':
      hundred = 'duzentos';
      break;
    case '3':
      hundred = 'trezentos';
      break;
    case '4':
      hundred = 'quatrocentos';
      break;
    case '5':
      hundred = 'quinhentos';
      break;
    case '6':
      hundred = 'seiscentos';
      break;
    case '7':
      hundred = 'setecentos';
      break;
    case '8':
      hundred = 'oitocentos';
      break;
    default:
      hundred = 'novecentos';
  }
  if(numberSelected[1]=='0' && numberSelected[2]=='0'){
      return hundred
  }
  return (hundred +' e '+ ten(numberSelected));
}