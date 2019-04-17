const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const base = alphabet.length;

function generateHash(length) {
  let hashString = ''
  for(let index = 0; index < length; index++) {
    hashString+= encode(Math.floor(Math.random()*62))
  }
  return hashString
}

function encode(num){
  let encoded = '';
  if (num === 0) {
    encoded += '0'
  }
  while (num){
    let remainder = num % base;
    num = Math.floor(num / base);
    encoded = alphabet[remainder].toString() + encoded;
  }
  return encoded;
}

// TO BE UPDATED
function decode(str){
  let decoded = 0;
  while (str){
    let index = alphabet.indexOf(str[0]);
    let power = str.length - 1;
    decoded += index * (Math.pow(base, power));
    str = str.substring(1);
  }
  return decoded;
}

module.exports = {
  encode,
  decode,
  generateHash
}
