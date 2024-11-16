import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

export const generateWord = () => {
  return lorem.generateWords(1);
}

export const generateSentence = (count = 1) => {
  return lorem.generateSentences(count);
}

export const generateParagraph = (count = 1) => {
  return lorem.generateParagraphs(count);
}
