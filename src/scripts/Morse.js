const morseCodeMap = {
  A: '.-',
  B: '-...',
  C: '-.-.',
  D: '-..',
  E: '.',
  F: '..-.',
  G: '--.',
  H: '....',
  I: '..',
  J: '.---',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  P: '.--.',
  Q: '--.-',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  V: '...-',
  W: '.--',
  X: '-..-',
  Y: '-.--',
  Z: '--..',
  1: '.----',
  2: '..---',
  3: '...--',
  4: '....-',
  5: '.....',
  6: '-....',
  7: '--...',
  8: '---..',
  9: '----.',
  0: '-----',
  ' ': '/',
  '-': '-....-',
};

const textCodeMap = Object.fromEntries(Object.entries(morseCodeMap).map(([key, value]) => [value, key]));

export const textToMorse = (text) => {
  return text
    .toUpperCase()
    .split('')
    .map((char) => morseCodeMap[char] || '')
    .join(' ');
};

export const morseToText = (morse) => {
  return morse
    .split(' ')
    .map((code) => textCodeMap[code] || '')
    .join('');
};
