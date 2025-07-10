import { faker } from '@faker-js/faker';

function LetterGen() {
  const letters = `abcdefghijklmnopqrstuvwxyz-?!'"`;
  const index = Math.floor(Math.random() * letters.length);
  return letters[index];
}

function WordGen() {
  return faker.word.sample();
}

export const RandomMorse = (type) => {
  switch (type) {
    case 'letter':
      return LetterGen();
    case 'word':
      return WordGen();
    default:
      return LetterGen();
  }
};
