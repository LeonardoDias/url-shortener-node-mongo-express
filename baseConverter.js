const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function generateHashString(hashLength, alphabet) {
  const alphabetLength = alphabet.length;
  const minValue = Math.pow(alphabetLength,hashLength-1);
  const maxValue = Math.pow(alphabetLength, hashLength);
  const generatedNumber = Math.floor(Math.random() * (maxValue - minValue) + minValue);

  hashString = encode(generatedNumber, alphabet);

  return hashString;
}

function encodeNumber(number, alphabet){
  if (number === 0) {
    return '0';
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
    return generateHash(length, alphabet);
  },
  encodeNumber,
  decodeHashString,
  generateHashString
}
