const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function generateHashString(hashLength, alphabet) {
  const base = alphabet.length;
  const minValue = Math.pow(base,hashLength-1);
  const maxValue = Math.pow(base, hashLength) - 1;
  const generatedNumber = Math.floor(Math.random() * (maxValue - minValue) + minValue);

  hashString = encodeNumber(generatedNumber, alphabet);

  console.log(`alphabet: ${alphabet}`);
  console.log(`base: ${base}`);
  console.log(`min value: ${minValue}`);
  console.log(`max value: ${maxValue}`);
  console.log(`generated number: ${generatedNumber}`);
  console.log(`hash string: ${hashString}`);

  return hashString;
}

function encodeNumber(number, alphabet){
  if (number === 0) {
    return alphabet['0'];
  }

  const alphabetLength = alphabet.length;
  let encoded = '';

  while (number){
    let remainder = number % alphabetLength;
    number = Math.floor(number / alphabetLength);
    encoded = alphabet[remainder].toString() + encoded;
  }
  return encoded;
}

function decodeHashString(hashString, alphabet){
  const alphabetLength = alphabet.length;
  let decoded = 0;

  while (hashString){
    let index = alphabet.indexOf(hashString[0]);
    let power = hashString.length - 1;
    decoded += index * (Math.pow(alphabetLength, power));
    hashString = hashString.substring(1);
  }
  return decoded;
}

module.exports = {
  do: (length) => {
    return generateHashString(length, alphabet);
  },
  encodeNumber,
  decodeHashString,
  generateHashString
}
